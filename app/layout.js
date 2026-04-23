import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Jess M. Toledo | Portfolio",
  description: "Computer Engineering Student | Portfolio",
};

import ThemeTransitionHandler from "./components/ThemeTransitionHandler";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light-mode no-transitions">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
      >
        <ThemeTransitionHandler />
        {children}
      </body>
    </html>
  );
}
