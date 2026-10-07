"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Two parallax layers of domain-warped fbm clouds over a blue sky gradient,
// with a cheap directional self-shadow so the clouds read as volumetric.
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p, int octaves) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 6; i++) {
      if (i >= octaves) break;
      v += a * noise(p);
      p = rot * p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  // Big smooth puffs; slowly morphing so clouds billow as they drift.
  float shape(vec2 p, float t) {
    vec2 warp = vec2(fbm(p * 0.5 + t * 0.15, 2), fbm(p * 0.5 + vec2(3.1, 7.4) - t * 0.1, 2));
    return fbm(p + 0.35 * warp, 3);
  }

  // Returns density in .x and lit amount in .y
  vec2 layer(vec2 uv, float scale, float speed, float coverage, float t) {
    vec2 p = uv * scale + vec2(t * speed, 0.0);
    float base = shape(p, t);
    // Fine detail only erodes the edges, it doesn't add grain to the interior.
    float detail = fbm(p * 3.1 - t * 0.2, 4);
    float d = base + (detail - 0.5) * 0.22;
    float density = smoothstep(coverage, coverage + 0.16, d);
    // Thicker toward the light (up-right) means this point is in shadow.
    float toward = shape(p + vec2(0.08, 0.12), t);
    float lit = clamp(0.85 + (base - toward) * 4.5, 0.0, 1.0);
    // Undersides of thick clouds are a touch darker.
    lit *= mix(1.0, 0.82, smoothstep(coverage + 0.05, coverage + 0.3, d));
    return vec2(density, lit);
  }

  void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 uv = frag / uResolution.y;
    float h = frag.y / uResolution.y;
    float t = uTime;

    // Palette sampled from public/app/og.png: muted steel-blue sky, cream clouds, warm grey shadows.
    vec3 skyTop = vec3(0.42, 0.56, 0.66);
    vec3 skyBottom = vec3(0.56, 0.68, 0.77);
    vec3 col = mix(skyBottom, skyTop, smoothstep(0.0, 1.0, h));

    // Soft sun glow in the upper right.
    vec2 sunPos = vec2(uResolution.x / uResolution.y * 0.82, 0.95);
    float sun = exp(-3.5 * length(uv - sunPos));
    col += vec3(1.0, 0.94, 0.82) * sun * 0.3;

    // Keep the sky calmer behind the heading text on the left.
    float calm = mix(0.45, 1.0, smoothstep(0.05, 0.65, frag.x / uResolution.x));

    vec3 shadowTint = vec3(0.58, 0.57, 0.53); // warm grey shadow
    vec3 lightTint = vec3(0.90, 0.85, 0.76); // cream highlight

    // Far layer: smaller, slower, hazier.
    vec2 back = layer(uv, 1.7, 0.6, 0.37, t * 0.02);
    vec3 backCol = mix(shadowTint, lightTint, back.y);
    col = mix(col, mix(col, backCol, 0.9), back.x * calm);

    // Near layer: bigger, faster, crisper.
    vec2 front = layer(uv + vec2(3.7, -0.4), 1.05, 1.0, 0.40, t * 0.02);
    vec3 frontCol = mix(shadowTint * 0.97, lightTint, front.y);
    col = mix(col, frontCol, front.x * calm);

    // Gentle bright rim where the near clouds thin out against the sun.
    col += vec3(1.0, 0.94, 0.84) * front.x * (1.0 - front.x) * sun * 0.6;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// Clouds are soft, so rendering below native resolution is invisible and much cheaper.
const RENDER_SCALE = 0.6;

const CloudBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: "low-power" });
    } catch {
      return; // No WebGL: the CSS gradient fallback stays visible.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2) * RENDER_SCALE);
    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
    };
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.getDrawingBufferSize(uniforms.uResolution.value);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Start mid-drift so the first frame already looks settled. Time only
    // advances while visible, so clouds resume where they left off.
    let elapsed = 40;
    let last = performance.now();
    let visible = true;
    let frame = 0;

    const render = () => {
      uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
    };

    const loop = (now: number) => {
      elapsed += Math.min(now - last, 100) / 1000;
      last = now;
      render();
      if (visible) frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    // Stop drawing while the banner is scrolled out of view.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible && !reduceMotion) start();
    });
    intersectionObserver.observe(container);

    render();
    container.style.opacity = "1";
    if (!reduceMotion) start();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -bottom-24 -z-10 overflow-hidden bg-linear-to-b from-[#6b8ea6] to-secondary [mask-image:linear-gradient(to_bottom,black_0%,transparent)]"
    >
      <div
        ref={containerRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-1000"
      />
    </div>
  );
};

export default CloudBanner;
