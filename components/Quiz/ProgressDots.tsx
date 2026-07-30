type Props = {
  total: number;
  current: number; // 0-indexed
  label: string;
};

/**
 * Step progress — pill-geometry segments, filled in ink as the wizard
 * advances. The step label sits as a ghost typographic tag rather than an
 * uppercase tracked caption, matching how every other label in the system
 * is set.
 */
export default function ProgressDots({ total, current, label }: Props) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i <= current ? "bg-ink" : "bg-mist"
            }`}
          />
        ))}
      </div>
      <p className="tag mt-4 text-center">{label}</p>
    </div>
  );
}
