import type { Metadata } from "next";
import 'typeface-inter';
import "./globals.css";
import Navbar from "@/components/navbar.component";


export const metadata: Metadata = {
  title: "Finance Friend",
  description: "A game that promotes local businesses while teaching educational finance"
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="text-white h-screen bg-white">
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
