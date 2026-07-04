import type { Metadata } from "next";
import "./globals.css";
import { comicRelief } from "@/lib/font";
import Duck from "./collection/duck/Duck";

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
        className={`${comicRelief.className} min-h-full flex flex-col bg-[#48A8A8] bg-[url('https://img.itch.zone/aW1nLzEwNDk2NzQ4LnBuZw==/original/eqMZWi.png')] bg-center`}
      >
        <Duck />
        {children}
      </body>
    </html>
  );
}
