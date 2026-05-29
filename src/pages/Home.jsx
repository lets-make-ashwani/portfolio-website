import { motion } from 'framer-motion';
import { ArrowRight, Zap, Coffee, Code2, ExternalLink } from 'lucide-react';
import { GitHubIcon } from '../components/BrandIcons';
import { Link } from 'react-router-dom';
import { PROJECTS, GITHUB_URL, AVATAR_URL } from '../data/projects';
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

const featured = PROJECTS.filter(p => p.featured);

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="container home-hero__inner">
          <motion.div className="home-hero__content" variants={fadeUp} initial="hidden" animate="show">

            <div className="home-hero__badge">
              <span className="glow-dot" />
              <span>Open to freelance & collabs</span>
            </div>

            <motion.p className="handwritten home-hero__greeting" custom={0.5} variants={fadeUp} initial="hidden" animate="show">
              Hey there! I'm Ashwani.
            </motion.p>

            <motion.h1 className="home-hero__title" custom={1} variants={fadeUp} initial="hidden" animate="show">
              I build <span className="home-hero__highlight">automation</span><br />
              so you don't have to.
            </motion.h1>

            <motion.p className="home-hero__sub" custom={1.5} variants={fadeUp} initial="hidden" animate="show">
              2nd-year BCA student from <span className="blue" style={{borderBottom:'1px solid var(--blue)'}}>Kanpur</span>.
              I write Python, build React apps, and create Telegram bots that make 
              repetitive tasks disappear — because life's too short for manual work.
            </motion.p>

            <motion.div className="home-hero__cta" custom={2} variants={fadeUp} initial="hidden" animate="show">
              <Link to="/projects" className="btn btn-primary">
                See my work <ArrowRight size={16} />
              </Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitHubIcon size={16} /> GitHub
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="home-hero__avatar-wrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="home-hero__avatar-ring">
              <img src={AVATAR_URL} alt="Ashwani" className="home-hero__avatar" />
            </div>
            <div className="home-hero__float home-hero__float--1"><Code2 size={18} className="blue" /> Python</div>
            <div className="home-hero__float home-hero__float--2"><Zap size={18} style={{color:'#a855f7'}} /> Automation</div>
            <div className="home-hero__float home-hero__float--3"><Coffee size={18} style={{color:'#f59e0b'}} /> Late nights</div>
          </motion.div>
        </div>

        {/* Glow blobs */}
        <div className="home-hero__blob home-hero__blob--1" />
        <div className="home-hero__blob home-hero__blob--2" />
      </section>

      {/* ── Stats bar ── */}
      <section className="home-stats">
        <div className="container home-stats__grid">
          {[
            { n: '11+', label: 'GitHub Repos' },
            { n: '5+',  label: 'Live Projects' },
            { n: '3',   label: 'Core Languages' },
            { n: '∞',   label: 'Cold Coffees' },
          ].map((s, i) => (
            <motion.div key={s.label} className="home-stats__item"
              custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <span className="home-stats__n blue">{s.n}</span>
              <span className="home-stats__label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="home-featured">
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="section-label">Featured Work</p>
            <div className="home-featured__header">
              <h2 className="section-title">Stuff I've Built</h2>
              <Link to="/projects" className="btn btn-ghost">
                All projects <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>

          <div className="home-featured__grid">
            {featured.map((p, i) => (
              <motion.div key={p.id} className="home-proj-card"
                custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <div className="home-proj-card__emoji" style={{ background: `${p.color}18`, border: `1px solid ${p.color}40` }}>
                  {p.emoji}
                </div>
                <div className="home-proj-card__body">
                  <h3 className="home-proj-card__name">{p.name}</h3>
                  <p className="home-proj-card__desc">{p.description}</p>
                  <div className="home-proj-card__tags">
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <div className="home-proj-card__links">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{padding:'8px 14px',fontSize:'0.8rem'}}>
                    <GitHubIcon size={14} /> Code
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{padding:'8px 14px',fontSize:'0.8rem'}}>
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="home-philosophy">
        <div className="container">
          <div className="home-philosophy__grid">
            <motion.div className="home-philosophy__card home-philosophy__card--main card"
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h3 className="home-philosophy__title">I hate repetitive tasks.</h3>
              <p className="home-philosophy__body">
                If a task takes more than 5 minutes and I have to do it every day, I automate it. 
                Whether it's scraping data, managing Telegram groups, or connecting APIs — 
                I make sure the computer does the hard work while I drink coffee.
              </p>
            </motion.div>

            <motion.div className="home-philosophy__card card"
              custom={1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="handwritten" style={{fontSize:'1.6rem', color:'var(--blue)'}}>Tech Stack</p>
              <ul className="home-philosophy__stack">
                {[
                  { label: 'Python', desc: '— The brain' },
                  { label: 'React',  desc: '— The face'  },
                  { label: 'Django', desc: '— The bones' },
                  { label: 'MySQL',  desc: '— The memory'},
                ].map(s => (
                  <li key={s.label}>
                    <span className="blue">✦</span>
                    <span className="mono" style={{color:'#fff'}}>{s.label}</span>
                    <span className="muted">{s.desc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="home-cta">
        <div className="container">
          <motion.div className="home-cta__box"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="handwritten" style={{fontSize:'2.5rem', color:'var(--blue)'}}>Let's build something!</p>
            <p className="muted" style={{marginTop:'8px'}}>Got a cool project idea? A bot to build? Let's chat.</p>
            <div style={{display:'flex', gap:'12px', marginTop:'24px', flexWrap:'wrap'}}>
              <Link to="/contact" className="btn btn-primary">Get in touch <ArrowRight size={15}/></Link>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitHubIcon size={15}/> Follow on GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
