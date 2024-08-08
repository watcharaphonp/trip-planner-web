"use client";

import TranslationProvider from "@/providers/TranslationProvider";
import styles from "../app/page.module.css";
import ResponsiveAppBar from "./ResponsiveAppBar";
import StickyFooter from "./StickyFooter";

export default function Page({
  showHeader = true,
  showFooter = true,
  children,
  className,
}: Readonly<{
  showHeader?: boolean;
  showFooter?: boolean;
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <>
      <TranslationProvider>
        {showHeader && <ResponsiveAppBar />}
        <main className={`page ${styles.main} ${styles.page} ${className}`}>
          {children}
        </main>
        {showFooter && <StickyFooter />}
      </TranslationProvider>
    </>
  );
}
