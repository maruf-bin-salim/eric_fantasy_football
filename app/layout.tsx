import type { Metadata } from "next";
import { Inter, Roboto, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import BottomMenu from "./components/BottomMenu";
import { Analytics } from "@vercel/analytics/react";

// import { ThemeProvider } from "./theme-provider";
// import ThemeRegistry from "./ThemeRegistry";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Once Fantasy",
  description: "Ayuda con La Liga Futbol Fantasy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.className}`}>
        <Navbar />
        <main className="container max-w-6xl ">
          

          {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
          {/* <ThemeRegistry options={{ key: "mui" }}> */}
          {children}
          {/* </ThemeRegistry> */}
          {/* </ThemeProvider> */}
          <Analytics />
        </main>
        <Footer />
        <BottomMenu />
      </body>
    </html>
  );
}
