import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "수거넷 중고 PC 매입 | 최고가 보장 당일 방문",
  description: "중고 컴퓨터, 노트북, 모니터 최고가 매입 전문. 데이터 완전 파기 서비스와 당일 전국 출장 매입을 지원합니다.",
  keywords: ["중고컴퓨터매입", "중고노트북매입", "모니터처분", "당일매입", "데이터파기"],
  openGraph: {
    title: "수거넷 중고 PC 매입 | 최고가 보장 당일 방문",
    description: "견적 신청부터 입금까지 단 하루! 안심하고 판매하는 중고 가전 매입 서비스",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 min-h-screen flex flex-col`}
      >
        <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              수거넷 PC
            </div>
            <nav className="hidden md:flex gap-8 text-sm font-medium">
              <a href="#hero" className="hover:text-primary transition-colors">홈</a>
              <a href="#process" className="hover:text-primary transition-colors">매입절차</a>
              <a href="#form" className="hover:text-primary transition-colors">견적문의</a>
              <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            </nav>
            <a
              href="#form"
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            >
              내 PC 가격 확인
            </a>
          </div>
        </header>

        <main className="flex-grow pt-16">
          {children}
        </main>

        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 opacity-60 text-sm">
              &copy; {new Date().getFullYear()} 수거넷 Computer. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
