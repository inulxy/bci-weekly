import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeuralPulse Weekly · 脑机接口领域周报",
  description:
    "每周追踪脑机接口（BCI）领域最重要的进展，覆盖学术论文、公司动态、临床进展、技术突破、政策法规。",
  keywords: ["脑机接口", "BCI", "Neuralink", "神经科学", "脑科学"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
