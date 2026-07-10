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
  { name: 'Python',     level: 85, color: '#3b82f6', note: 'My core language — used for automation scripts, scrapers, and Telegram bots' },
  { name: 'React',      level: 80, color: '#a855f7', note: 'Modern UI library — building reusable states, hooks, and responsive frontends' },
  { name: 'Django',     level: 70, color: '#22c55e', note: 'Python backend framework — designing secure schemas, ORMs, and REST APIs' },
  { name: 'JavaScript', level: 80, color: '#f59e0b', note: 'Interactive web experiences — client-side rendering and async browser APIs' },
  { name: 'TypeScript', level: 65, color: '#06b6d4', note: 'Type-safe programming — scaling components with interfaces and generics' },
  { name: 'SQL',        level: 70, color: '#ec4899', note: 'Relational databases — writing efficient queries, indices, and database joins' },
  { name: 'Node.js',    level: 65, color: '#10b981', note: 'Server-side javascript runtime — building microservices and REST endpoints' },
  { name: 'Git/GitHub', level: 82, color: '#6366f1', note: 'Version control — managing branches, pull requests, and open-source contributions' },
  { name: 'Telegram API', level: 75, color: '#14b8a6', note: 'Automated chatbots — integration with webhooks, message polling, and commands' }
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
                        const isTop = iVal === 3;
                        const skillIndex = cubeIdx * 3 + (xVal + 1);
                        const skill = isTop ? cubeSkills[skillIndex] : null;
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
