import type { Metadata } from "next";
import "./globals.css";
import { GeistPixelCircle } from "geist/font/pixel";

export const metadata: Metadata = {
  title: "React Web Spritez",
  description: "An interactive floating and pixel sprites for React websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${GeistPixelCircle.className} min-h-full flex flex-col bg-secondary`}
      >
        {children}
      </body>
    </html>
  );
}
