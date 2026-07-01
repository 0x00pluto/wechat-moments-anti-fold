import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { GeoJsonLd } from "@/components/geo-jsonld";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL } from "@/lib/geo";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "防折叠黑科技 - 朋友圈防折叠混淆利器",
  description:
    "朋友圈防折叠文案混淆工具。基于 RLO 与 PDF 隐形重排技术，浏览器本地处理、即时预览、零上传。由互远 AI 智赢工具系列提供。",
  keywords: [
    "朋友圈防折叠",
    "RLO",
    "文案混淆",
    "互远AI",
    "智赢",
    "防折叠黑科技",
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "防折叠黑科技",
    title: "防折叠黑科技 - 朋友圈防折叠混淆利器",
    description:
      "基于 RLO 与 PDF 隐形重排技术的防折叠工具，纯浏览器本地处理，不上传服务器。",
  },
  twitter: {
    card: "summary_large_image",
    title: "防折叠黑科技 - 朋友圈防折叠混淆利器",
    description:
      "基于 RLO 与 PDF 隐形重排技术的防折叠工具，纯浏览器本地处理。",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <GeoJsonLd />
      </head>
      <body
        className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200"
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
