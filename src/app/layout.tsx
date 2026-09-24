import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { JsonLd, organizationJsonLd } from "@/lib/seo/json-ld";
import "./globals.css";

const iranSans = localFont({
  src: [
    {
      path: "../fonts/iransans/IRANSansUltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/iransans/IRANSansLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/iransans/IRANSans.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/iransans/IRANSansMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/iransans/IRANSansBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/iransans/IRANSansBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/iransans/IRANSansBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/iransans/IRANSansBold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
  display: "optional",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    metadataBase: new URL("https://openedu.aut.ac.ir"),
    title: {
      default: t("homeTitle"),
      template: `%s | ${t("homeTitle")}`,
    },
    description: t("homeDescription"),
    icons: {
      icon: [{ url: "/brand/amirkabir.png", type: "image/png" }],
      apple: [{ url: "/brand/amirkabir.png", type: "image/png" }],
      shortcut: "/brand/amirkabir.png",
    },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: t("homeTitle"),
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: [{ url: "/brand/amirkabir.png", alt: "دانشگاه صنعتی امیرکبیر" }],
    },
    alternates: {
      canonical: "/",
      languages: { fa: "/" },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("nav");

  return (
    <html lang={locale} dir="rtl" className={`${iranSans.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:bg-card focus:px-3 focus:py-2"
          >
            {t("skipToContent")}
          </a>
          <JsonLd data={organizationJsonLd()} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
