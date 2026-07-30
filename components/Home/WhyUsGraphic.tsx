import { CheckCircleIcon, ShieldCheckIcon, MailIcon } from "../icons";

// One-off "home" icon — none of the shared icons quite reads as a house, and
// this graphic is specific to the homepage WhyUs card, so it lives here
// rather than widening components/icons.tsx for a single usage.
function HomeNodeIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

type Props = {
  /** Concrete "what we do" lines (full sentences, not single words). */
  advantages: string[];
};

/**
 * Dark "what we do" card for the homepage-only WhyUs section — a checklist
 * of concrete actions. The dashed lines + icon nodes are a faint full-card
 * background layer (low opacity, z-0, spread across the whole card) rather
 * than a corner cluster — they were previously confined to one corner and
 * ended up sitting on top of the checklist text once it wrapped to longer
 * sentences. Deliberately separate from the shared
 * WhyUsBackground/WhyUs.tsx used on pain pages.
 */
export default function WhyUsGraphic({ advantages }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1717] p-6 sm:p-8">
      {/* Background layer — z-0, low opacity, spans the full card so it
          reads as ambient texture behind the content instead of a
          competing element. */}
      

      <p className="relative z-10 text-sm font-bold text-white">
        Move<span className="text-brand-primary">OS</span>
      </p>

      <ul className="relative z-10 mt-6 space-y-5">
        {advantages.map((text) => (
          <li key={text} className="flex items-start gap-3">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
            <p className="text-sm text-white/90 sm:text-base">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
