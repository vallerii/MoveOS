"use client";

type Props = {
  label: string;
  onClick: () => void;
  selected?: boolean;
};

/**
 * Quiz answer option — an input-radius (16px) tile with a hairline border,
 * flat against the surface. Selection is signalled by the system's one dark
 * fill rather than a tinted background, and there's no lift-on-hover or
 * shadow: only floating artifacts get elevation here.
 */
export default function ChoiceButton({ label, onClick, selected }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full rounded-input px-6 py-4 text-left text-base transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 focus-visible:ring-offset-2 ${
        selected
          ? "bg-ink text-paper"
          : "border border-hairline bg-paper text-ink hover:border-ink/25 hover:bg-fog"
      }`}
    >
      {label}
    </button>
  );
}
