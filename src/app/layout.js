// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prime Digital | Professional Web & Mobile Solutions",
  description: "Prime Digital - Premium website development, mobile apps, and cybersecurity solutions. Bali-Indonesia",
  metadataBase: new URL("https://primedigitalid.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    title: "Prime Digital | Professional Web & Mobile Solutions",
    description: "Prime Digital - Premium website development, mobile apps, and cybersecurity solutions. Bali-Indonesia",
    url: "https://primedigitalid.com",
    siteName: "Prime Digital",
    images: [
      {
        url: "/images/prime.jpg",
        width: 1200,
        height: 630,
        alt: "Prime Digital Company Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Digital | Professional Web & Mobile Solutions",
    description: "Prime Digital - Premium website development, mobile apps, and cybersecurity solutions. Bali-Indonesia",
    images: ["/images/PD.jpg"],
    creator: "@primedigital",
  },
 icons: {
  icon: "/images/prime.jpg",
  shortcut: "/images/prime.jpg",
  apple: "/images/prime.jpg",
},

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
