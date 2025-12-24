import type { Metadata } from "next";
import { primaryFont, monoFont } from "./fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Aurora from "@/components/AuroraBackground";

export const metadata: Metadata = {
  title: "Iatisam Nawaz",
  description: "Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${primaryFont.variable} ${monoFont.variable} antialiased relative`}
      >
        <div className="fixed inset-0 -z-10">
          <Aurora 
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={0.5}
            speed={0.5}
          />
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
