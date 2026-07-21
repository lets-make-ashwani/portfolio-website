import Link from 'next/link';
import { Mail, Heart } from 'lucide-react';
import { GitHubIcon, LinkedinIcon, TwitterIcon } from './BrandIcons';

const socials = [
  { icon: <GitHubIcon size={18} />, href: 'https://github.com/lets-make-ashwani', label: 'GitHub' },
  { icon: <LinkedinIcon size={18} />, href: 'https://www.linkedin.com/in/ashwani-vishwakarma-54104432a/', label: 'LinkedIn' },
  { icon: <TwitterIcon size={18} />, href: 'https://x.com/ashwaniVish1508', label: 'Twitter' },
  { icon: <Mail size={18} />, href: 'mailto:contact@ashwani.dev', label: 'Email' },
];

const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site Footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">
            ashwani<span className="blue">_</span>
          </span>
          <p className="footer__tagline">
            I build automation so you don't have to.
          </p>
          <div className="footer__socials">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer Navigation">
          <p className="footer__nav-title">Navigation</p>
          {nav.map(n => (
            <Link key={n.href} href={n.href} className="footer__nav-link">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="footer__status">
          <p className="footer__nav-title">Status</p>
          <div className="footer__status-item">
            <span className="glow-dot" aria-hidden="true" />
            <span>Available for freelance</span>
          </div>
          <p className="footer__status-item" style={{ color: 'var(--muted2)', fontSize: '0.85rem' }}>
            📍 Kanpur, India
          </p>
          <p className="footer__status-item" style={{ color: 'var(--muted2)', fontSize: '0.85rem' }}>
            🎓 BCA Graduate — 2026
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <span className="footer__copy">
            © {currentYear} Ashwani — Made with <Heart size={13} className="blue" fill="#3b82f6" aria-hidden="true" /> in Kanpur
          </span>
          <span className="footer__copy">
            Built with Next.js & TypeScript
          </span>
        </div>
      </div>
    </footer>
  );
}
