import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Star, Code2,
  Coins, BookOpen, GraduationCap, CalendarCheck, Tv, QrCode, Cpu, 
  Captions, Clock, Search, Gamepad2, School, BarChart3, Brain, 
  Briefcase, Layers, ClipboardList, Compass
} from 'lucide-react';
import { GitHubIcon } from '../components/BrandIcons';
import { PROJECTS, GITHUB_URL } from '../data/projects';
import './Projects.css';

const iconMap = {
  Coins, BookOpen, GraduationCap, CalendarCheck, Tv, QrCode, Cpu, 
  Captions, Clock, Search, Gamepad2, School, BarChart3, Brain, 
  Briefcase, Layers, ClipboardList, Compass
};

const filters = ['All', 'TypeScript', 'JavaScript', 'Featured'];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45 } }),
};

import useSEO from '../hooks/useSEO';

export default function Projects() {
  useSEO({
    title: 'Projects - Software Portfolio',
    description: 'Explore full-stack apps, AI automation programs, tools, and scripts developed by Ashwani Vishwakarma. Built using React, Python, Node, and Django.'
  });

  const [active, setActive] = useState('All');

  const filtered = PROJECTS.filter(p => {
    if (active === 'All')      return true;
    if (active === 'Featured') return p.featured;
    return p.lang === active;
  });

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] } },
        exit: { opacity: 0, y: -16, transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] } }
      }}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container projects-page">

        <motion.div className="projects-header" variants={fadeUp} initial="hidden" animate="show">
          <p className="section-label">Work</p>
          <h1 className="section-title">All Projects</h1>
          <p className="muted" style={{ marginTop: '12px', maxWidth: '500px' }}>
            Everything I've built and shipped — from finance trackers to file transfer tools.
            All source code is on <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="blue">GitHub</a>.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div className="projects-filters" custom={0.5} variants={fadeUp} initial="hidden" animate="show">
          {filters.map(f => (
            <button
              key={f}
              className={`projects-filter-btn ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f === 'Featured' && <Star size={13} />}
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05 } }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="proj-card"
                whileHover={{ y: -6 }}
                style={{ '--proj-color': p.color }}
              >
                {/* Top bar */}
                <div className="proj-card__top">
                  <div className="proj-card__emoji" style={{ background: `${p.color}14`, border: `1px solid ${p.color}35` }}>
                    {(() => {
                      const IconComponent = iconMap[p.icon] || Code2;
                      return <IconComponent size={22} style={{ color: p.color }} />;
                    })()}
                  </div>
                  <div className="proj-card__top-right">
                    {p.featured && (
                      <span className="proj-card__featured">
                        <Star size={11} fill="currentColor" /> Featured
                      </span>
                    )}
                    {p.live && <span className="proj-card__live"><span className="glow-dot" style={{ width: 7, height: 7 }} /> Live</span>}
                  </div>
                </div>

                <h3 className="proj-card__name">{p.name}</h3>
                <p className="proj-card__desc">{p.description}</p>

                <div className="proj-card__tags">
                  {p.tags.map(t => (
                    <span key={t} className="tag" style={{ borderColor: `${p.color}40`, color: p.color }}>{t}</span>
                  ))}
                </div>

                <div className="proj-card__links">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-card__link">
                    <GitHubIcon size={15} /> Source
                  </a>
                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="proj-card__link proj-card__link--live">
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  ) : (
                    <span className="proj-card__link proj-card__link--disabled">No live demo</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div className="projects-cta" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="muted">More on GitHub →</p>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <GitHubIcon size={16} /> lets-make-ashwani
          </a>
        </motion.div>

      </div>
    </motion.div>
  );
}
