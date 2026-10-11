import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import ThemeTransitionHandler from "./components/ThemeTransitionHandler";

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

// Runs before React hydrates — prevents flash of wrong theme.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored || 'light'; // default to light
    var root = document.documentElement;
    root.classList.remove('light-mode', 'dark-mode', 'dark');
    if (theme === 'dark') {
      root.classList.add('dark', 'dark-mode');
    } else {
      root.classList.add('light-mode');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light-mode" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
      >
        <ThemeTransitionHandler />
        {children}
      </body>
    </html>
  );
}