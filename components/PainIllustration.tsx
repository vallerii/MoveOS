import type { PainSlug } from "@/lib/i18n/types";

/**
 * Each page carries two drawings, not one repeated: a `primary` object that
 * names the situation, and a `secondary` that sits with it. Mirroring a
 * single drawing twice reads as a texture; two different objects read as a
 * scene, which is the difference between decoration and a page having its
 * own picture.
 */
type Variant = "primary" | "secondary";

type Props = { pain: PainSlug; variant?: Variant; className?: string };

/**
 * One line-art illustration per move-out situation, for the pain-page heroes.
 *
 * Every pain page used to open on the same four floating product artifacts,
 * which undercut the whole promise the pages make — "a personal plan, not a
 * generic checklist" doesn't survive six identical heroes. These give each
 * page an image only it has.
 *
 * Drawn rather than photographed, and drawn as outlines: no fills, no
 * shading, `currentColor` throughout, so they inherit the ink and stay
 * weightless on the Paper canvas. Built from plain geometry — rectangles,
 * circles, straight runs — rather than freehand curves, which is what keeps
 * them legible at 200px and stops them drifting into stock-illustration
 * territory. Being SVG they carry no text, so nothing here needs translating.
 *
 * Decorative: the headline beside each one already says what the page is
 * about, so they're hidden from assistive tech.
 */

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Deposit — a banknote sliding out of an open envelope, with a euro coin. */
function Deposit() {
  return (
    <g {...STROKE}>
      <rect x="30" y="30" width="104" height="54" rx="6" />
      <rect x="48" y="44" width="68" height="26" rx="4" />
      <circle cx="82" cy="57" r="8" />
      <path d="M30 96h116a6 6 0 0 1 6 6v56a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6v-56a6 6 0 0 1 6-6z" />
      <path d="M24 102l64 40 64-40" />
      <circle cx="150" cy="52" r="26" />
      <path d="M158 42a12 12 0 1 0 0 20M142 48h14M142 56h14" />
    </g>
  );
}

/** Admin — a stack of filed papers with a stamped tick, and an envelope. */
function Admin() {
  return (
    <g {...STROKE}>
      <rect x="46" y="20" width="92" height="118" rx="6" />
      <rect x="34" y="34" width="92" height="118" rx="6" />
      <path d="M50 60h60M50 78h60M50 96h38" />
      <circle cx="112" cy="118" r="22" />
      <path d="M102 118l7 7 14-15" />
      <rect x="24" y="150" width="80" height="46" rx="5" />
      <path d="M24 155l40 24 40-24" />
    </g>
  );
}

/** Belongings — an open box with the things that stay behind beside it. */
function Belongings() {
  return (
    <g {...STROKE}>
      <path d="M30 92h92v72a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6z" />
      <path d="M22 70h108v22H22z" />
      <path d="M76 70V54" />
      <path d="M44 70L60 46h32l16 24" />
      {/* A chair, not a lamp: furniture left behind is the thing this page
          is actually about, and a chair survives being drawn in six lines. */}
      {/* Back as one panel rather than rails — evenly spaced horizontals
          read as a ladder, a filled outline reads as a chair. */}
      <rect x="136" y="56" width="46" height="50" rx="5" />
      <rect x="130" y="106" width="58" height="11" rx="3" />
      <path d="M137 117v40M181 117v40" />
    </g>
  );
}

/** Urgent — a wall calendar with a clock overlapping its corner. */
function Urgent() {
  return (
    <g {...STROKE}>
      <rect x="26" y="42" width="106" height="102" rx="7" />
      <path d="M26 68h106" />
      <path d="M52 30v20M106 30v20" />
      <path d="M44 88h16M76 88h16M44 114h16" />
      <circle cx="136" cy="132" r="38" />
      <path d="M136 108v24l16 11" />
    </g>
  );
}

/** Buyout — a signed contract handed over, with a euro coin arriving. */
function Buyout() {
  return (
    <g {...STROKE}>
      <path d="M36 24h68l26 26v92a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6V30a6 6 0 0 1 6-6z" />
      <path d="M104 24v26h26" />
      <path d="M48 66h58M48 84h58M48 102h34" />
      <path d="M48 122c10-8 18-8 26 0s16 8 26 0" />
      <circle cx="142" cy="150" r="30" />
      <path d="M151 139a14 14 0 1 0 0 23M133 146h16M133 154h16" />
    </g>
  );
}

/** Repair — a wall patch under a paint roller, with a screwdriver. */
function Repair() {
  return (
    <g {...STROKE}>
      {/* Tiled wall with a chipped patch marked out on it… */}
      <rect x="20" y="46" width="100" height="100" rx="6" />
      <path d="M20 80h100M20 114h100M54 46v34M88 80v34M54 114v32" />
      <path d="M62 88h22v18H62z" strokeDasharray="4 5" />
      {/* …and a paint roller beside it: barrel, cranked arm, grip. Drawn
          as separate connected runs rather than one outline, which is what
          makes it legible as a tool instead of an abstract shape. */}
      <rect x="126" y="40" width="52" height="22" rx="7" />
      <path d="M152 62v16h-18v12" />
      <rect x="124" y="90" width="20" height="42" rx="9" />
    </g>
  );
}


/* ---------- Secondary drawings — the object that sits with the first ---- */

/** Deposit — the keys being handed back. */
function DepositKeys() {
  return (
    <g {...STROKE}>
      <circle cx="64" cy="64" r="32" />
      <circle cx="64" cy="64" r="13" />
      <path d="M87 87l69 69" />
      <path d="M128 128l-16 16M146 146l-16 16" />
    </g>
  );
}

/** Admin — the utilities: a plug pulled from a socket. */
function AdminPlug() {
  return (
    <g {...STROKE}>
      <rect x="26" y="34" width="80" height="80" rx="10" />
      <circle cx="52" cy="74" r="6" />
      <circle cx="80" cy="74" r="6" />
      <rect x="118" y="120" width="56" height="44" rx="8" />
      <path d="M132 120V96M160 120V96" />
      <path d="M146 164v14" />
      <path d="M106 74h12" strokeDasharray="4 5" />
    </g>
  );
}

/** Belongings — a floor lamp left standing in an empty room. */
function BelongingsLamp() {
  return (
    <g {...STROKE}>
      <path d="M66 78l16-38h36l16 38z" />
      <path d="M100 78v78" />
      <path d="M74 172c0-9 12-16 26-16s26 7 26 16z" />
      <path d="M66 172h68" />
      <path d="M148 40v24M160 52h-24" />
    </g>
  );
}

/** Urgent — a packed suitcase, handle up. */
function UrgentSuitcase() {
  return (
    <g {...STROKE}>
      <rect x="34" y="66" width="132" height="94" rx="10" />
      <path d="M78 66V44a8 8 0 0 1 8-8h28a8 8 0 0 1 8 8v22" />
      <path d="M34 100h132M34 128h132" />
      <rect x="86" y="86" width="28" height="10" rx="3" />
      <path d="M58 160v14M142 160v14" />
    </g>
  );
}

/** Buyout — a stack of coins, the bonus paid out. */
function BuyoutCoins() {
  return (
    <g {...STROKE}>
      <ellipse cx="100" cy="58" rx="52" ry="18" />
      <path d="M48 58v26c0 10 23 18 52 18s52-8 52-18V58" />
      <path d="M48 84v26c0 10 23 18 52 18s52-8 52-18V84" />
      <path d="M48 110v26c0 10 23 18 52 18s52-8 52-18v-26" />
    </g>
  );
}

/** Repair — a wrench and a screwdriver crossed. */
function RepairTools() {
  return (
    <g {...STROKE}>
      <path d="M52 30a24 24 0 0 0 30 30l68 68a12 12 0 0 1-17 17L65 77a24 24 0 0 1-30-30z" />
      <rect x="118" y="24" width="26" height="40" rx="8" transform="rotate(45 131 44)" />
      <path d="M140 62L68 134" />
      <path d="M60 126l-18 18a12 12 0 0 0 17 17l18-18z" />
    </g>
  );
}

const ILLUSTRATIONS: Record<Variant, Record<PainSlug, () => JSX.Element>> = {
  primary: {
    deposit: Deposit,
    admin: Admin,
    belongings: Belongings,
    urgent: Urgent,
    buyout: Buyout,
    repair: Repair,
  },
  secondary: {
    deposit: DepositKeys,
    admin: AdminPlug,
    belongings: BelongingsLamp,
    urgent: UrgentSuitcase,
    buyout: BuyoutCoins,
    repair: RepairTools,
  },
};

export default function PainIllustration({ pain, variant = "primary", className = "" }: Props) {
  const Drawing = ILLUSTRATIONS[variant][pain];

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden focusable="false">
      <Drawing />
    </svg>
  );
}
