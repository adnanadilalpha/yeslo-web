import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Serif, Plus_Jakarta_Sans, Syne } from "next/font/google";
import { Cursor } from "@/components/layout/cursor";
import { site, siteUrl, themeBoot } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Yeslo — Send a quote. Get a yes.",
    template: "%s · Yeslo",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Yeslo — Send a quote. Get a yes.",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeslo — Send a quote. Get a yes.",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EEF4F0" },
    { media: "(prefers-color-scheme: dark)", color: "#07110E" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${syne.variable} ${instrument.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        {children}
        <Cursor />
      </body>
    </html>
  );
}
