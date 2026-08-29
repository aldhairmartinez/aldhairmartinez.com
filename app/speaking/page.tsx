import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusDot } from "@/components/ui/StatusDot";

export const metadata: Metadata = {
  title: "Speaking",
  description: "Webinars, workshops, and talks — public material added as it becomes available.",
};

const categories = [
  "Webinars",
  "Technical workshops",
  "Conference appearances",
  "Customer workshops",
  "Public talks",
];

export default function SpeakingPage() {
  return (
    <Container>
      <PageHeader
        label="Speaking"
        title="Speaking"
        description="I've led internal and customer-facing workshops and webinars for technical audiences up to 150–200+ attendees. This page will list public material as it becomes available."
      />

      <div className="flex flex-col gap-6 py-16">
        <div className="flex items-center gap-3">
          <StatusDot status="neutral" label="no public material yet" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded-md border border-border px-5 py-4 text-sm text-text-muted"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
