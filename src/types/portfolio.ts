export type SectionId =
  | "menu"
  | "dossier"
  | "loadout"
  | "deployments"
  | "missions"
  | "arcade"
  | "uplink";

export interface SocialLink {
  name: string;
  url: string;
}

export interface Education {
  degree: string;
  institute: string;
  year: string;
}

export interface SkillNode {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  category: string;
  detail: string;
  prerequisites?: string[];
}

export interface Experience {
  role: string;
  company: string;
  from: string;
  to: string;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: "complete" | "active" | "prototype";
}

export interface Profile {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  location: string;
  about: string;
  photoUrl?: string;
}

export interface PortfolioData {
  profile: Profile;
  education: Education[];
  skills: SkillNode[];
  experiences: Experience[];
  projects: Project[];
  socialLinks: SocialLink[];
}

export interface MenuItem {
  id: SectionId;
  index: string;
  label: string;
  subtitle: string;
}
