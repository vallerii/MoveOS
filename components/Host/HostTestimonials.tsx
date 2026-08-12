import Reveal from "../Reveal";

type Item = { hook: string; quote: string; name: string };
type Props = {
  heading: string;
  items: Item[];
};

/**
 * "Что говорят владельцы" — illustrative placeholder quotes, not verified
 * customer testimonials (the copy draft this was built from flags this
 * explicitly: keep as a design stand-in until real reviews exist, same
 * treatment as HomeCopy.situations.quotes on the homepage). Swap the
 * `items` passed in for real reviews before this page ships.
 */
export default function HostTestimonials({ heading, items }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center font-display text-heading-lg text-ink">{heading}</h2>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.name} delay={i * 70}>
              <div className="card-neutral flex h-full flex-col bg-paper">
                <p className="font-display text-heading-sm text-ink">{item.hook}</p>
                <p className="mt-4 flex-1 text-caption text-slate">{item.quote}</p>
                <p className="mt-6 border-t border-hairline pt-4 text-meta text-ash">{item.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
