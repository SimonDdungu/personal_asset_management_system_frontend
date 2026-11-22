import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import QueryProvider from "@/src/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <>
          {children}
      </>
  );
}
