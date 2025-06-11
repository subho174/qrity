import { Open_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthProvider";
import { AppProvider } from "../context/AppContext";
import { ThemeProvider } from "../context/ThemeProvider";
import Navbar from '@/src/components/Navbar';
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "QRity - Smart Attendance System",
  description:
    "QRity is a modern, QR code-based attendance system for educational institutes. Admins can create sessions, generate QR codes, and track student attendance effortlessly. Students can scan and view their attendance history instantly.",
  openGraph: {
    title: "QRity - Smart Attendance System",
    description:
      "QRity lets institutions manage attendance digitally using QR codes. Secure, fast, and user-friendly.",
    url: "https://qrity.vercel.app",
    siteName: "QRity",
    images: [
      {
        url: "https://qrity.vercel.app/favicon.ico",
        width: 400,
        height: 400,
        alt: "QRity - Smart Attendance System",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QRity - Smart Attendance System",
    description:
      "A powerful attendance solution using QR codes. Scan. Track. Simplify.",
    images: ["https://qrity.vercel.app/favicon.ico"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} antialiased min-h-screen scroll-smooth`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AppProvider>
              <Navbar />
              {children}
              <Toaster expand={true} position="top-right" richColors />
            </AppProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
