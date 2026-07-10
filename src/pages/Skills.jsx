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

export default function Skills() {
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
                          />
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
