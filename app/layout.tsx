import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Free Move-Out Review | Protect Your Deposit — MoveOS Barcelona",
  description:
    "Moving out of your Barcelona rental? Book a free 15-minute Move-Out Review and learn how to maximise your chances of getting your full deposit back — no obligation.",
  openGraph: {
    title: "Free Move-Out Review | MoveOS",
    description:
      "Free 15-minute call to help you get your full deposit back when you move out of your Barcelona rental.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
