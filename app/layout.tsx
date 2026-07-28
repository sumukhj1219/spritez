import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const title = "ClaudeSpritez";
const description =
  "A curated collection of highly interactive, animated pixel-art Claude mascots for React and Next.js. Pick a sprite, copy the snippet, drop it in.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
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
  icons: {
    icon: [{ url: "/preview/c1-preview.png", type: "image/png" }],
    shortcut: [{ url: "/preview/c1-preview.png", type: "image/png" }],
    apple: [{ url: "/preview/c1-preview.png", type: "image/png" }],
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: title,
    type: "website",
    images: [
      {
        url: "/app/og.png",
        width: 3840,
        height: 2880,
        alt: "ClaudeSpritez — interactive Claude mascots",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/app/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={` min-h-full flex flex-col bg-secondary`}
      >
        {children}
      </body>
    </html>
  );
}
