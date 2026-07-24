import type { Locale, Dictionary } from "./types";
import en from "./dictionaries/en";
import es from "./dictionaries/es";
import ru from "./dictionaries/ru";

export * from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, es, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}

/** Replaces {n} and {total} placeholders in a template string. */
export function formatTemplate(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    template
  );
}
