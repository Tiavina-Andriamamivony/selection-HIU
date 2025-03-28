import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Quicksand } from 'next/font/google';

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
  title: "ElevenLabs Conversational AI Demo",
  description: "A demo of ElevenLabs Conversational AI",
};



const quicksand = Quicksand({ 
  subsets: ['latin'],
  variable: '--font-quicksand'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} font-sans`}>{children}</body>
    </html>
  );
}