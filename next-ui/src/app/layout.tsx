import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/features/common/providers/query-provider";
import SessionProvider from "@/features/common/providers/session-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "next-nest-auth",
  description: "A Next.js UI with NestJS Backend using next-auth v4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
        />
      </head>
      <body className="antialiased">
        <SessionProvider>
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
