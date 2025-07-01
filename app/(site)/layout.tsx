import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "Runaway Society",
  keywords: ["Runaway Society", "EcoExplore", "Tunisia", "Ecotourism", "Nature", "Travel"],
  description: "Explore Tunisia's natural beauty with Runaway Society. Discover ecotourism destinations, activities, and sustainable travel tips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="flex mx-auto justify-center">
            <Navbar />
          </div>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}