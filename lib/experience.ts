// Central source of truth for the career timeline — drives both /experience
// and /resume, and is meant to stay in sync with the formal PDF resume once
// one exists. Dates are only ever added once known; never invented.

export interface Role {
  company: string;
  title: string;
  dateRange?: string;
  current?: boolean;
  bullets: string[];
}

export const grafanaRoles: Role[] = [
  {
    company: "Grafana Labs",
    title: "Solutions Engineer",
    dateRange: "Nov 2025 — Present",
    current: true,
    bullets: [
      "Lead the technical side of Commercial sales cycles across 3–4 Account Executives.",
      "$4.34M+ closed-won NACV during Grafana Solutions Engineering tenure, including $3.14M+ new-logo NACV.",
      "Finished FY26 #1 in AMER and #2 globally across all Solutions Engineers for new-logo wins, closing 17 new logos.",
      "Lead competitive POVs and displacement motions against platforms including Datadog, Dynatrace, Splunk, New Relic, Elastic, LogicMonitor, and AWS-native observability.",
      "Work hands-on across Kubernetes/EKS, AWS, Azure, OpenTelemetry, Prometheus, Grafana, Docker, Terraform, serverless, VMs, and databases.",
      "Have worked with environments reaching hundreds of millions of active series and petabytes of monthly telemetry.",
      "Build customer-specific demos and POV environments that mirror real architectures and workflows.",
      "Work cross-functionally with Sales, Product, Engineering, Professional Services, and Customer Success.",
      "Mentor SEs, support hiring and onboarding, and deliver technical enablement.",
    ],
  },
  {
    company: "Grafana Labs",
    title: "Associate Solutions Engineer",
    dateRange: "Jun 2023 — Nov 2025",
    bullets: [
      "First person in Grafana Labs history to make the SDR → Solutions Engineer transition.",
      "Co-created the SE POV Simulator, now part of formal SE onboarding.",
      "Identified a cloud-provider observability sizing gap and partnered with Engineering to build a Cloud Provider O11y Calculator used globally by SEs.",
      "Led workshops, webinars, and field events for technical audiences up to 150–200+ attendees.",
      "Earned internal recognition for Grit, Teamwork, and Reliability.",
      "Interviewed 10+ SE candidates and helped onboard and mentor SEs.",
    ],
  },
  {
    company: "Grafana Labs",
    title: "User Success / SDR",
    dateRange: "Jul 2021 — May 2023",
    bullets: [
      "Started in User Success and Sales Development, building the technical curiosity and customer-facing foundation that led to the transition into Solutions Engineering.",
    ],
  },
];

export interface EarlierRole {
  company: string;
  title: string;
  dateRange?: string;
}

// Dates intentionally left blank — not yet confirmed against source records.
export const earlierRoles: EarlierRole[] = [
  { company: "Deep Instinct", title: "Business Development" },
  { company: "Ace Hardware", title: "Vendor Relations / SAP" },
  { company: "Binary Defense", title: "Business Development (Cybersecurity)" },
];
