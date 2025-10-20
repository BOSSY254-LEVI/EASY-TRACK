import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy Track - Data for Life. Insight for Action.",
  description: "Premium collaborative data dashboard for field teams in health, water, and climate action across Africa and developing regions.",
  keywords: ["Easy Track", "Data Dashboard", "Field Teams", "Health", "Water", "Climate Action", "Africa", "Development"],
  authors: [{ name: "Easy Track Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Easy Track - Data for Life",
    description: "Empowering field teams with data-driven insights for health, water, and climate action",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Easy Track - Data for Life",
    description: "Empowering field teams with data-driven insights",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            {children}
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
