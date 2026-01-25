import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "탄탄방수타일 | 방수 타일 전문 시공업체",
  description: "타일은 깔고, 방수는 설계합니다. 보이지 않는 곳까지 시공하는 방수 타일 전문 업체 탄탄방수타일입니다.",
  keywords: "방수, 타일, 방수시공, 타일시공, 욕실방수, 베란다방수, 옥상방수",
  openGraph: {
    title: "탄탄방수타일 | 방수 타일 전문 시공업체",
    description: "타일은 깔고, 방수는 설계합니다. 보이지 않는 곳까지 시공하는 방수 타일 전문 업체",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
