import type { Metadata, MetadataRoute, Viewport } from "next";

export const siteConfig = {
  name: "ClaudeSpritez",
  url: "https://claudespritez.fun",
  description:
    "A curated collection of highly interactive, animated pixel-art Claude mascots for React and Next.js. Pick a sprite, copy the snippet, drop it in.",
  keywords: [
    "Claude",
    "Claude sprites",
    "Claude mascot",
    "pixel art",
    "React components",
    "Next.js",
    "claudesprites",
    "animated sprites",
  ],
  ogImage: {
    url: "/app/og.jpg",
    width: 1200,
    height: 900,
    alt: "ClaudeSpritez — interactive Claude mascots",
  },
  icon: "/preview/c1-preview.png",
  repo: "https://github.com/sumukhj1219/spritez",
  npmPackage: "claudesprites",
  themeColor: "#e8e5dc",
};

/**
 * Base URL for canonical links, Open Graph images and the sitemap.
 * Production always uses the real domain; Vercel preview deployments use their
 * own URL so their links don't point at production.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_ENV === "production") return siteConfig.url;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: typeof siteConfig.ogImage;
  noIndex?: boolean;
}

/**
 * Builds a page's metadata from the site defaults. Call with no arguments in
 * the root layout; pass overrides from individual pages.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: title ?? {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: siteConfig.keywords,
    applicationName: siteConfig.name,
    alternates: { canonical: path },
    icons: {
      icon: [{ url: siteConfig.icon, type: "image/png" }],
      apple: [{ url: siteConfig.icon, type: "image/png" }],
    },
    openGraph: {
      title: title ?? siteConfig.name,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.name,
      description,
      images: [image.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
  };
}

export function createViewport(): Viewport {
  return {
    themeColor: siteConfig.themeColor,
    colorScheme: "light",
  };
}

/** Structured data for the home page; rendered with <JsonLd />. */
export function createJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en",
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${url}/#package`,
        name: siteConfig.npmPackage,
        description: siteConfig.description,
        codeRepository: siteConfig.repo,
        programmingLanguage: ["TypeScript", "React"],
        runtimePlatform: "Node.js",
        url: `https://www.npmjs.com/package/${siteConfig.npmPackage}`,
        image: new URL(siteConfig.ogImage.url, url).toString(),
      },
    ],
  };
}

export function createRobots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}

export function createSitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getSiteUrl(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
