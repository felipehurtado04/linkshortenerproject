import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
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
  title: "LinkShortener",
  description: "Create and manage short links.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider appearance={{ theme: shadcn }}>
          <header className="flex h-16 items-center justify-between border-b border-[#e7ebf0] bg-white px-6 dark:border-[#263544] dark:bg-[#0c151d] sm:px-10 lg:px-16">
            <Link
              className="flex items-center gap-2.5 font-semibold tracking-tight text-[#1d2d43] dark:text-[#e8edf4]"
              href="/"
            >
              <span className="flex size-8 items-center justify-center bg-[#1d3554] text-white dark:bg-[#a9c5e4] dark:text-[#132338]">
                <Link2 aria-hidden="true" className="size-4" />
              </span>
              LinkShortener
            </Link>
            <nav className="flex items-center gap-3" aria-label="Account">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-[#526176] hover:bg-[#f4f6f8] hover:text-[#1d3554] dark:text-[#b8c4d2] dark:hover:bg-[#1b2b3b] dark:hover:text-white"
                  >
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    variant="default"
                    size="lg"
                    className="rounded-md bg-[#1d3554] px-4 text-white hover:bg-[#28486e] dark:bg-[#a9c5e4] dark:text-[#132338] dark:hover:bg-[#c0d5ec]"
                  >
                    Get started
                  </Button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </nav>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
