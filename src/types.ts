export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  stack: string[];
  features: string[];
  demo: string;
  github: string;
  accent: string;
}

export interface ServiceItem {
  title: string;
  detail: string;
}

export interface JourneyItem {
  title: string;
  period: string;
  detail: string;
}

export interface MilestoneItem {
  title: string;
  organization: string;
  detail: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
}

export interface CredentialItem {
  title: string;
  url: string;
}

export interface PortfolioConfig {
  name: string;
  firstName: string;
  role: string;
  intro: string;
  location: string;
  email: string;
  accent: string;
  portrait: string;
  alternatePortrait: string;
  links: {
    whatsapp: string;
    instagram: string;
    linkedin: string;
    github: string;
    youtube?: string;
  };
  resume: string;
  about: string;
  services: ServiceItem[];
  projects: ProjectItem[];
  skills: string[];
  journey: JourneyItem[];
  milestones: MilestoneItem[];
  education: EducationItem[];
  credentials: CredentialItem[];
}
