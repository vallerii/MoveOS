type Props = {
  total: number;
  current: number; // 0-indexed
  label: string;
};

export default function ProgressDots({ total, current, label }: Props) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= current ? "bg-brand-primary" : "bg-black/10"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-xs font-medium uppercase tracking-wide text-brand-ink/50">{label}</p>
    </div>
  );
}
