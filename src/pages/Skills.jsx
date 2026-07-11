import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Skills.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45 } }),
};

const skillGroups = [
  {
    label: 'Languages',
    emoji: '🗣️',
    color: '#3b82f6',
    skills: [
      { name: 'Python',     level: 85, note: 'My first love — scripts, bots, automation' },
      { name: 'JavaScript', level: 80, note: 'React, Node.js, browser APIs' },
      { name: 'TypeScript', level: 65, note: 'Learning fast — used in Vitta Nipun' },
      { name: 'SQL',        level: 70, note: 'MySQL — joins, queries, schemas' },
      { name: 'HTML/CSS',   level: 90, note: 'The foundation — semantic & responsive' },
    ],
  },
  {
    label: 'Frontend',
    emoji: '🎨',
    color: '#a855f7',
    skills: [
      { name: 'React',       level: 80, note: 'Hooks, context, routing, SPA' },
      { name: 'Vite',        level: 75, note: 'Fast builds, HMR, modern tooling' },
      { name: 'CSS/Flexbox', level: 88, note: 'Animations, grid, responsive design' },
      { name: 'Framer Motion', level: 60, note: 'Used in this portfolio!' },
    ],
  },
  {
    label: 'Backend',
    emoji: '⚙️',
    color: '#22c55e',
    skills: [
      { name: 'Django',    level: 70, note: 'ORM, auth, REST APIs' },
      { name: 'Node.js',   level: 65, note: 'Express, basic REST services' },
      { name: 'MySQL',     level: 70, note: 'Relational DB design' },
      { name: 'REST APIs', level: 78, note: 'Design, consume, test' },
    ],
  },
  {
    label: 'Tools & Platforms',
    emoji: '🛠️',
    color: '#f59e0b',
    skills: [
      { name: 'Git & GitHub', level: 82, note: 'Version control, open-source' },
      { name: 'Vercel',       level: 80, note: 'All live projects deployed here' },
      { name: 'VS Code',      level: 90, note: 'My daily driver' },
      { name: 'Telegram API', level: 75, note: 'Built multiple bots' },
      { name: 'Linux',        level: 65, note: 'Command line comfort' },
    ],
  },
];

const currently = [
  'Deep-diving into TypeScript generics',
  'Exploring Next.js 15 app router',
  'Building REST APIs with Django REST Framework',
  'Learning Docker for containerization',
  'Reading: Clean Code by Robert C. Martin',
];

const cubeSkills = [
  // ── Top layer (iVal = 3) ─────────────────────────────────────────────────
  { name: 'Python',       level: 85, color: '#3b82f6', note: 'My core language — used for automation scripts, scrapers, and Telegram bots' },
  { name: 'React',        level: 80, color: '#a855f7', note: 'Modern UI library — building reusable states, hooks, and responsive frontends' },
  { name: 'Django',       level: 70, color: '#22c55e', note: 'Python backend framework — designing secure schemas, ORMs, and REST APIs' },
  { name: 'JavaScript',   level: 80, color: '#f59e0b', note: 'Interactive web experiences — client-side rendering and async browser APIs' },
  { name: 'TypeScript',   level: 65, color: '#06b6d4', note: 'Type-safe programming — scaling components with interfaces and generics' },
  { name: 'SQL',          level: 70, color: '#ec4899', note: 'Relational databases — writing efficient queries, indices, and database joins' },
  { name: 'Node.js',      level: 65, color: '#10b981', note: 'Server-side javascript runtime — building microservices and REST endpoints' },
  { name: 'Git/GitHub',   level: 82, color: '#6366f1', note: 'Version control — managing branches, pull requests, and open-source contributions' },
  { name: 'Telegram API', level: 75, color: '#14b8a6', note: 'Automated chatbots — integration with webhooks, message polling, and commands' },
  // ── Middle layer (iVal = 2) — previously empty black cubes ───────────────
  { name: 'Docker',       level: 40, color: '#2496ed', note: 'Containerization — learning to package apps into portable Docker containers' },
  { name: 'Next.js',      level: 50, color: '#e2e8f0', note: 'Full-stack React — exploring the App Router, SSR, and edge functions' },
  { name: 'Vercel',       level: 80, color: '#8b8b8b', note: 'Deployment platform — all my live projects are shipped and hosted here' },
  { name: 'CSS/Flexbox',  level: 88, color: '#a78bfa', note: 'Layouts & animations — grid, flexbox, custom properties, and keyframes' },
  { name: 'Framer Motion',level: 60, color: '#e0176c', note: 'UI animation library — powering all the transitions in this portfolio' },
  { name: 'Linux',        level: 65, color: '#fcc624', note: 'Command-line comfort — shell scripts, file management, and SSH workflows' },
  { name: 'MySQL',        level: 70, color: '#00758f', note: 'Open-source RDBMS — designing schemas, relations, and optimised queries' },
  { name: 'REST APIs',    level: 78, color: '#ff6b35', note: 'API design & consumption — building, testing, and integrating REST services' },
  { name: 'Vite',         level: 75, color: '#bd34fe', note: 'Lightning-fast build tool — HMR, ESM bundling, and modern dev tooling' },
];

function getSkillIcon(name) {
  switch (name) {
    case 'Python':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M14.25.18c-.9 0-1.66.72-1.66 1.62v2.7h-3.3c-1.34 0-2.5 1.16-2.5 2.5v2.23H3.56c-.9 0-1.62.76-1.62 1.66v6.58c0 .8.8 1.6 1.6 1.6h2.17v-3.18c0-1.34 1.16-2.5 2.5-2.5h3.23V9.26c0-1.34 1.16-2.5 2.5-2.5h3.33c.9 0 1.62-.76 1.62-1.66V1.8c0-.8-.8-1.62-1.6-1.62H14.25zm-4.5 23.64c.9 0 1.66-.72 1.66-1.62v-2.7h3.3c1.34 0 2.5-1.16 2.5-2.5v-2.23h3.23c.9 0 1.62-.76 1.62-1.66V6.53c0-.8-.8-1.6-1.6-1.6h-2.17v3.18c0 1.34-1.16 2.5-2.5 2.5H12.6v3.23c0 1.34-1.16 2.5-2.5 2.5H6.77c-.9 0-1.62.76-1.62 1.66v3.33c0 .8.8 1.62 1.6 1.62h6.58zM9.75 3.4a.68.68 0 1 1 0 1.36.68.68 0 0 1 0-1.36zm4.5 15.84a.68.68 0 1 1 0 1.36.68.68 0 0 1 0-1.36z"/>
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="skills-cube-icon">
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="10" ry="3.5" />
          <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(120 12 12)" />
        </svg>
      );
    case 'Django':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M11.19 2.12v9.64h-3.4c-1.83 0-3.39.73-3.39 2.92v2.79c0 2.19 1.48 2.92 3.39 2.92h3.4v1.5h1.61V2.12h-1.61zm-1.61 16.66H7.95c-1.02 0-1.78-.32-1.78-1.42v-2.79c0-1.1.76-1.42 1.78-1.42h1.63v5.63z" />
        </svg>
      );
    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path fillRule="evenodd" clipRule="evenodd" d="M3 3h18v18H3V3zm10.7 13.6c0 1.2-.8 2-2 2-1 0-1.7-.5-2.1-1.2l1.2-.7c.3.5.5.7.9.7.4 0 .6-.2.6-.5V11h1.4v5.6zm4.2 0c0 1.2-.8 2-2 2-1.1 0-1.8-.6-2.2-1.3l1.2-.7c.2.4.5.7.9.7.3 0 .5-.2.5-.5 0-.3-.2-.5-.8-.7l-.5-.2c-1.1-.4-1.6-.9-1.6-1.8 0-1 .8-1.8 1.9-1.8.9 0 1.6.4 2 1.1l-1.2.7c-.2-.4-.5-.5-.7-.5-.3 0-.5.2-.5.4 0 .3.2.4.8.7l.5.2c1.2.4 1.7 1 1.7 1.8z" />
        </svg>
      );
    case 'TypeScript':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path fillRule="evenodd" clipRule="evenodd" d="M3 3h18v18H3V3zm8.2 8H7v1.4h1.4v5.2h1.4v-5.2H11.2V11zm6.1 4.6c0-.8-.5-1.3-1.6-1.5l-.5-.2c-.6-.2-.8-.4-.8-.7 0-.3.2-.5.6-.5.4 0 .7.2.9.6l1.2-.7c-.4-.7-1.1-1.1-2.1-1.1-1.1 0-1.9.8-1.9 1.8 0 .8.5 1.3 1.6 1.5l.5.2c.6.2.8.4.8.7 0 .3-.2.5-.6.5-.4 0-.8-.2-1-.7l-1.2.7c.4.8 1.2 1.2 2.2 1.2 1.2 0 2-1 2-2z" />
        </svg>
      );
    case 'SQL':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="skills-cube-icon">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case 'Node.js':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M12 1L3 6v12l9 5 9-5V6L12 1zm7.5 16.15l-7.5 4.15-7.5-4.15V7.85l7.5-4.15 7.5 4.15v9.3z" />
        </svg>
      );
    case 'Git/GitHub':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skills-cube-icon">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 15V9a4 4 0 0 0-4-4H9" />
          <line x1="6" y1="9" x2="6" y2="15" />
        </svg>
      );
    case 'Telegram API':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.2-.02-.08.02-1.3 1.02-3.66 2.61-.34.24-.65.35-.93.34-.31 0-.91-.17-1.36-.32-.55-.18-.99-.28-.95-.58.02-.16.24-.32.66-.49 2.58-1.12 4.31-1.86 5.17-2.21 2.47-.99 2.98-1.16 3.31-1.17.07 0 .23.02.34.1.09.07.12.17.13.27 0 .06-.01.2-.02.27z"/>
        </svg>
      );
    case 'Docker':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M13.5 9H15V7.5h-1.5V9zm-3 0H12V7.5h-1.5V9zm-3 0H9V7.5H7.5V9zM12 6h1.5V4.5H12V6zm-3 0H10.5V4.5H9V6zm9.9 3.45c-.37-.26-.97-.37-1.45-.31-.06-.51-.3-1-.72-1.37l-.24-.22-.25.21c-.3.26-.58.7-.67 1.12-.08.4 0 .8.19 1.13-.28.14-.57.2-.88.2H2.1l-.05.3c-.1.62-.1 2.54 1.14 3.88.94 1.02 2.38 1.54 4.26 1.54 4.04 0 7.03-1.83 8.44-5.16.55.01 1.75.02 2.37-1.12l.12-.21-.39-.22zM4.5 10.5H6V12H4.5v-1.5zm3 0H9V12H7.5v-1.5zm3 0H12V12h-1.5v-1.5zm3 0H15V12h-1.5v-1.5z"/>
        </svg>
      );
    case 'Next.js':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0z"/>
        </svg>
      );
    case 'Vercel':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M24 22.525H0l12-21.05 12 21.05z"/>
        </svg>
      );
    case 'CSS/Flexbox':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M1.5 0l1.77 19.9L12 22.5l8.73-2.6L22.5 0zm18.4 5H5.2l.3 3.4h11.6l-.7 7.1-4.4 1.2-4.4-1.2-.3-3.3H10l.1 1.8 1.9.5 1.9-.5.2-2.3H6.7l-.6-7z"/>
        </svg>
      );
    case 'Framer Motion':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
        </svg>
      );
    case 'Linux':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M20.581 19.049c-.55-.446-.336-1.589-.159-2.411.108-.501.22-1.01.22-1.496 0-1.119-.568-2.087-1.952-2.733C18.604 10.855 18 9.524 18 8c0-3.313-2.686-6-6-6S6 4.687 6 8c0 1.524-.604 2.855-.69 4.409-1.384.646-1.952 1.614-1.952 2.733 0 .486.112.995.22 1.496.177.822.391 1.965-.159 2.411C2.97 19.7 2 20.5 2 22h20c0-1.5-.97-2.3-1.419-2.951z"/>
        </svg>
      );
    case 'MySQL':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.19.246.274l.066.06v-.014c.055-.02.115-.045.14-.1a.33.33 0 0 0-.192-.266zM5.001 1C2.239 1 0 3.24 0 6.001v11.998C0 20.761 2.239 23 5.001 23h13.998C21.761 23 24 20.761 24 18.001V6.001A5.001 5.001 0 0 0 18.999 1H5.001zm11.698 14.293c-1.208 0-2.047-.66-2.047-1.596 0-.963.861-1.606 2.047-1.606.558 0 1.052.131 1.453.359v-.86c0-.617-.417-.969-1.146-.969-.52 0-.981.149-1.33.38l-.358-.771c.459-.282 1.071-.462 1.726-.462 1.214 0 1.99.56 1.99 1.621v3.035c-.416.56-1.067.869-1.735.869zm-.069-2.595c-.538 0-.887.283-.887.7 0 .412.349.7.887.7.419 0 .779-.162 1.029-.434v-.534c-.257-.271-.617-.432-1.029-.432zm-3.956 2.486l-1.965-6.19H9.34l1.93 6.19h1.404zm-5.85-6.19L8.73 14.95h1.329l1.884-5.956H10.61zm1.883-.618L10.19 3.03H8.787L8.186 6.376h2.521z"/>
        </svg>
      );
    case 'REST APIs':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="skills-cube-icon">
          <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/>
          <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>
        </svg>
      );
    case 'Vite':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="skills-cube-icon">
          <path d="M13.397.396L.823 12.185l11.14 1.736-8.608 9.683 19.652-12.26-11.378-1.818L13.397.396z"/>
        </svg>
      );
    default:
      return null;
  }
}

import useSEO from '../hooks/useSEO';

export default function Skills() {
  useSEO({
    title: 'Skills & Technologies',
    description: 'Explore the tech stack of Ashwani Vishwakarma, including React, Node, Python, Django, MongoDB, SQL, and Git. Check interactive skill proficiencies.'
  });

  const [hoveredSkill, setHoveredSkill] = useState(null);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="container skills-page">

        {/* 3D Hero Layout */}
        <div className="skills-hero-layout">
          <motion.div className="skills-hero-left" variants={fadeUp} initial="hidden" animate="show">
            <div className="skills-header" style={{ marginBottom: 0 }}>
              <p className="section-label">Skills</p>
              <h1 className="section-title">What I work with</h1>
              <p className="muted" style={{ marginTop: '12px', maxWidth: '500px' }}>
                A snapshot of my current tech stack. Hover the interactive 3D grid on the right to inspect my core technologies and levels of comfort.
              </p>
            </div>

            {/* Glowing Skill Details Card */}
            <div className="skills-cube-info">
              <AnimatePresence mode="wait">
                {hoveredSkill ? (
                  <motion.div 
                    key={hoveredSkill.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="skills-cube-card"
                    style={{ borderColor: `${hoveredSkill.color}40` }}
                  >
                    <span className="skills-cube-card__dot" style={{ backgroundColor: hoveredSkill.color, boxShadow: `0 0 12px ${hoveredSkill.color}` }} />
                    <div className="skills-cube-card__content">
                      <h4>{hoveredSkill.name}</h4>
                      <p className="skills-cube-card__pct" style={{ color: hoveredSkill.color }}>{hoveredSkill.level}% proficiency</p>
                      <p className="skills-cube-card__note">{hoveredSkill.note}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="skills-cube-placeholder"
                  >
                    <span className="glow-dot" style={{ background: 'var(--blue)', boxShadow: '0 0 8px var(--blue)' }} />
                    <p className="muted" style={{ fontSize: '0.82rem' }}>Hover the blocks on the 3D grid to inspect skills</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Interactive 3D Cube Grid */}
          <motion.div 
            className="skills-cube-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="skills-cube-grid">
              {[0, 1, 2].map((cubeIdx) => (
                <div key={cubeIdx} className="skills-cube" style={{ zIndex: cubeIdx === 1 ? 1 : cubeIdx === 0 ? 2 : 3 }}>
                  {[-1, 0, 1].map((xVal) => (
                    <div key={xVal} style={{ '--x': xVal, '--y': 0 }}>
                      {[3, 2, 1].map((iVal) => {
                        const skillIndex = (3 - iVal) * 9 + cubeIdx * 3 + (xVal + 1);
                        const skill = cubeSkills[skillIndex] || null;
                        const hoverColor = skill ? skill.color : 'var(--blue)';

                        return (
                          <span 
                            key={iVal} 
                            style={{ 
                              '--i': iVal,
                              '--hover-color': hoverColor
                            }}
                            onMouseEnter={() => {
                              if (skill) setHoveredSkill(skill);
                            }}
                            onMouseLeave={() => {
                              if (skill) setHoveredSkill(null);
                            }}
                          >
                            <div className="face face--top">
                              {skill && getSkillIcon(skill.name)}
                            </div>
                            <div className="face face--left">
                              {skill && getSkillIcon(skill.name)}
                            </div>
                            <div className="face face--right">
                              {skill && getSkillIcon(skill.name)}
                            </div>
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, gi) => (
            <motion.div key={group.label} className="skill-group card"
              custom={gi * 0.2} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="skill-group__header">
                <span className="skill-group__emoji">{group.emoji}</span>
                <h3 className="skill-group__label">{group.label}</h3>
              </div>
              <div className="skill-group__list">
                {group.skills.map((s, si) => (
                  <div key={s.name} className="skill-item">
                    <div className="skill-item__top">
                      <span className="skill-item__name">{s.name}</span>
                      <span className="skill-item__pct" style={{ color: group.color }}>{s.level}%</span>
                    </div>
                    <div className="skill-item__bar">
                      <motion.div
                        className="skill-item__fill"
                        style={{ background: `linear-gradient(90deg, ${group.color}99, ${group.color})` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        transition={{ delay: si * 0.1 + gi * 0.05, duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <p className="skill-item__note">{s.note}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <hr className="sep" />

        {/* Currently learning */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="section-label">Currently Learning</p>
          <h2 className="section-title" style={{ marginBottom: '32px' }}>What's next on my radar</h2>
          <div className="skills-learning">
            {currently.map((item, i) => (
              <motion.div key={i} className="skills-learning__item card"
                custom={i * 0.1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                whileHover={{ y: -3, borderColor: 'var(--blue)' }}>
                <span className="blue mono" style={{ fontSize: '0.75rem' }}>0{i + 1}</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
