import Image from "next/image";
import { CheckCircleIcon, ClockIcon, PhoneCallIcon, ShieldCheckIcon } from "./icons";
import LeadForm from "./LeadForm";
import Reveal from "./Reveal";

const points = [
  { icon: CheckCircleIcon, label: "100% free" },
  { icon: ClockIcon, label: "15 minutes" },
  { icon: PhoneCallIcon, label: "By phone" },
  { icon: ShieldCheckIcon, label: "No obligation" },
];

export default function Hero() {
  return (
    <section className="overflow-hidden py-8 sm:pb-10 sm:pt-24 relative min-h-[90vh]" >
      <Image
        src="/city-route.png"
        alt="Isometric city block illustration with a highlighted route from a key chip to a home chip"
        width={2000}
        height={800}
        className="absolute animate-float top-0 right-[-100px] w-[200%] h-[340px] sm:h-[480px] h-auto max-w-none md:min-h-[90vh] object-contain object-right "
      />
      <div className="container-page flex lg:grid items-center justify-center gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
        {/* copy + form: left on desktop, top on mobile */}
        <div className="order-1 text-center lg:text-left ">
          <Reveal>
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
              </span>
              Free Move-Out Review · Barcelona
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-brand-ink sm:text-6xl">
              Don&apos;t Lose Your Deposit  When You Move Out
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 text-lg text-brand-ink/70 sm:text-xl">
              Get a free 15-minute call with a move-out specialist. Know your rights, avoid
              costly mistakes, and maximise your chances of getting your full deposit back.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div id="book" className="mt-10 flex scroll-mt-24 justify-center lg:justify-start">
              <LeadForm variant="hero" />
            </div>
          </Reveal>
        </div>

      </div>

      {/* trust stats: full width, centered, below the two columns */}
      <Reveal delay={400}>
        <div className="container-page mt-14 lg:mt-40">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 rounded-2xl border border-black/5 bg-white/70 px-8 py-6 shadow-card backdrop-blur sm:justify-between">
            {points.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-base font-semibold text-brand-ink sm:text-lg">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                  <Icon className="h-6 w-6 text-brand-primary" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
