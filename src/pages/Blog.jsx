import { motion } from 'framer-motion';
import './Blog.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.45 } }),
};

const posts = [
  {
    id: 1,
    emoji: '🤖',
    tag: 'Automation',
    tagColor: '#3b82f6',
    date: 'May 2026',
    title: 'How I built a Telegram bot that saves me 3 hours a day',
    excerpt: 'The exact Python code and architecture behind my media-forwarding Telegram bot — including how to handle rate limits, media groups, and errors gracefully.',
    readTime: '6 min read',
    coming: false,
  },
  {
    id: 2,
    emoji: '📱',
    tag: 'Utility',
    tagColor: '#06b6d4',
    date: 'April 2026',
    title: 'QR File Transfer: No cables, no accounts, just scan',
    excerpt: 'I built a local-network file transfer tool using QR codes. Here\'s how it works, why it\'s actually useful, and what I learned about WebSockets.',
    readTime: '4 min read',
    coming: false,
  },
  {
    id: 3,
    emoji: '💰',
    tag: 'Project',
    tagColor: '#22c55e',
    date: 'May 2026',
    title: 'Building Vitta Nipun: My first TypeScript project',
    excerpt: 'Why I switched from JavaScript to TypeScript mid-project, what broke, what got better, and whether I\'d do it again (yes).',
    readTime: '7 min read',
    coming: false,
  },
  {
    id: 4,
    emoji: '⚡',
    tag: 'Tips',
    tagColor: '#a855f7',
    date: 'Coming soon',
    title: 'Python tricks that make you look like a wizard',
    excerpt: 'List comprehensions, generators, context managers, decorators — the Python features that made me fall in love with the language.',
    readTime: '5 min read',
    coming: true,
  },
  {
    id: 5,
    emoji: '🎓',
    tag: 'Life',
    tagColor: '#f59e0b',
    date: 'Coming soon',
    title: 'Being a BCA grad who ships more than the curriculum ever taught',
    excerpt: 'The gap between what college teaches and what you actually need to build things — and how to close it without burning out.',
    readTime: '8 min read',
    coming: true,
  },
  {
    id: 6,
    emoji: '🔧',
    tag: 'Django',
    tagColor: '#10b981',
    date: 'Coming soon',
    title: 'Django REST Framework: A beginner\'s honest review',
    excerpt: 'I\'m learning DRF right now. Here\'s what confuses me, what clicks, and how I\'m structuring my learning to actually retain it.',
    readTime: '6 min read',
    coming: true,
  },
];

import useSEO from '../hooks/useSEO';

export default function Blog() {
  useSEO({
    title: 'Blog & Build Logs',
    description: 'Read software guides, learning journals, and development build logs written by Ashwani Vishwakarma. Covers Python scripting and full-stack development.'
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="container blog-page">

        <motion.div className="blog-header" variants={fadeUp} initial="hidden" animate="show">
          <p className="section-label">Blog</p>
          <h1 className="section-title">Thoughts & <br />Build Logs</h1>
          <p className="muted" style={{ marginTop: '12px', maxWidth: '480px' }}>
            I write about things I'm building, lessons I'm learning, and opinions I have about code.
            No fluff — just real stuff from the keyboard.
          </p>
        </motion.div>

        <div className="blog-grid">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              className={`blog-card ${post.coming ? 'blog-card--coming' : ''}`}
              custom={i * 0.1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              whileHover={!post.coming ? { y: -5 } : {}}
              style={{ '--post-color': post.tagColor }}
            >
              <div className="blog-card__top">
                <span className="blog-card__emoji">{post.emoji}</span>
                <span className="blog-card__tag" style={{ color: post.tagColor, background: `${post.tagColor}15`, borderColor: `${post.tagColor}35` }}>
                  {post.tag}
                </span>
              </div>
              <div className="blog-card__body">
                <h2 className="blog-card__title">{post.title}</h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
              </div>
              <div className="blog-card__footer">
                <span className="blog-card__date muted mono">{post.date}</span>
                <span className="blog-card__read muted mono">{post.readTime}</span>
                {post.coming
                  ? <span className="blog-card__coming">Coming soon</span>
                  : <button className="blog-card__cta">Read →</button>
                }
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div className="blog-newsletter" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p className="handwritten" style={{ fontSize: '2rem', color: 'var(--blue)', marginBottom: '8px' }}>
            Want to be notified?
          </p>
          <p className="muted" style={{ marginBottom: '20px' }}>
            I'll send an email when new posts go live. No spam — promise.
          </p>
          <div className="blog-newsletter__form">
            <input
              type="email"
              placeholder="your@email.com"
              className="blog-newsletter__input"
            />
            <button className="btn btn-primary">Notify me</button>
          </div>
          <p className="muted" style={{ fontSize: '0.75rem', marginTop: '10px' }}>
            Blog is a work in progress — posts are coming soon!
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
