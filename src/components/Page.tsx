"use client";

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
      {showHeader && <ResponsiveAppBar />}
      <main className={`${styles.main} ${styles.page} ${className} page`}>
        {children}
      </main>
      {showFooter && <StickyFooter />}
    </>
  );
}
