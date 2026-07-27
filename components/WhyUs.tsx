import Reveal from "./Reveal";
import { CameraIcon, ClockIcon, DocumentTextIcon, ScaleIcon } from "./icons";
import type { Dictionary, PainSlug } from "@/lib/i18n/types";

type Props = { dict: Dictionary; pain: PainSlug };

const badges = [
  {
    Icon: CameraIcon,
    left: "10%",
    top: "34%",
    size: "h-11 w-11 sm:h-16 sm:w-16",
    icon: "h-4 w-4 sm:h-6 sm:w-6",
    rotate: "-rotate-6",
    color: "primary" as const,
  },
  {
    Icon: ClockIcon,
    left: "22%",
    top: "62%",
    size: "h-14 w-14 sm:h-20 sm:w-20",
    icon: "h-5 w-5 sm:h-8 sm:w-8",
    rotate: "rotate-3",
    color: "primary" as const,
  },
  {
    Icon: DocumentTextIcon,
    left: "78%",
    top: "32%",
    size: "h-12 w-12 sm:h-16 sm:w-16",
    icon: "h-4 w-4 sm:h-6 sm:w-6",
    rotate: "rotate-6",
    color: "accent" as const,
  },
  {
    Icon: ScaleIcon,
    left: "90%",
    top: "62%",
    size: "h-16 w-16 sm:h-24 sm:w-24",
    icon: "h-6 w-6 sm:h-9 sm:w-9",
    rotate: "-rotate-3",
    color: "accent" as const,
  },
];

export default function WhyUs({ dict, pain }: Props) {
  const { heading, intro, body } = dict.whyUs;

  return (
    <section className="relative overflow-hidden bg-brand-ink py-20 text-brand-background sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 sm:opacity-70">
        <div className="absolute left-[6%] top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-brand-primary/20 blur-3xl sm:h-48 sm:w-48" />
        <div className="absolute right-[6%] top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-brand-accent/20 blur-3xl sm:h-48 sm:w-48" />
        <div
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/50 shadow-[0_0_10px_3px_rgba(244,185,66,0.25)]"
          style={{ left: "38%", top: "50%" }}
        />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-20,10 C120,80 60,160 180,140 C260,125 300,190 380,160"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 7"
            className="text-brand-primary/30"
          />
          <path
            d="M0,130 C100,55 190,205 300,155 C340,130 360,150 380,150"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 8"
            className="text-brand-primary/55"
          />
          <path
            d="M380,150 C400,150 430,130 470,155 C620,210 890,60 1000,130"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 8"
            className="text-brand-accent/55"
          />
          <path
            d="M620,160 C700,190 740,125 820,140 C940,160 880,80 1020,10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 7"
            className="text-brand-accent/30"
          />
        </svg>

        {badges.map(({ Icon, left, top, size, icon, rotate, color }, i) => (
          <div
            key={i}
            className={`absolute -translate-x-1/2 -translate-y-1/2 ${rotate}`}
            style={{ left, top }}
          >
            <div
              className={`flex items-center justify-center rounded-full border ${size} ${
                color === "primary" ? "border-brand-primary/30" : "border-brand-accent/30"
              }`}
            >
              <Icon
                className={`${icon} ${
                  color === "primary" ? "text-brand-primary/60" : "text-brand-accent/60"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{heading}</h2>
            <p className="mt-5 text-brand-background/70">{intro}</p>
            <p className="mt-10 text-lg font-semibold text-brand-accent">{body[pain]}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
