import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  name: string;
  repo: string;
  description: string;
  lang: string;
  live: string | null;
  github: string;
  tags: string[];
  icon: string;
  color: string;
  featured: boolean;
}

export interface BlogPost {
  id: number;
  slug: string;
  iconName: string;
  tag: string;
  tagColor: string;
  date: string;
  isoDate: string;
  title: string;
  excerpt: string;
  readTime: string;
  coming: boolean;
  content: string;
  author: {
    name: string;
    role: string;
    url: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SkillCategory {
  title: string;
  color: string;
  skills: {
    name: string;
    level: string;
    icon: string;
  }[];
}
