import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MoveOS",
};

export default function PrivacyPage() {
  return (
    <main className="container-page py-24">
      <h1 className="text-3xl font-bold text-brand-ink">Privacy Policy</h1>
      <p className="mt-6 max-w-2xl text-brand-ink/70">
        This is a placeholder privacy policy for the MoveOS MVP landing page. Replace it with a
        policy reviewed by a qualified professional before sending paid traffic here. At a
        minimum it should cover:
      </p>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-brand-ink/70">
        <li>What data is collected (phone number) and why (to contact you about your free Move-Out Review).</li>
        <li>How long the data is retained.</li>
        <li>Which third parties it is shared with (e.g. your CRM, webhook, or scheduling provider).</li>
        <li>How users can request access to or deletion of their data, per the GDPR.</li>
        <li>Contact details for privacy-related requests.</li>
      </ul>
    </main>
  );
}
