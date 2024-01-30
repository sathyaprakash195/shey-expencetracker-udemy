import type { Metadata } from "next";
import "./globals.css";
import "./auth.css";
import 'remixicon/fonts/remixicon.css'

import ThemeProvider from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "@/providers/layout-provider";

export const metadata: Metadata = {
  title: "Shey Expence-Tracker",
  description: "A simple expence tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
