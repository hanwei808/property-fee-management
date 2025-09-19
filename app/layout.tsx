import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AppLayout } from "@/components/app-layout"
import "./globals.css"

export const metadata: Metadata = {
  title: "物业智能催收系统 3.0",
  description: "基于AI的智能化物业费催收管理平台",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <AppLayout>{children}</AppLayout>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
