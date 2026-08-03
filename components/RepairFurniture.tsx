import Reveal from "./Reveal";
import { CheckCircleIcon, WrenchIcon } from "./icons";

type FurnitureItem = { label: string; verdict: "wear" | "damage"; note: string };
type Props = {
  heading: string;
  intro?: string;
  items: FurnitureItem[];
};

// Shown only on /repair, right after RepairShowcase — deliberately a
// separate section rather than a 5th card in that grid, because it only
// applies to furnished apartments (not every renter) and makes a
// different point: wear vs. damage, not "what we fix". Green check =
// natural wear (not billable), amber wrench = damage (fixable/billable).
export default function RepairFurniture({ heading, intro, items }: Props) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-extrabold tracking-tight text-brand-ink text-section">{heading}</h2>
            {intro && <p className="mt-4 text-subheading text-brand-ink/70">{intro}</p>}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => {
            const isDamage = item.verdict === "damage";
            const Icon = isDamage ? WrenchIcon : CheckCircleIcon;
            return (
              <Reveal key={item.label} delay={i * 90}>
                <div className="card flex h-full items-start gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      isDamage ? "bg-brand-accent/15" : "bg-brand-secondary/15"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isDamage ? "text-brand-accent" : "text-brand-secondary"}`} />
                  </span>
                  <div>
                    <p className="font-bold text-brand-ink">{item.label}</p>
                    <p className="mt-1 text-small text-brand-ink/70">{item.note}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
