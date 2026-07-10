import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Coffee, Zap, Heart } from 'lucide-react';
import { GitHubIcon } from '../components/BrandIcons';
import { AVATAR_URL, GITHUB_URL } from '../data/projects';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }),
};

const timeline = [
  {
    year: '2023',
    title: 'Started BCA — Computer Applications',
    desc: 'Enrolled in my computer applications degree at Jagran College of Arts, Science & Commerce, Kanpur. Officially started my programming journey.',
    icon: '🎓',
  },
  {
    year: '2024',
    title: 'Built First Telegram Bot',
    desc: 'My first automation — a bot that auto-forwarded media between Telegram groups. Saved 3+ hours a day.',
    icon: '🤖',
  },
  {
    year: '2024',
    title: 'Open-Sourced 5 Projects',
    desc: 'Pushed EduDesk, Attendly, QR File Transfer, and more to GitHub. Started building in public.',
    icon: '🚀',
  },
  {
    year: '2025',
    title: 'Full-Stack with React + Django',
    desc: 'Levelled up — went from script kiddie to building full web apps with proper backends and databases.',
    icon: '⚡',
  },
  {
    year: '2025',
    title: 'Vitta Nipun & EduDesk Go Live',
    desc: 'First deployed products on Vercel. Real users, real feedback, real iteration.',
    icon: '🌐',
  },
  {
    year: '2026',
    title: 'Graduated BCA — Jagran College',
    desc: 'Completed my BCA degree from Jagran College of Arts, Science & Commerce, Kanpur. Three years of grinding algorithms by day and building real projects by night.',
    icon: '🎓',
  },
  {
    year: '2026 — Present',
    title: 'IT Intern — Brandmate Digital',
    desc: 'Developing, maintaining, and optimizing websites and landing pages for client businesses. Implementing responsive layouts, plugin integrations, SEO, and debugging performance bottlenecks.',
    icon: '💼',
  },
];

const funFacts = [
  { icon: <Coffee size={20} />, text: 'Runs on cold coffee after midnight' },
  { icon: <Zap size={20} />,    text: 'If it can be automated, I will automate it' },
  { icon: <Heart size={20} />,  text: 'From Kanpur — city of leather & now code' },
  { icon: <GitHubIcon size={20} />, text: '11+ repos and counting' },
  { icon: <GraduationCap size={20}/>, text: 'BCA graduate — Class of 2026' },
  { icon: '🐍',                 text: 'Python is my first love' },
];

export default function About() {
  const [liveResumeHtml, setLiveResumeHtml] = useState(null);

  useEffect(() => {
    const url = 'https://docs.google.com/document/d/1c4_XEAG3VqLMFI1BoDBg2PbbC79UUm3UuAyIExvwYuc/mobilebasic';
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

    fetch(proxyUrl)
      .then(res => {
        if (!res.ok) throw new Error('Proxy error');
        return res.json();
      })
      .then(data => {
        if (!data.contents) throw new Error('No contents');
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        const docContent = doc.querySelector('.doc-content');
        if (docContent) {
          // Remove inline styles to inherit theme
          const allElements = docContent.querySelectorAll('*');
          allElements.forEach(el => {
            el.removeAttribute('style');
          });
          setLiveResumeHtml(docContent.innerHTML);
        }
      })
      .catch(err => {
        console.error('Error fetching live resume:', err);
      });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="container about-page">

        {/* ── Header ── */}
        <motion.div className="about-header" variants={fadeUp} initial="hidden" animate="show">
          <p className="section-label">About Me</p>
          <h1 className="section-title">I build automation<br />so you don't have to.</h1>
        </motion.div>

        {/* ── Intro grid ── */}
        <div className="about-intro">
          <motion.div className="about-intro__avatar-col" custom={0.5} variants={fadeUp} initial="hidden" animate="show">
            <div className="about-intro__avatar-frame">
              <img src={AVATAR_URL} alt="Ashwani" className="about-intro__avatar" />
            </div>
            <div className="about-intro__meta">
              <div className="about-intro__meta-item">
                <MapPin size={15} className="blue" />
                <span>Kanpur, Uttar Pradesh, India</span>
              </div>
              <div className="about-intro__meta-item">
                <GraduationCap size={15} className="blue" />
                <span>BCA Graduate — Jagran College</span>
              </div>
              <div className="about-intro__meta-item">
                <span className="glow-dot" />
                <span style={{ color: '#22c55e' }}>Available for freelance</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '240px' }}>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ justifyContent: 'center' }}>
                <GitHubIcon size={16} /> View GitHub
              </a>
              <a href="https://docs.google.com/document/d/1c4_XEAG3VqLMFI1BoDBg2PbbC79UUm3UuAyIExvwYuc/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                View Resume
              </a>
            </div>
          </motion.div>

          <motion.div className="about-intro__bio" custom={1} variants={fadeUp} initial="hidden" animate="show">
            <p className="handwritten" style={{ fontSize: '1.8rem', color: 'var(--blue)', marginBottom: '20px' }}>
              The story so far...
            </p>
            <p>
              I'm Ashwani, a BCA graduate (2026) from Kanpur who figured out pretty early that 
              computers should work <em>for</em> people, not the other way around.
            </p>
            <p style={{ marginTop: '16px' }}>
              My coding journey started with curiosity — "can I make this annoying task go away?" — and that 
              question has driven every project since. From auto-captioning videos to building personal finance 
              trackers, my work is always rooted in one idea: <strong style={{ color: '#fff' }}>make it so you never have to do it manually again.</strong>
            </p>
            <p style={{ marginTop: '16px' }}>
              I spend my time building apps, learning new frameworks, and occasionally breaking things in 
              interesting ways. Currently in love with TypeScript, actively exploring backend systems, and 
              always down to build something weird and useful.
            </p>
            <p style={{ marginTop: '16px', fontFamily: 'var(--font-hand)', fontSize: '1.2rem', color: 'var(--muted2)' }}>
              — Ashwani, 2026 🖤
            </p>
          </motion.div>
        </div>

        {/* ── Fun Facts ── */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="section-label" style={{ marginBottom: '20px' }}>Quick Facts</p>
          <div className="about-facts">
            {funFacts.map((f, i) => (
              <motion.div key={i} className="about-facts__item card"
                custom={i * 0.1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                whileHover={{ y: -4, borderColor: 'var(--blue)' }}>
                <span className="about-facts__icon blue">{f.icon}</span>
                <span className="about-facts__text">{f.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {liveResumeHtml && (
          <>
            <hr className="sep" />
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="section-label">Resume</p>
              <h2 className="section-title" style={{ marginBottom: '32px' }}>Live Experience</h2>
              <div className="about-live-resume">
                <div className="about-live-resume__badge">
                  <span className="glow-dot" style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted2)' }}>Live synced with Google Docs</span>
                </div>
                <div 
                  className="about-live-resume__content"
                  dangerouslySetInnerHTML={{ __html: liveResumeHtml }}
                />
              </div>
            </motion.div>
          </>
        )}

        <hr className="sep" />

        {/* ── Timeline ── */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="section-label">Journey</p>
          <h2 className="section-title" style={{ marginBottom: '48px' }}>How I got here</h2>
          <div className="about-timeline">
            {timeline.map((t, i) => (
              <motion.div key={i} className="about-timeline__item"
                custom={i * 0.1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <div className="about-timeline__icon">{t.icon}</div>
                <div className="about-timeline__body">
                  <span className="about-timeline__year tag">{t.year}</span>
                  <h3 className="about-timeline__title">{t.title}</h3>
                  <p className="about-timeline__desc">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
