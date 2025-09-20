import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Search from "@/components/Search";
import { dir } from "i18next";
import { languages } from "../i18n/settings"; // we’ll create this
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb | Vacation rentals, cabins, beach houses, & more",
  description: "Airbnb | Vacation rentals, cabins, beach houses, & more",
};

export async function generateStaticParams() {
  return languages.map((lng: any) => ({ lng }));
}

export default function RootLayout({
  children,
   params: { lng },
}: Readonly<{
  children: React.ReactNode;
   params: { lng: string };
}>) {
  return (
    <html lang={lng} dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar></Navbar>
        <Search></Search>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
