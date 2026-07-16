import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gadget — Premium Tech Accessories",
  description:
    "Curated accessories for AirPods, Smart Watches, Headphones, and Power Banks.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
