import localFont from "next/font/local";
import "./globals.css";

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

export const metadata = {

  title: "ChordVibe - Modern Piano Progression Generator",
  description:
    "Explore and play chord progressions from your favorite artists with ChordVibe! A fun, interactive piano app for young musicians to learn, jam, and create music.",
  keywords: [
    "piano progressions",
    "chord generator",
    "music app",
    "learn piano",
    "music creation",
    "interactive piano",
    "artist chords",
    "young musicians",
  ],
  authors: [{ name: "Leonardo Santa Cruz" }],
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.chordvibe.vercel.app",
  },


  openGraph: {
    title: "ChordVibe - Modern Piano Progression Generator",
    description:
      "Discover chord progressions from top artists and play them on an interactive piano with ChordVibe! Perfect for learning, jamming, and creating music. 🎹",
    url: "https://www.chordvibe.vercel.app",
    siteName: "ChordVibe",
    images: [
      {
        url: "https://www.chordvibe.vercel.app/images/logo.webp",
        width: 1200,
        height: 630,
        alt: "ChordVibe Logo - Interactive Piano Progression Generator",
      },
    ],
    locale: "es_ES",
    type: "website",
  },


  twitter: {
    card: "summary_large_image",
    title: "ChordVibe - Modern Piano Progression Generator",
    description:
      "Play chord progressions from your favorite artists on an interactive piano with ChordVibe! 🎶 Perfect for young musicians to learn and create.",
    images: ["https://www.chordvibe.vercel.app/images/logo.webp"],
    creator: "@eltuiterdeleo",
  },


  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
