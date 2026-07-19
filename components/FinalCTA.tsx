import LeadForm from "./LeadForm";
import Reveal from "./Reveal";
import BarcelonaSkyline from "./BarcelonaSkyline";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-30 min-h-[85vh]">
      {/* decorative background: gradient blobs + line-art Barcelona skyline */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* <div className="absolute -top-24 left-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-primary/10 blur-3xl" /> */}
        <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl" />
        <BarcelonaSkyline className="absolute inset-x-0 bottom-[-20px] h-40 w-full animate-float text-brand-ink/[0.07] sm:h-56 md:h-72" />
      </div>

      <div className="container-page relative z-10">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-3xl bg-white/50 p-10 text-center shadow-card sm:p-14">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Ready to move out with confidence?
            </h2>
            <p className="mt-4 text-brand-ink/70">
              Book your free 15-minute Move-Out Review — no spam, no sales pitch.
            </p>
            <div className="mt-8 flex justify-center">
              <LeadForm variant="section" id="final-cta-form" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
