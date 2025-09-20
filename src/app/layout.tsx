import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Search from "@/components/Search";
import { I18nProvider } from "@/contexts/I18nContext";

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

// export default function RootLayout({
//   children,
//    params: { lng },
// }: Readonly<{
//   children: React.ReactNode;
//    params: { lng: string };
// }>) {
//   return (
//     <html lang={lng} dir="ltr">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Navbar></Navbar>
//         <Search></Search>
//         {children}
//         <Footer></Footer>
//       </body>
//     </html>
//   );
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider>
          <Navbar />
          <Search></Search>
          <main>{children}</main>
          <Footer></Footer>
        </I18nProvider>
      </body>
    </html>
  );
}
