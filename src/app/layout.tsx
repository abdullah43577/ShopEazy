import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import ReduxProvider from "@/redux/ReduxProvider/ReduxProvider";
import WebLayout from "@/redux/ReduxProvider/WebLayout";

export const metadata: Metadata = {
  title: "ShopEazy",
  description: "Ecommerce Website Platform - ShopEazy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/icon.png" sizes="any" />
      <body className="bg-white dark:bg-black" suppressHydrationWarning={true}>
        <ReduxProvider>
          <WebLayout>
            {children}
            <Analytics />
          </WebLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
