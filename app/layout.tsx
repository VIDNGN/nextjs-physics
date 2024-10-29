import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { montserrat } from "@/app/ui/fonts";
import Footer from "@/app/ui/footer/footer";
import { GoogleTagManager } from "@next/third-parties/google";
import MainHeader from "@/app/ui/main-headers/main-header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grok Vectors",
  description:
    "Introductory Math and Physics Tutorials  is a comprehensive sequence of questions and answers designed to supplement classroom instruction and official textbooks in introductory math and physics. Explore topics like Algebra, Geometry, Pre-Calculus, and Calculusfor math, and Mechanics, Electromagnetism, Heat, and Waves for physics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-NX6CBD34" />
      
      {/* <body className={`${inter.className} antialiased ` }>{children}</body> */}
      <body className={`${montserrat.className} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
