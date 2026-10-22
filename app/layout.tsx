import "./globals.css";
import { createMetadata, createViewport } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";

export const metadata = createMetadata();
export const viewport = createViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-secondary">
        <JsonLd />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
