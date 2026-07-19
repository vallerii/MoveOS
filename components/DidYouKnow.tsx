import Reveal from "./Reveal";
import { ArrowDownIcon, ChevronDownIcon } from "./icons";

const facts = [
  {
    q: "Your deposit may not even be held by your landlord.",
    a: "For most residential rentals in Catalonia, the mandatory security deposit is normally lodged with INCASÒL rather than remaining in the landlord's personal bank account.",
  },
  {
    q: "Not every clause in a rental contract is enforceable.",
    a: "Some rental agreements include clauses that conflict with mandatory tenant protections under Spanish or Catalan law. Appearing in the contract doesn't automatically make a clause valid.",
  },
  {
    q: "Most deposit disputes can be prevented.",
    a: "The strongest protection isn't a lawyer — it's good preparation before the handover. Proper documentation often makes the difference.",
  },
  {
    q: "You may not always need a lawyer.",
    a: "For certain lower-value civil claims, Spanish law allows people to pursue a case without mandatory legal representation. We'll explain what applies to your situation during the review.",
  },
];

export default function DidYouKnow() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* left: smaller heading column */}
          <Reveal className="lg:col-span-4">
            <div className="text-center lg:sticky lg:top-28 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
                Did You Know?
              </h2>
              <p className="mt-4 text-brand-ink/70">
                A few things most tenants only find out after it&apos;s too late.
              </p>
            </div>
          </Reveal>

          {/* right: larger Q&A column */}
          <Reveal delay={150} className="w-full lg:col-span-8">
            <div className="w-full divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
              {facts.map(({ q, a }) => (
                <details key={q} open className="group w-full p-6">
                  <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-brand-ink marker:content-none">
                    {q}
                    {/* <ChevronDownIcon className="h-4 w-4 shrink-0 text-brand-primary" /> */}
                  </summary>
                  <ArrowDownIcon className="h-4 w-4 mt-3 shrink-0 text-brand-primary" />
                  <p className="mt-3 text-brand-ink/70">{a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
