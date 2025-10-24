import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "HGGOP",
  description: "Hervormde Gemeente Giessen-Oudekerk en Peursum",
  icons: {
    icon: [
      { url: "/assets/image_1761243233618.png", type: "image/png" },
    ],
    shortcut: [
      { url: "/assets/image_1761243233618.png", type: "image/png" },
    ],
    apple: [
      { url: "/assets/image_1761243233618.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
