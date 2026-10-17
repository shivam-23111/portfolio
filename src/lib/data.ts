import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Boxes,
  CircuitBoard,
  Code2,
  Container,
  Database,
  GraduationCap,
  HeartPulse,
  LineChart,
  Mail,
  Microscope,
  Network,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  Users,
} from "lucide-react";

export const profile = {
  name: "Shivam Tiwari",
  role: "AI Post-Training Associate and IoT-focused CSE Engineer",
  shortRole: "LLM post-training, full-stack systems, and IoT automation.",
  email: "shivamkti02@gmail.com",
  phone: "+91-7982440985",
  location: "Greater Noida, India",
  resume: "/Shivam_Tiwari_Resume.pdf",
  github: "https://github.com/shivam-23111",
  linkedin: "https://www.linkedin.com/in/shivam-tiwari-807869250",
  leetcode: "https://leetcode.com/shivam_tiwari23/",
};

export const narrative = {
  kicker: "From messy signals to reliable systems",
  headline: "I tune AI behavior, ship useful software, and make hardware respond to the real world.",
  body:
    "Shivam works where intelligence becomes practical: curated datasets, evaluated model responses, deployed dashboards, embedded automation, and teams that can actually build under pressure.",
  quote:
    "The through-line is simple: make complex systems easier to trust, operate, and improve.",
};

export const stats = [
  { value: 8.3, suffix: "", label: "B.Tech CGPA", detail: "CSE with IoT specialization" },
  { value: 50, suffix: "+", label: "Students trained", detail: "Hands-on IoT workshop" },
  { value: 2, suffix: "", label: "LLM roles", detail: "Intern to full-time associate" },
  { value: 3, suffix: "", label: "Applied builds", detail: "Healthcare, waste sorting, classroom IoT" },
];

export type SkillGroup = {
  label: string;
  icon: LucideIcon;
  accent: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "LLM and AI",
    icon: BrainCircuit,
    accent: "cyan",
    skills: ["LLM Post-Training", "Data Curation", "LLM Evaluation", "Prompt Engineering", "AIML"],
  },
  {
    label: "Languages",
    icon: Code2,
    accent: "amber",
    skills: ["C++", "Python", "Java", "JavaScript", "HTML", "CSS"],
  },
  {
    label: "Data Systems",
    icon: Database,
    accent: "rose",
    skills: ["MySQL", "MongoDB", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Excel"],
  },
  {
    label: "Cloud and Tools",
    icon: Container,
    accent: "emerald",
    skills: ["Git", "GitHub", "Docker Multi-Arch", "AWS", "Linux Scripting", "CI/CD"],
  },
  {
    label: "Product Surfaces",
    icon: SquareTerminal,
    accent: "violet",
    skills: ["Next.js", "Prisma", "Tableau", "Power BI", "ThingSpeak", "MIT App Inventor"],
  },
  {
    label: "Embedded IoT",
    icon: CircuitBoard,
    accent: "lime",
    skills: ["Raspberry Pi", "NodeMCU", "PIR Sensor", "OpenCV", "IoT Protocols", "Microcontrollers"],
  },
];

export type Project = {
  slug: string;
  title: string;
  label: string;
  year: string;
  icon: LucideIcon;
  summary: string;
  story: string;
  impact: string[];
  stack: string[];
  github: string;
  liveHref?: string;
  visual: "hms" | "waste" | "classroom";
};

export const projects: Project[] = [
  {
    slug: "hospital-management-system",
    title: "HMS: Hospital Management System",
    label: "Care operations platform",
    year: "2026",
    icon: HeartPulse,
    summary:
      "A secure role-based hospital platform for Admin, Doctor, and Patient workflows, deployed on AWS EC2.",
    story:
      "The project is shaped around the everyday pressure of a hospital desk: fast role-aware access, clean patient handoffs, and an AI assistant that can answer without pulling staff away from critical tasks.",
    impact: [
      "Built a full-stack Next.js and Prisma system with role-based modules.",
      "Integrated a real-time chatbot using the Together AI API.",
      "Configured GitHub Actions for automated build, test, and deployment to AWS EC2.",
    ],
    stack: ["Next.js", "Prisma", "MySQL", "CI/CD", "AWS EC2", "Together AI"],
    github: "https://github.com/shivam-23111/hms",
    liveHref: "/projects/hospital-management-system",
    visual: "hms",
  },
  {
    slug: "autonomous-garbage-sorting-system",
    title: "Autonomous Garbage Sorting System",
    label: "Computer vision on edge hardware",
    year: "2025",
    icon: Microscope,
    summary:
      "A Raspberry Pi waste segregation system that classifies biodegradable and non-biodegradable waste in real time.",
    story:
      "Instead of treating AI as a dashboard-only skill, this build puts a trained model into a physical loop: camera input, prediction, and motor control.",
    impact: [
      "Trained and deployed a MobileNetV2 classifier with TensorFlow.",
      "Used OpenCV for live inference and actuation logic.",
      "Connected the model to Raspberry Pi motor control for autonomous sorting.",
    ],
    stack: ["Python", "TensorFlow", "MobileNetV2", "OpenCV", "Raspberry Pi"],
    github: "https://github.com/shivam-23111",
    liveHref: "/projects/autonomous-garbage-sorting-system",
    visual: "waste",
  },
  {
    slug: "smart-classroom-automation-system",
    title: "Smart Classroom Automation System",
    label: "IoT automation and monitoring",
    year: "2025",
    icon: School,
    summary:
      "An IoT classroom control system with PIR-based automation, manual app control, and ThingSpeak monitoring.",
    story:
      "The system reduces routine classroom energy waste by moving between manual and automatic control, then making device state visible through a monitoring layer.",
    impact: [
      "Built a NodeMCU and PIR-sensor automation workflow.",
      "Created manual and automatic controls through a custom MIT App Inventor app.",
      "Published classroom state to ThingSpeak for real-time monitoring.",
    ],
    stack: ["MIT App Inventor", "Node.js", "NodeMCU", "PIR Sensor", "ThingSpeak"],
    github: "https://github.com/shivam-23111/smart-home",
    liveHref: "/projects/smart-classroom-automation-system",
    visual: "classroom",
  },
];

export const experiences = [
  {
    role: "Associate - LLM Post Training",
    company: "Ethara AI",
    mode: "Full-time",
    date: "July 2026 - Present",
    icon: Sparkles,
    lines: [
      "Worked on multiple LLM post-training projects across technical and non-technical domains.",
      "Improved model quality through data curation, response evaluation, and prompt optimization.",
      "Built and maintained SFT and evaluation datasets.",
      "Built multi-architecture AMD64 and ARM64 Docker images to test AI code changes and validate test results.",
    ],
  },
  {
    role: "LLM Post Training Intern",
    company: "Ethara AI",
    mode: "Internship",
    date: "Jan 2026 - June 2026",
    icon: Network,
    lines: [
      "Assisted in LLM data annotation, evaluation, dataset preparation, and prompt engineering.",
      "Performed quality checks to improve model responses.",
    ],
  },
];

export const education = [
  {
    title: "B.Tech., CSE (IoT)",
    place: "Noida Institute of Engineering and Technology, Greater Noida",
    meta: "CGPA 8.3 - 2026",
    icon: GraduationCap,
  },
  {
    title: "Senior Secondary (CBSE)",
    place: "JN International School, New Delhi",
    meta: "88.6% - 2022",
    icon: School,
  },
  {
    title: "Secondary (CBSE)",
    place: "JN International School, New Delhi",
    meta: "88.6% - 2020",
    icon: School,
  },
];

export const certifications = [
  "Python for Data Science and AI Development - IBM Coursera",
  "Interfacing With Raspberry Pi - Coursera",
  "IoT Devices - Coursera",
  "IoT Raspberry Pi with Projects - Infosys Springboard",
  "ReactJS - Infosys Springboard",
];

export const responsibilities = [
  {
    title: "Team Leader - Internal Hackathons",
    detail: "Led brainstorming, project workflows, and module assignment for efficient execution.",
    icon: Users,
  },
  {
    title: "Head Coordinator - Signodes Club",
    detail: "Managed the club website, added event features, and maintained version control using Git and GitHub.",
    icon: ShieldCheck,
  },
  {
    title: "IoT Workshop Instructor - Signodes Club",
    detail: "Conducted a live hands-on workshop for 50+ students on IoT tools, components, and real-world uses.",
    icon: LineChart,
  },
];

export const contactMethods = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replaceAll("-", "")}`, icon: Phone },
  { label: "GitHub", value: "github.com/shivam-23111", href: profile.github, icon: Boxes },
];
