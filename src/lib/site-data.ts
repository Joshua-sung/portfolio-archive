import {
  BarChart3,
  Bot,
  ClipboardCheck,
  GitBranch,
  LayoutDashboard,
  MessageSquare,
  Route,
  Workflow,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work-archive", label: "Work Archive" },
  { href: "/companies", label: "Companies" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/systems-built", label: "Systems Built" },
  { href: "/collaboration", label: "Collaboration" },
  { href: "/resume", label: "Resume" },
  { href: "/writing", label: "Writing" },
];

export const capabilityMap = [
  {
    title: "Operational ownership",
    description:
      "Owns ambiguous field and data operations from problem diagnosis through execution, reporting, and iteration.",
    icon: ClipboardCheck,
  },
  {
    title: "Automation literacy",
    description:
      "Can separate human judgment from repeatable data collection work, then collaborate on pragmatic API or scraping workflows.",
    icon: Bot,
  },
  {
    title: "Dashboarding and reporting",
    description:
      "Turns progress, quality, throughput, and risk signals into weekly operating views that support faster decisions.",
    icon: LayoutDashboard,
  },
  {
    title: "Developer collaboration",
    description:
      "Translates field constraints and VOC into reproducible requirements, test cases, and implementation context.",
    icon: GitBranch,
  },
  {
    title: "Process optimization",
    description:
      "Improves handoffs, naming rules, routes, QA standards, and operating cadence to remove bottlenecks.",
    icon: Workflow,
  },
  {
    title: "Data-oriented decisions",
    description:
      "Uses real operating data, customer behavior, benchmarks, and constraints to make practical tradeoffs.",
    icon: BarChart3,
  },
];

export const systemsBuilt = [
  {
    name: "Automation-assisted data intake",
    type: "Automation / API workflow",
    description:
      "Split subjective and objective fields, used scraping and selective API calls, and reduced manual work without letting API cost erase savings.",
  },
  {
    name: "Field collection operating standard",
    type: "Process system",
    description:
      "Created flight order, battery rotation, file naming, and metadata rules so downstream labeling could move without repeated file inspection.",
  },
  {
    name: "VOC-to-product feedback loop",
    type: "PM collaboration loop",
    description:
      "Converted pickup friction into measured spatial constraints, POI changes, test runs, and operating manual updates.",
  },
  {
    name: "Progress and risk reporting cadence",
    type: "Dashboard / reporting",
    description:
      "Tracked production, quality, error patterns, and low-progress contributors so schedule risk surfaced before deadlines.",
  },
];

export const collaborationPractices = [
  {
    title: "Problem packets for engineers",
    description:
      "Frame issues with current behavior, target behavior, constraints, reproduction steps, sample data, and success metrics.",
    icon: MessageSquare,
  },
  {
    title: "Operating evidence before escalation",
    description:
      "Collect logs, measurements, screenshots, route details, and user impact before requesting product or engineering changes.",
    icon: BarChart3,
  },
  {
    title: "Workflow-friendly documentation",
    description:
      "Keep decisions, owners, next actions, and review cycles in tools like Notion, Jira, GitHub, or structured docs.",
    icon: Route,
  },
];

export const resumeHighlights = [
  "Growth PM / Operations PM / Data PM profile focused on measurable execution.",
  "Experience operating cross-functional data, field, robotics, and public-sector proposal work.",
  "Strength in translating operational constraints into systems, workflows, dashboards, and technical requirements.",
  "Comfortable collaborating with developers, operators, freelancers, vendors, stakeholders, and field teams.",
];
