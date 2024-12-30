import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from '@/components/providers'
import DashboardLayout from '@/components/layout/DashboardLayout'
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "THC Nexus",
  description: "비즈니스 통합 관리 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body>
        <Providers>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </Providers>
      </body>
    </html>
  );
}
