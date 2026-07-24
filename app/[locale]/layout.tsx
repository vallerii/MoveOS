import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SetHtmlLang from "@/components/SetHtmlLang";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <SetHtmlLang locale={locale} />
      <Header locale={locale} dict={dict} />
      {children}
      <Footer locale={locale} dict={dict} />
    </>
  );
}
