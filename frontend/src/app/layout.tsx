"use client";

import "./globals.css";
import { ConfigProvider, App } from "antd";
import { blossomTheme } from "@/theme/config";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-pink-50" suppressHydrationWarning>
        <ConfigProvider theme={blossomTheme}>
          <App>
            <main>{children}</main>
          </App>
        </ConfigProvider>
      </body>
    </html>
  );
}
