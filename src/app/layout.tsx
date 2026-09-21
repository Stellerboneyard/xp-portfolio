import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "aryan-raj — xp",
  description: "Aryan Raj's portfolio, built as a working Windows XP-style desktop in the browser.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full">{children}</body>
    </html>
  );
}
