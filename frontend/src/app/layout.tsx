import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { UIProvider } from "@/context/UIContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/layout/CartDrawer";
import AuthModal from "@/components/layout/AuthModal";
import ChatWidget from "@/components/ui/ChatWidget";
import Global3DBackground from '@/components/canvas/Global3DBackgroundLoader';

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
      <head>
      </head>
      <body className={inter.className}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-AEROSTEP_MOCK" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-AEROSTEP_MOCK');
          `}
        </Script>
        <Global3DBackground />
        <AuthProvider>
          <UIProvider>
            {children}
            <CartDrawer />
            <AuthModal />
            <ChatWidget />
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

