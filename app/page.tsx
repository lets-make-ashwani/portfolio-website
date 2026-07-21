import Link from 'next/link';
import { 
  ArrowRight, Code2, ExternalLink,
  Coins, BookOpen, GraduationCap, CalendarCheck, Tv, QrCode, Cpu, 
  Captions, Clock, Search, Gamepad2, School, BarChart3, Brain, 
  Briefcase, Layers, ClipboardList, Compass
} from 'lucide-react';
import { GitHubIcon } from '@/components/BrandIcons';
import { PROJECTS, GITHUB_URL } from '@/data/projects';
import FAQSection from '@/components/FAQSection';
import HeroAvatar from '@/components/HeroAvatar';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Full-Stack Developer & Automation Specialist',
  description: 'Personal portfolio of Ashwani Vishwakarma, software developer and AI automation specialist. I build automations so you don\'t have to.',
  canonical: '/',
});

const iconMap: Record<string, any> = {
  Coins, BookOpen, GraduationCap, CalendarCheck, Tv, QrCode, Cpu, 
  Captions, Clock, Search, Gamepad2, School, BarChart3, Brain, 
  Briefcase, Layers, ClipboardList, Compass
};

const featuredProjects = PROJECTS.filter(p => p.featured);

export default function HomePage() {
  return (
    <div className="page-enter">
      {/* ── Hero Section ── */}
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="container home-hero__inner">
          <div className="home-hero__content">
            <div className="home-hero__badge">
              <span className="glow-dot" aria-hidden="true" />
              <span>Open to work & collabs</span>
            </div>

            <p className="handwritten home-hero__greeting">
              Hey there! I'm Ashwani.
            </p>

            <h1 id="hero-title" className="home-hero__title">
              I build <span className="home-hero__highlight">automation</span><br />
              so you don't have to.
            </h1>

            <p className="home-hero__sub">
              BCA graduate (2026) from <span className="blue" style={{ borderBottom: '1px solid var(--blue)' }}>Kanpur</span>.
              I write Python, build React/Next.js apps, and create Telegram bots that make 
              repetitive tasks disappear — because life's too short for manual work.
            </p>

            <div className="home-hero__cta">
              <Link href="/projects" className="btn btn-primary">
                See my work <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitHubIcon size={16} /> GitHub
              </a>
            </div>
          </div>

          <HeroAvatar />
        </div>

        {/* Glow background blobs */}
        <div className="home-hero__blob home-hero__blob--1" aria-hidden="true" />
        <div className="home-hero__blob home-hero__blob--2" aria-hidden="true" />
      </section>

      {/* ── Key Metrics & Stats ── */}
      <section className="home-stats" aria-label="Key GitHub & Development Statistics">
        <div className="container home-stats__grid">
          <div className="home-stats__item">
            <span className="home-stats__n blue">18+</span>
            <span className="home-stats__label">GitHub Repos</span>
          </div>
          <div className="home-stats__item">
            <span className="home-stats__n blue">8+</span>
            <span className="home-stats__label">Live Projects</span>
          </div>
          <div className="home-stats__item">
            <span className="home-stats__n blue">5+</span>
            <span className="home-stats__label">Core Languages</span>
          </div>
          <div className="home-stats__item">
            <span className="home-stats__n blue">∞</span>
            <span className="home-stats__label">Cold Coffees</span>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="home-featured" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-label">Featured Work</div>
          <div className="home-featured__header">
            <h2 id="featured-title" className="section-title">Stuff I've Built</h2>
            <Link href="/projects" className="btn btn-ghost">
              All projects <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="home-featured__grid">
            {featuredProjects.map((p) => {
              const IconComponent = iconMap[p.icon] || Code2;
              return (
                <article key={p.id} className="home-proj-card">
                  <div
                    className="home-proj-card__emoji"
                    style={{ background: `${p.color}18`, border: `1px solid ${p.color}40` }}
                  >
                    <IconComponent size={22} style={{ color: p.color }} aria-hidden="true" />
                  </div>
                  <div className="home-proj-card__body">
                    <h3 className="home-proj-card__name">{p.name}</h3>
                    <p className="home-proj-card__desc">{p.description}</p>
                    <div className="home-proj-card__tags">
                      {p.tags.map(t => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="home-proj-card__links">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost"
                      style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                    >
                      <GitHubIcon size={14} /> Code
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                      >
                        <ExternalLink size={14} aria-hidden="true" /> Live
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Philosophy Section ── */}
      <section className="home-philosophy" aria-labelledby="philosophy-title">
        <div className="container">
          <div className="home-philosophy__grid">
            <article className="home-philosophy__card home-philosophy__card--main card">
              <h3 id="philosophy-title" className="home-philosophy__title">I hate repetitive tasks.</h3>
              <p className="home-philosophy__body">
                If a task takes more than 5 minutes and I have to do it every day, I automate it. 
                Whether it's scraping data, managing Telegram groups, or connecting APIs — 
                I make sure the computer does the hard work while I drink coffee.
              </p>
            </article>

            <article className="home-philosophy__card card">
              <p className="handwritten" style={{ fontSize: '1.6rem', color: 'var(--blue)' }}>Tech Stack</p>
              <ul className="home-philosophy__stack">
                {[
                  { label: 'Python', desc: '— The brain' },
                  { label: 'React / Next.js', desc: '— The face' },
                  { label: 'Django & FastAPI', desc: '— The bones' },
                  { label: 'PostgreSQL', desc: '— The memory' },
                ].map(s => (
                  <li key={s.label}>
                    <span className="blue" aria-hidden="true">✦</span>
                    <span className="mono" style={{ color: 'var(--heading)' }}>{s.label}</span>
                    <span className="muted">{s.desc}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ── AIEO Question-Answer Insights ── */}
      <FAQSection />

      {/* ── CTA Banner ── */}
      <section className="home-cta" aria-labelledby="cta-title">
        <div className="container">
          <div className="home-cta__box">
            <p id="cta-title" className="handwritten" style={{ fontSize: '2.5rem', color: 'var(--blue)' }}>
              Let's build something!
            </p>
            <p className="muted" style={{ marginTop: '8px' }}>Got a cool project idea? A bot to build? Let's chat.</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/contact" className="btn btn-primary">
                Get in touch <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitHubIcon size={15} /> Follow on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
