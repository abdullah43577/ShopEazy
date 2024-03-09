import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider/ReduxProvider";
import { Analytics } from "@vercel/analytics/react";

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
      <body className="bg-white dark:bg-black" suppressHydrationWarning={true}>
        <ReduxProvider>
          {children}
          <Analytics />
        </ReduxProvider>
      </body>
    </html>
  );
}
