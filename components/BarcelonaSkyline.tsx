type SkylineProps = { className?: string };

/**
 * Thin line-art illustration of a stylised Barcelona skyline — Eixample
 * apartment blocks, a Gaudí-esque wavy facade, and a Sagrada Família–style
 * spire cluster. Pure outline, no fills, meant to sit at very low opacity
 * as a decorative background texture (color/opacity controlled by the
 * parent via `currentColor` + a text-color utility class).
 */
export default function BarcelonaSkyline({ className = "" }: SkylineProps) {
  return (
    <svg
      viewBox="0 0 1440 320"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="310" x2="1440" y2="310" />

      {/* left buildings */}
      <rect x="0" y="190" width="80" height="120" />
      <rect x="80" y="150" width="70" height="160" />
      <rect x="95" y="170" width="10" height="14" />
      <rect x="115" y="170" width="10" height="14" />
      <rect x="135" y="170" width="10" height="14" />
      <rect x="95" y="200" width="10" height="14" />
      <rect x="115" y="200" width="10" height="14" />
      <rect x="135" y="200" width="10" height="14" />
      <rect x="150" y="210" width="60" height="100" />
      <path d="M210,170 L255,140 L300,170" />
      <line x1="210" y1="170" x2="210" y2="310" />
      <line x1="300" y1="170" x2="300" y2="310" />
      <rect x="300" y="195" width="75" height="115" />
      <path d="M375,200 C390,180 405,215 420,190 C435,165 450,205 460,195" />
      <line x1="375" y1="200" x2="375" y2="310" />
      <line x1="460" y1="195" x2="460" y2="310" />
      <rect x="460" y="220" width="70" height="90" />

      {/* cathedral body + spires */}
      <rect x="530" y="230" width="300" height="80" />
      <path d="M700,310 v-40 a40,40 0 0 1 80,0 v40" />
      <path d="M650,230 L654,90 L660,50 L666,90 L670,230" />
      <circle cx="660" cy="42" r="3" />
      <path d="M690,230 L694,70 L700,30 L706,70 L710,230" />
      <circle cx="700" cy="22" r="3" />
      <path d="M730,230 L734,90 L740,50 L746,90 L750,230" />
      <circle cx="740" cy="42" r="3" />
      <path d="M770,230 L774,70 L780,30 L786,70 L790,230" />
      <circle cx="780" cy="22" r="3" />
      <path d="M810,230 L814,100 L820,60 L826,100 L830,230" />
      <circle cx="820" cy="52" r="3" />

      {/* right buildings */}
      <rect x="850" y="200" width="80" height="110" />
      <rect x="865" y="215" width="10" height="14" />
      <rect x="885" y="215" width="10" height="14" />
      <rect x="865" y="245" width="10" height="14" />
      <rect x="885" y="245" width="10" height="14" />
      <rect x="865" y="275" width="10" height="14" />
      <rect x="885" y="275" width="10" height="14" />
      <rect x="930" y="160" width="90" height="150" />
      <rect x="945" y="130" width="60" height="30" />
      <rect x="960" y="105" width="30" height="25" />
      <line x1="975" y1="105" x2="975" y2="80" />
      <rect x="1020" y="215" width="70" height="95" />
      <rect x="1090" y="140" width="110" height="170" />
      <path d="M1090,180 C1115,170 1125,190 1150,180 C1175,170 1185,190 1200,180" />
      <path d="M1090,210 C1115,200 1125,220 1150,210 C1175,200 1185,220 1200,210" />
      <path d="M1090,240 C1115,230 1125,250 1150,240 C1175,230 1185,250 1200,240" />
      <rect x="1200" y="225" width="80" height="85" />
      <rect x="1280" y="180" width="100" height="130" />
      <rect x="1380" y="205" width="60" height="105" />
    </svg>
  );
}
