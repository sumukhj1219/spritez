(function () {
  const DEFAULT_MASCOT = 1;
  const HOVER_RANGE = 50;
  const SPEEDS = { idle: "5s", walk: "0.6s", touch: "0.8s", hit: "0.8s", exercise: "0.8s" };
  const WALK_PX_PER_SEC = 73;
  const MIN_WALK_DURATION = 0.4;
  const MAX_WALK_DURATION = 9;

  let container = null;
  let sprite = null;
  let mounted = false;
  let animation = "idle";
  let position = { x: 100, y: 100 };
  let isFlipped = false;
  let walkDuration = MIN_WALK_DURATION;

  function spriteUrl(mascotId) {
    return chrome.runtime.getURL(`sprites/c${mascotId}.png`);
  }

  function mount(mascotId) {
    if (mounted) return;
    mounted = true;

    container = document.createElement("div");
    container.className = "csx-mascot-container";

    sprite = document.createElement("div");
    sprite.className = "csx-mascot-sprite idle";
    sprite.style.setProperty("--sprite-url", `url(${spriteUrl(mascotId)})`);
    sprite.style.setProperty("--playback-speed", SPEEDS.idle);

    container.appendChild(sprite);
    document.body.appendChild(container);

    render();

    document.addEventListener("click", handleStageClick, true);
    document.addEventListener("mousemove", handleMouseMove);
    sprite.addEventListener("click", handleSpriteClick);
    container.addEventListener("transitionend", handleTransitionEnd);
  }

  function unmount() {
    if (!mounted) return;
    mounted = false;
    document.removeEventListener("click", handleStageClick, true);
    document.removeEventListener("mousemove", handleMouseMove);
    container.remove();
    container = null;
    sprite = null;
    animation = "idle";
  }

  function setAnimation(next) {
    animation = next;
    sprite.className = `csx-mascot-sprite ${next}`;
    sprite.style.setProperty("--playback-speed", SPEEDS[next]);
  }

  function render() {
    container.style.left = `${position.x}px`;
    container.style.top = `${position.y}px`;
    container.style.transition =
      animation === "walk"
        ? `left ${walkDuration}s linear, top ${walkDuration}s linear`
        : "none";
    container.style.transform = `scaleX(${isFlipped ? -1 : 1})`;
  }

  function handleStageClick(e) {
    if (animation === "walk") return;
    if (e.target === sprite || sprite.contains(e.target)) return;

    const x = e.clientX - 32;
    const y = e.clientY - 32;
    const distance = Math.hypot(x - position.x, y - position.y);
    walkDuration = Math.min(
      Math.max(distance / WALK_PX_PER_SEC, MIN_WALK_DURATION),
      MAX_WALK_DURATION
    );
    isFlipped = x < position.x;
    position = { x, y };

    setAnimation("walk");
    render();
  }

  function handleTransitionEnd() {
    if (animation !== "walk") return;
    setAnimation("idle");
  }

  function handleMouseMove(e) {
    if (animation === "walk" || animation === "hit") return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (distance <= HOVER_RANGE) {
      if (animation !== "touch") setAnimation("touch");
    } else if (animation === "touch") {
      setAnimation("idle");
    }
  }

  function handleSpriteClick(e) {
    e.stopPropagation();
    setAnimation("hit");
  }

  chrome.storage.local.get({ enabled: true, mascotId: DEFAULT_MASCOT }, ({ enabled, mascotId }) => {
    if (enabled) mount(mascotId);
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;

    if (changes.enabled) {
      if (changes.enabled.newValue) {
        chrome.storage.local.get({ mascotId: DEFAULT_MASCOT }, ({ mascotId }) => mount(mascotId));
      } else {
        unmount();
      }
    }

    if (changes.mascotId && mounted) {
      sprite.style.setProperty("--sprite-url", `url(${spriteUrl(changes.mascotId.newValue)})`);
    }
  });
})();
