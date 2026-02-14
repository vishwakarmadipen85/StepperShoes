import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/context/UIContext";
import CartDrawer from "@/components/layout/CartDrawer";
import AuthModal from "@/components/layout/AuthModal";
import Global3DBackground from "@/components/canvas/Global3DBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stepper Shoes",
  description: "Unbelievably Comfortable Sustainable Footwear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Global3DBackground />
        <UIProvider>
          {children}
          <CartDrawer />
          <AuthModal />
        </UIProvider>
      </body>
    </html>
  );
}
