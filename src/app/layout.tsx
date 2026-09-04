import type { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "RagingScout97 Systems | Prakhar Singh Rajput",
  description:
    "Pixel game-menu portfolio — ability tree, missions, arcade. Prakhar Singh Rajput / RagingScout97.",
  metadataBase: new URL("https://ragingscout97.in"),
  openGraph: {
    title: "RagingScout97 Systems",
    description: "Classic pixel game-menu portfolio",
    url: "https://ragingscout97.in",
    siteName: "RagingScout97",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full overflow-hidden bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
