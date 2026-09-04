import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "RagingScout97 Systems | Prakhar Singh Rajput",
  description:
    "Interactive Portfolio OS — full stack developer Prakhar Singh Rajput. Skill tree, missions, deployments.",
  metadataBase: new URL("https://ragingscout97.in"),
  openGraph: {
    title: "RagingScout97 Systems",
    description: "Game-menu portfolio for Prakhar Singh Rajput",
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
      className={`${syne.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-hidden bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
