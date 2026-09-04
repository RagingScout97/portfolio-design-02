import type { MenuItem, PortfolioData } from "@/types/portfolio";

export const MENU_ITEMS: MenuItem[] = [
  { id: "dossier", index: "01", label: "DOSSIER", subtitle: "identity" },
  { id: "loadout", index: "02", label: "LOADOUT", subtitle: "skill tree" },
  { id: "deployments", index: "03", label: "EXPERIENCE", subtitle: "ability tree" },
  { id: "missions", index: "04", label: "MISSIONS", subtitle: "projects" },
  { id: "arcade", index: "05", label: "ARCADE", subtitle: "mini-game" },
  { id: "uplink", index: "06", label: "UPLINK", subtitle: "contact" },
];

export const portfolio: PortfolioData = {
  profile: {
    name: "Prakhar Singh Rajput",
    handle: "RagingScout97",
    role: "Full Stack Developer",
    tagline: "Building systems you can navigate like a game.",
    location: "Bhopal, India",
    about:
      "I design and ship full-stack products with a bias toward interactive interfaces, clean architecture, and tools that feel alive. From Spring Boot APIs and Angular frontends to game-inspired UIs, I treat every build as a playable system — clear objectives, readable feedback, and polish in the details.",
    photoUrl: "https://avatars.githubusercontent.com/u/54759932?v=4",
  },
  education: [
    {
      degree: "B.Tech / Computer Science",
      institute: "Update in src/data/portfolio.ts",
      year: "—",
    },
  ],
  skills: [
    {
      id: "lang-core",
      name: "TypeScript",
      tier: 3,
      category: "Languages",
      detail: "Typed frontend & full-stack application logic.",
    },
    {
      id: "lang-java",
      name: "Java",
      tier: 3,
      category: "Languages",
      detail: "Spring Boot services, APIs, and backend systems.",
      prerequisites: ["lang-core"],
    },
    {
      id: "lang-py",
      name: "Python",
      tier: 2,
      category: "Languages",
      detail: "Scripts, OCR tooling, experiments.",
    },
    {
      id: "lang-kt",
      name: "Kotlin",
      tier: 2,
      category: "Languages",
      detail: "Android / mobile app work.",
    },
    {
      id: "fe-react",
      name: "React / Next.js",
      tier: 3,
      category: "Frontend",
      detail: "App Router, motion systems, interactive UX.",
      prerequisites: ["lang-core"],
    },
    {
      id: "fe-angular",
      name: "Angular",
      tier: 3,
      category: "Frontend",
      detail: "Standalone components, HUD/portfolio shells.",
      prerequisites: ["lang-core"],
    },
    {
      id: "fe-tailwind",
      name: "Tailwind CSS",
      tier: 3,
      category: "Frontend",
      detail: "Design tokens, responsive systems UI.",
      prerequisites: ["fe-react"],
    },
    {
      id: "fe-motion",
      name: "GSAP / Motion",
      tier: 2,
      category: "Frontend",
      detail: "Menu cursors, boot sequences, scroll polish.",
      prerequisites: ["fe-react"],
    },
    {
      id: "be-spring",
      name: "Spring Boot",
      tier: 3,
      category: "Backend",
      detail: "REST APIs, auth, PostgreSQL-backed services.",
      prerequisites: ["lang-java"],
    },
    {
      id: "be-sql",
      name: "PostgreSQL",
      tier: 2,
      category: "Backend",
      detail: "Schema design and query-backed portfolio CMS.",
      prerequisites: ["be-spring"],
    },
    {
      id: "be-nginx",
      name: "Nginx / Linux",
      tier: 2,
      category: "Backend",
      detail: "Reverse proxy and cloud VPS deployments.",
      prerequisites: ["be-spring"],
    },
    {
      id: "game-canvas",
      name: "Canvas / Games",
      tier: 2,
      category: "Creative",
      detail: "2D game loops, arcade prototypes, interactive HUD.",
    },
    {
      id: "ops-vercel",
      name: "Vercel",
      tier: 2,
      category: "Ops",
      detail: "Frontend hosting, domains, CI from GitHub.",
    },
    {
      id: "ops-git",
      name: "Git / GitHub",
      tier: 3,
      category: "Ops",
      detail: "Branch workflows and production deploys.",
    },
  ],
  experiences: [
    {
      role: "Full Stack Developer",
      company: "Personal Systems / Freelance",
      from: "2023",
      to: "Present",
      description: [
        "Designed and shipped interactive portfolio OS with boot sequence, game menu HUD, and dynamic content architecture.",
        "Built Spring Boot + PostgreSQL public/admin APIs and Angular admin dashboard for content management.",
        "Deployed frontend/admin on Vercel and backend on Oracle Cloud with Nginx reverse proxy.",
      ],
    },
    {
      role: "Project Builder",
      company: "Open Source & Side Quests",
      from: "2021",
      to: "Present",
      description: [
        "Shipped tools across web, Python, Java, Kotlin — from OCR converters to survival games and delivery apps.",
        "Iterated on game-inspired UX patterns: menu rails, skill presentation, and arcade micro-interactions.",
      ],
    },
  ],
  projects: [
    {
      id: "portfolio-os",
      name: "Portfolio OS",
      description:
        "Interactive personal site framed as a game menu system — boot sequence, HUD navigation, missions, and skill tree.",
      techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
      liveUrl: "https://ragingscout97.in",
      githubUrl: "https://github.com/RagingScout97/portfolio-design-02",
      status: "active",
    },
    {
      id: "portfolio-stack",
      name: "Portfolio Stack (Angular + API)",
      description:
        "Previous generation: Angular frontend, Spring Boot API, and admin CMS with public portfolio endpoint.",
      techStack: ["Angular", "Spring Boot", "PostgreSQL", "Vercel"],
      liveUrl: "https://ragingscout97.in",
      githubUrl: "https://github.com/RagingScout97/portfolio",
      status: "complete",
    },
    {
      id: "bitesurvive",
      name: "BiteSurvive",
      description:
        "Adaptive pixel snake survival game — arcade loop with escalating challenge.",
      techStack: ["JavaScript", "Canvas"],
      githubUrl:
        "https://github.com/RagingScout97/BITESURVIVE-Adaptive-Pixel-Snake-Survival-Game",
      status: "complete",
    },
    {
      id: "tiffin",
      name: "Tiffin Delivery App",
      description: "Mobile delivery client experience built with Kotlin.",
      techStack: ["Kotlin", "Android"],
      githubUrl: "https://github.com/RagingScout97/tiffin-delivery-app",
      status: "complete",
    },
    {
      id: "md2docx",
      name: "md2docx",
      description: "Markdown to DOCX conversion tooling.",
      techStack: ["Python"],
      githubUrl: "https://github.com/RagingScout97/md2docx",
      status: "complete",
    },
    {
      id: "pdf-ocr",
      name: "PDF OCR Converter",
      description: "OCR pipeline for converting scanned PDFs into usable text.",
      techStack: ["Python"],
      githubUrl: "https://github.com/RagingScout97/pdf-ocr-converter",
      status: "complete",
    },
    {
      id: "banking",
      name: "Console Banking System",
      description:
        "Console banking ops: deposit, withdrawal, transfers, and balance enquiry.",
      techStack: ["C"],
      githubUrl:
        "https://github.com/RagingScout97/Console-Based-Banking-Operations-System",
      status: "complete",
    },
    {
      id: "3dgame",
      name: "3D Game Prototype",
      description: "Experimental 3D game sandbox.",
      techStack: ["JavaScript"],
      githubUrl: "https://github.com/RagingScout97/3dGame",
      status: "prototype",
    },
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/RagingScout97" },
    { name: "Website", url: "https://ragingscout97.in" },
  ],
};
