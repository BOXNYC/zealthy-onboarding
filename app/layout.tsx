import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Zealthy Onboarding",
  description: "Take-home assignment for Zealthy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <header className="fixed z-[1] top-0 left-0 w-full py-8 bg-[#f2f4e9] backdrop-blur-2xl">
          <div className="px-4 sm:px-0 max-w-[640px] mx-auto">
            <Link href="/">
              <Image alt="Zealthy logo" width={150} height={0} loading="lazy" src="https://cdn.prod.website-files.com/64ac3a433180d94638a63ead/64acc00e5f8b28a1f8b430a9_Logo-Zealthy-Black.svg" className="h-auto" />
            </Link>
          </div>
        </header>
        <main className="flex flex-col items-center justify-center min-h-full max-w-[640px] mx-auto pt-[7rem] pb-[2rem] px-4 sm:px-0">
          <div className="w-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
