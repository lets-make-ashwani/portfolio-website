'use client';

import { useState } from 'react';
import { 
  ExternalLink, Star, Code2,
  Coins, BookOpen, GraduationCap, CalendarCheck, Tv, QrCode, Cpu, 
  Captions, Clock, Search, Gamepad2, School, BarChart3, Brain, 
  Briefcase, Layers, ClipboardList, Compass
} from 'lucide-react';
import { GitHubIcon } from '@/components/BrandIcons';
import { PROJECTS, GITHUB_URL } from '@/data/projects';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { generateProjectSchema } from '@/lib/seo';

const iconMap: Record<string, any> = {
  Coins, BookOpen, GraduationCap, CalendarCheck, Tv, QrCode, Cpu, 
  Captions, Clock, Search, Gamepad2, School, BarChart3, Brain, 
  Briefcase, Layers, ClipboardList, Compass
};

const filters = ['All', 'TypeScript', 'JavaScript', 'Featured'];

export default function ProjectsPage() {
  const [active, setActive] = useState('All');

  const filtered = PROJECTS.filter(p => {
    if (active === 'All') return true;
    if (active === 'Featured') return p.featured;
    return p.lang === active;
  });

  return (
    <div className="container projects-page page-enter">
      <Breadcrumbs items={[{ name: 'Home', item: '/' }, { name: 'Projects', item: '/projects' }]} />
      {PROJECTS.map(p => (
        <JsonLd key={p.id} schema={generateProjectSchema(p)} />
      ))}

      <header className="projects-header">
        <p className="section-label">Work</p>
        <h1 className="section-title">All Projects</h1>
        <p className="muted" style={{ marginTop: '12px', maxWidth: '500px' }}>
          Everything I've built and shipped — from finance trackers to file transfer tools.
          All source code is on <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="blue">GitHub</a>.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="projects-filters" role="tablist" aria-label="Filter projects by category">
        {filters.map(f => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            className={`projects-filter-btn ${active === f ? 'active' : ''}`}
            onClick={() => setActive(f)}
          >
            {f === 'Featured' && <Star size={13} aria-hidden="true" />}
            {f}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <section className="projects-grid" aria-label="Projects list">
        {filtered.map((p) => {
          const IconComponent = iconMap[p.icon] || Code2;
          return (
            <article
              key={p.id}
              className="proj-card"
              style={{ '--proj-color': p.color } as React.CSSProperties}
            >
              {/* Top bar */}
              <div className="proj-card__top">
                <div
                  className="proj-card__emoji"
                  style={{ background: `${p.color}14`, border: `1px solid ${p.color}35` }}
                >
                  <IconComponent size={22} style={{ color: p.color }} aria-hidden="true" />
                </div>
                <div className="proj-card__top-right">
                  {p.featured && (
                    <span className="proj-card__featured">
                      <Star size={11} fill="currentColor" aria-hidden="true" /> Featured
                    </span>
                  )}
                  {p.live && (
                    <span className="proj-card__live">
                      <span className="glow-dot" style={{ width: 7, height: 7 }} aria-hidden="true" /> Live
                    </span>
                  )}
                </div>
              </div>

              <h2 className="proj-card__name">{p.name}</h2>
              <p className="proj-card__desc">{p.description}</p>

              <div className="proj-card__tags">
                {p.tags.map(t => (
                  <span
                    key={t}
                    className="tag"
                    style={{ borderColor: `${p.color}40`, color: p.color }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="proj-card__links">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-card__link"
                  aria-label={`View ${p.name} source code on GitHub`}
                >
                  <GitHubIcon size={15} /> Source
                </a>
                {p.live ? (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-card__link proj-card__link--live"
                    aria-label={`View live demo for ${p.name}`}
                  >
                    <ExternalLink size={15} aria-hidden="true" /> Live Demo
                  </a>
                ) : (
                  <span className="proj-card__link proj-card__link--disabled">No live demo</span>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* GitHub Call to Action */}
      <footer className="projects-cta">
        <p className="muted">More on GitHub →</p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <GitHubIcon size={16} /> lets-make-ashwani
        </a>
      </footer>
    </div>
  );
}
