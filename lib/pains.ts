import type { PainSlug } from "./i18n/types";
import { PAIN_SLUGS } from "./i18n/types";
import {
  ScaleIcon,
  MailIcon,
  GiftIcon,
  ClockIcon,
} from "@/components/icons";

export { PAIN_SLUGS };
export type { PainSlug };

/** Icon shown next to the pain in nav/quiz contexts. */
export const PAIN_ICONS: Record<PainSlug, typeof ScaleIcon> = {
  deposit: ScaleIcon,
  admin: MailIcon,
  belongings: GiftIcon,
  urgent: ClockIcon,
};

export function isPainSlug(value: string): value is PainSlug {
  return (PAIN_SLUGS as string[]).includes(value);
}
