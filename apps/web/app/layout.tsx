import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./components/QueryProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
