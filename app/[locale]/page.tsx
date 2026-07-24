import { redirect } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { notFound } from "next/navigation";

export default function LocaleIndexPage({ params }: { params: { locale: string } }) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  redirect(`/${params.locale}/deposit`);
}
