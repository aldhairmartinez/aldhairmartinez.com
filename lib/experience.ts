// Central source of truth for the career timeline — drives /experience and
// /resume. The Grafana Labs `bullets` and all `earlierRoles` content are
// transcribed verbatim from the finalized downloadable resume
// (aldhairmartinez_resume.pdf/.docx) — do not edit these without updating
// the resume file too, and do not add anything here that isn't traceable to
// either the resume or previously-published site content (About/Experience).
//
// `webDetail` is the one deliberate exception: additional, already-verified
// context that appears elsewhere on this site (About page) but isn't on the
// one-page resume. It's kept separate and clearly additive, never merged
// into `bullets`, so the resume-baseline content stays easy to audit against
// the actual PDF/DOCX.

export interface Role {
  company: string;
  title: string;
  location?: string;
  dateRange?: string;
  current?: boolean;
  bullets: string[];
  webDetail?: string[];
}

export const professionalSummary =
  "Solutions Engineer with 5+ years of experience across technical sales, customer-facing engineering, and observability. Specializes in designing cloud-native observability architectures, leading complex technical evaluations, and translating customer requirements into measurable technical and business outcomes. Hands-on across Grafana Cloud, OTel, OSS LGTM, Grafana Alloy, K8s, and AWS. Track record of $4.34M+ in closed-won NACV, including $3.14M+ in new-logo NACV.";

export const grafanaRoles: Role[] = [
  {
    company: "Grafana Labs",
    title: "Solutions Engineer",
    location: "New York, NY",
    dateRange: "Nov 2025 — Present",
    current: true,
    bullets: [
      "$4.34M+ in closed-won NACV, including $3.14M+ in new-logo NACV, during my Grafana SE tenure.",
      "Ranked #1 SE in AMER and #2 globally for new-logo NACV in FY26, contributing $2.09M in new-logo NACV across 17 closed opportunities.",
      "Partner with 3-4 Account Executives to lead the technical side of sales cycles from discovery and architecture through custom demos, sizing, technical validation, POVs, and implementation planning.",
      "Lead complex competitive POVs and displacement motions against Datadog, Dynatrace, Splunk, New Relic, Elastic, LogicMonitor, CloudWatch, and other observability platforms.",
      "Design and validate architectures spanning metrics, logs, traces, APM, OTel, OSS LGTM, Grafana Alloy, K8s/EKS, AWS, Azure, serverless, VMs, databases, Docker, and Terraform.",
      "Help customers reduce telemetry cost and operational noise through sizing, architecture tradeoffs, sampling, optimization, and migration planning.",
      "Led a complex migration for a major cloud computing provider to Grafana Enterprise, reducing alert noise 45%, improving incident response time 30%, and saving approximately $350K annually.",
      "Enable SEs through practical workshops and guidance on AI-assisted engineering and observability use cases; partner with Product and Engineering when customer needs expose product gaps.",
    ],
  },
  {
    company: "Grafana Labs",
    title: "Associate Solutions Engineer",
    location: "New York, NY",
    dateRange: "Jun 2023 — Nov 2025",
    bullets: [
      "Promoted from User Success into Solutions Engineering, becoming the first SDR in Grafana Labs history to make the transition into an SE role.",
      "Supported customers through technical discovery, solution design, demonstrations, workshops, and technical evaluations across Grafana's observability platform.",
      "Built hands-on expertise across Grafana Cloud, OSS LGTM, OTel, K8s, AWS, and cloud-native observability architectures.",
      "Partnered with Account Executives on customer engagements, competitive evaluations, and POV initiatives.",
    ],
    webDetail: [
      "Helped revamp and lead Grafana's Path to SE program.",
      "Co-created the SE POV Simulator, now part of formal SE onboarding.",
      "Identified a cloud-provider observability sizing gap and partnered with Engineering to build a Cloud Provider O11y Calculator used globally by SEs.",
      "Led workshops, webinars, and field events for technical audiences up to 150–200+ attendees.",
      "Earned internal recognition for Grit, Teamwork, and Reliability.",
      "Interviewed 10+ SE candidates and helped onboard and mentor SEs.",
    ],
  },
  {
    company: "Grafana Labs",
    title: "User Success",
    location: "New York, NY",
    dateRange: "Jul 2021 — Jun 2023",
    bullets: [
      "Generated and qualified enterprise pipeline by identifying observability challenges and aligning Grafana solutions to customer business objectives.",
      "Built foundational observability and sales expertise that led directly to promotion into the SE organization.",
    ],
  },
];

export interface EarlierRole {
  company: string;
  title: string;
  location?: string;
  dateRange?: string;
  bullet?: string;
}

export const earlierRoles: EarlierRole[] = [
  {
    company: "Deep Instinct",
    title: "Business Development Representative",
    location: "New York, NY",
    dateRange: "Feb 2021 — Jul 2021",
    bullet:
      "Generated enterprise security pipeline through targeted outbound prospecting, qualification, and account research; delivered tailored product overviews and managed inbound/outbound engagement.",
  },
  {
    company: "Ace Hardware Corporation",
    title: "Vendor Relations Specialist",
    location: "Fort Myers, FL",
    dateRange: "Jun 2020 — Feb 2021",
    bullet:
      "Managed vendor invoices, credit memos, escalations, reconciliations, and account issues across warehouse, vendor, and Accounts Payable teams using SAP.",
  },
  {
    company: "Binary Defense",
    title: "Sales Development Representative",
    location: "Fort Myers, FL",
    dateRange: "Jan 2019 — May 2020",
    bullet:
      "Developed and qualified enterprise security prospects, scheduled meetings with decision-makers, and managed inbound prospects through web chat.",
  },
];

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Solutions Engineering",
    skills: [
      "POVs",
      "Demos",
      "Workshops",
      "Stakeholder Management",
      "Competitive Migrations",
    ],
  },
  {
    label: "Observability",
    skills: [
      "Grafana Cloud",
      "OTel",
      "OSS LGTM",
      "Grafana Alloy",
      "Frontend Observability",
      "APM",
    ],
  },
  {
    label: "Development & AI",
    skills: [
      "TypeScript",
      "Python",
      "REST APIs",
      "Git/GitHub",
      "AI-assisted development",
      "Developer tooling",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    skills: [
      "AWS",
      "Azure",
      "K8s/EKS",
      "Terraform",
      "CI/CD",
      "serverless",
      "VMs",
      "Linux",
    ],
  },
];

export interface EducationEntry {
  institution: string;
  location: string;
  degree: string;
  dateRange: string;
  note?: string;
}

export const education: EducationEntry[] = [
  {
    institution: "Florida Gulf Coast University",
    location: "Fort Myers, FL",
    degree: "Bachelor of Science, Economics",
    dateRange: "Aug 2017 — Dec 2020",
  },
  {
    institution: "Florida Southwestern State College",
    location: "Fort Myers, FL",
    degree: "Associate of Arts",
    dateRange: "Aug 2015 — Jul 2017",
    note: "Dean's List — Fall 2015, Spring 2016 · Student Economic Union",
  },
];
