import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { montserrat} from '@/app/ui/fonts';
import Footer from "@/app/ui/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Physics Tutorials",
  description: "Created by",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className} antialiased ` }>{children}</body> */}
      <body className={`${montserrat.className} antialiased ` }>
        {children}
       <Footer />
        </body>
      
    </html>
  );
}
