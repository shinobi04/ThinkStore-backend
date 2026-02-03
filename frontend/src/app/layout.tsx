import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import AntdProviders from "@/components/AntdProviders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Think Store",
  description: "Your second brain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} antialiased min-h-screen bg-[#0a0a0a] text-[#fafafa] grid-pattern`} suppressHydrationWarning>
        <AntdProviders>
          {children}
        </AntdProviders>
      </body>
    </html>
  );
}
