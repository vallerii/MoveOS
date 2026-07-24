"use client";

type Props = {
  label: string;
  onClick: () => void;
  selected?: boolean;
};

export default function ChoiceButton({ label, onClick, selected }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full rounded-2xl border px-6 py-4 text-left text-base font-semibold transition duration-150 hover:-translate-y-0.5 hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 ${
        selected
          ? "border-brand-primary bg-brand-primary/10 text-brand-ink"
          : "border-black/10 bg-white text-brand-ink hover:border-brand-primary/40"
      }`}
    >
      {label}
    </button>
  );
}
