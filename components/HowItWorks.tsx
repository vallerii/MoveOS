import Reveal from "./Reveal";
import {
  PhoneCallIcon,
  MagnifyingGlassIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CheckCircleIcon,
} from "./icons";

type Step = { title: string; body: string };
type Props = {
  heading: string;
  subheading: string;
  steps: Step[];
};

// Icons are mapped by position, same convention as DidYouKnow — a design
// choice, not a translated string. Falls back gracefully if a locale ever
// ships more than 5 steps.
const icons = [PhoneCallIcon, MagnifyingGlassIcon, BanknotesIcon, DocumentTextIcon, CheckCircleIcon];

export default function HowItWorks({ heading, subheading, steps }: Props) {
  return (
    <section className="relative overflow-hidden bg-brand-background py-20 sm:py-28">
      {/* Subtle topographic contour lines — decorative, no repeated tile,
          stretched with preserveAspectRatio="none" so it stays seamless
          across any section width. */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-[#E9E7E3]"
        viewBox="0 0 1400 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M-100,20 C180,60 380,-20 640,40 C900,90 1150,10 1400,60" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-100,120 C200,40 400,220 700,140 C950,80 1150,200 1400,120" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-100,260 C250,340 450,180 750,280 C1000,360 1200,240 1500,300" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-100,420 C220,480 480,360 760,440 C1020,500 1250,380 1500,440" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-100,560 C260,500 500,620 780,540 C1040,480 1260,600 1500,540" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-100,700 C240,660 470,760 760,680 C1020,620 1260,720 1500,660" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-100,820 C200,780 420,860 700,800 C960,760 1200,840 1500,800" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">{heading}</h2>
            <p className="mt-4 text-lg text-brand-ink/70">{subheading}</p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          <ol className="relative space-y-6 border-l-2 border-brand-primary/20 pl-8 sm:pl-10">
            {steps.map(({ title, body }, i) => {
              const Icon = icons[i] ?? CheckCircleIcon;
              return (
                <Reveal key={title} delay={i * 90}>
                  <li className="relative">
                    <span className="absolute -left-[calc(2rem+13px)] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white sm:-left-[calc(2.5rem+13px)]">
                      {i + 1}
                    </span>
                    <div className="card flex items-start gap-4">
                      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-primary" />
                      <div>
                        <p className="text-lg font-bold leading-snug text-brand-ink">{title}</p>
                        <p className="mt-1.5 text-sm text-brand-ink/70">{body}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
