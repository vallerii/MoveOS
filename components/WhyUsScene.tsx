import type { PainSlug } from "@/lib/i18n/types";

type Props = { pain: PainSlug; className?: string };

/**
 * One scene per page for the "every move-out is different" section.
 *
 * Unlike the hero drawings, which name the *subject* of a page with a single
 * object, these illustrate the *promise* — the "we help by…" line sitting
 * beside them. That line is different on all six pages, so a shared image
 * (which is what this section had: the same two product artifacts everywhere)
 * quietly contradicted it.
 *
 * Landscape rather than square, because the slot is a wide half-column, and
 * composed of two or three objects rather than one: a promise is a small
 * story — inspect this, sort that, move the other — and a single icon can't
 * carry it.
 *
 * Same construction as the rest of the site's drawings: outlines only,
 * `currentColor`, plain geometry. Decorative, so hidden from assistive tech —
 * the sentence beside each is the real content.
 */

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Deposit — "we check the report and the move-out photos": a document and a
 *  photo, read under a magnifier. */
function DepositScene() {
  return (
    <g {...STROKE}>
      <rect x="20" y="36" width="118" height="158" rx="8" />
      <path d="M40 68h78M40 92h78M40 116h50" />
      <rect x="150" y="70" width="146" height="112" rx="8" />
      <path d="M150 152l40-34 30 24 24-20 52 40" />
      <circle cx="258" cy="104" r="12" />
      <circle cx="176" cy="150" r="44" />
      <path d="M208 182l30 30" />
    </g>
  );
}

/** Admin — "we go through the paperwork and the mistakes in it": a rejected
 *  form becoming an accepted one. */
function AdminScene() {
  return (
    <g {...STROKE}>
      <rect x="20" y="44" width="104" height="142" rx="8" />
      <path d="M38 76h68M38 98h68M38 120h44" />
      <circle cx="106" cy="164" r="20" />
      <path d="M99 157l14 14M113 157l-14 14" />
      <path d="M146 116h44M176 100l18 16-18 16" />
      <rect x="212" y="44" width="104" height="142" rx="8" />
      <path d="M230 76h68M230 98h68M230 120h44" />
      <circle cx="298" cy="164" r="20" />
      <path d="M289 164l6 7 12-13" />
    </g>
  );
}

/** Belongings — "we take an inventory and arrange the removal": a checklist,
 *  the boxes it counts, and the van they leave in. */
function BelongingsScene() {
  return (
    <g {...STROKE}>
      <rect x="20" y="40" width="86" height="150" rx="8" />
      <rect x="46" y="30" width="34" height="20" rx="5" />
      <path d="M38 84h50M38 110h50M38 136h30" />
      <path d="M118 150h56v44h-56z" />
      <path d="M112 136h68v14h-68z" />
      <path d="M146 136v58" />
      <path d="M196 108h58l26 30v40h-84z" />
      <path d="M254 108v30h26" />
      <circle cx="218" cy="188" r="12" />
      <circle cx="266" cy="188" r="12" />
    </g>
  );
}

/** Urgent — "we tell you what to do first, step by step": three marked steps
 *  climbing to a finish flag. */
function UrgentScene() {
  return (
    <g {...STROKE}>
      <path d="M34 186h56v-40H34zM90 186h56v-72H90zM146 186h56v-104h-56z" />
      <circle cx="62" cy="120" r="14" />
      <circle cx="118" cy="88" r="14" />
      <circle cx="174" cy="56" r="14" />
      <path d="M76 120h28M132 88h28" strokeDasharray="4 6" />
      <path d="M240 186V44" />
      <path d="M240 52h56l-14 18 14 18h-56" />
      <path d="M222 186h36" />
    </g>
  );
}

/** Buyout — "we price it against the market and pay the deposit the same
 *  day": the two sides weighed, with the day it lands. */
function BuyoutScene() {
  return (
    <g {...STROKE}>
      <path d="M120 44v134M96 178h48" />
      <path d="M46 70h148" />
      <circle cx="120" cy="70" r="7" />
      <path d="M46 70v22M194 70v22" />
      <path d="M14 92a32 32 0 0 0 64 0zM162 92a32 32 0 0 0 64 0z" />
      <ellipse cx="46" cy="140" rx="24" ry="8" />
      <path d="M22 140v12c0 4 11 8 24 8s24-4 24-8v-12" />
      <path d="M22 152v12c0 4 11 8 24 8s24-4 24-8v-12" />
      <path d="M172 132h44v30h-44z" />
      <path d="M170 132l24-18 24 18" />
      <rect x="248" y="60" width="60" height="56" rx="7" />
      <path d="M248 78h60M264 52v14M292 52v14" />
      <path d="M266 98l7 8 13-15" />
    </g>
  );
}

/** Repair — "we compare before and after, and separate wear from damage":
 *  two photos held side by side under a lens. */
function RepairScene() {
  return (
    <g {...STROKE}>
      <rect x="18" y="52" width="128" height="104" rx="8" />
      <path d="M18 130l34-28 24 20 20-16 50 38" />
      <path d="M62 96l14-16 10 22-16 6z" />
      <rect x="174" y="52" width="128" height="104" rx="8" />
      <path d="M174 130l34-28 24 20 20-16 50 38" />
      <circle cx="266" cy="82" r="10" />
      <path d="M150 104h20M162 96l8 8-8 8" />
      <circle cx="120" cy="164" r="34" />
      <path d="M144 188l24 24" />
    </g>
  );
}

const SCENES: Record<PainSlug, () => JSX.Element> = {
  deposit: DepositScene,
  admin: AdminScene,
  belongings: BelongingsScene,
  urgent: UrgentScene,
  buyout: BuyoutScene,
  repair: RepairScene,
};

export default function WhyUsScene({ pain, className = "" }: Props) {
  const Scene = SCENES[pain];

  return (
    <svg viewBox="0 0 320 220" className={className} aria-hidden focusable="false">
      <Scene />
    </svg>
  );
}
