import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../views/layout/Navbar";
import Sidebar from "../views/layout/Sidebar/Sidebar";
import QueryProvider from "../providers/QueryProvider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accretion AMS",
  description: "Personal Asset Management System",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <QueryProvider>
          <div className="flex flex-row w-full">
            <Suspense fallback={<div>Loading...</div>}>
              <Sidebar />
            </Suspense>
          
            <main className="flex-1 flex flex-col">
              <Navbar />
              <div className="px-5 py-2 bg-gray-100">
                  {children}
              </div>
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
