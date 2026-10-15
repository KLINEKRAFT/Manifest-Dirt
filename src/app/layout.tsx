import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";
const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});
const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
});
const editorial = Newsreader({
  subsets: ["latin"],
  variable: "--font-editorial",
});
export const metadata: Metadata = {
  title: "Manifest Dirt — Land later. A brighter tomorrow.",
  description:
    "A personal land purchase, publicly supported. No parcel selected. A satirical general fund for future territorial advancement in Oklahoma.",
  openGraph: {
    title: "Manifest Dirt",
    description:
      "A general fund for future territorial advancement. Land later.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${mono.variable} ${editorial.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
