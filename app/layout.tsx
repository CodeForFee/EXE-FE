import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import { Providers } from "@/lib/providers";
import ChatBot from "@/components/ui/ChatBot";
import PageLoader from "@/components/ui/PageLoader";
import RouteLoader from "@/components/ui/RouteLoader";
import { Suspense } from "react";
import "./globals.css";

const heading = Bricolage_Grotesque({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const body = Newsreader({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "UNIHOME - Nội thất cho sinh viên",
  description: "Nền tảng mua bán nội thất giá rẻ, phù hợp túi tiền cho sinh viên và người mới đi làm",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${heading.variable} ${body.variable} font-body antialiased`} suppressHydrationWarning>
        <Providers>
          <PageLoader />
          <Suspense fallback={null}>
            <RouteLoader />
          </Suspense>
          {children}
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}

