import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Favicons } from "../components/Favicons";
import { Layout } from "../components/Layout";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
  weight: ["400", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: {
    default: "Justin Xu",
    template: "%s - Justin Xu",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-ca"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <Favicons />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
