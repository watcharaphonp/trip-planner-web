import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import StoreProvider from "@/components/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.appTitle,
  description: process.env.appDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ key: "css", enableCssLayer: true }}>
          <StoreProvider>
            <ThemeProvider theme={theme}>{children} </ThemeProvider>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
