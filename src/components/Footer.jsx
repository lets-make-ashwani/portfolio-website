import { Mail, Heart } from 'lucide-react';
import { GitHubIcon, LinkedinIcon, TwitterIcon } from './BrandIcons';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const socials = [
  { icon: <GitHubIcon size={18}/>,   href: 'https://github.com/lets-make-ashwani', label: 'GitHub'   },
  { icon: <LinkedinIcon size={18}/>, href: 'https://www.linkedin.com/in/ashwani-vishwakarma-54104432a/', label: 'LinkedIn' },
  { icon: <TwitterIcon size={18}/>,  href: 'https://x.com/ashwaniVish1508',           label: 'Twitter'  },
  { icon: <Mail size={18}/>,         href: 'mailto:contact@ashwani.dev',            label: 'Email'    },
];

const nav = [
  { to: '/',         label: 'Home'     },
  { to: '/about',    label: 'About'    },
  { to: '/projects', label: 'Projects' },
  { to: '/skills',   label: 'Skills'   },
  { to: '/blog',     label: 'Blog'     },
  { to: '/contact',  label: 'Contact'  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">ashwani<span className="blue">_</span></span>
          <p className="footer__tagline">
            I build automation so you don't have to.
          </p>
          <div className="footer__socials">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                 className="footer__social" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__nav">
          <p className="footer__nav-title">Navigation</p>
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className="footer__nav-link">
              {n.label}
            </NavLink>
          ))}
        </div>

        <div className="footer__status">
          <p className="footer__nav-title">Status</p>
          <div className="footer__status-item">
            <span className="glow-dot" />
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
            © {new Date().getFullYear()} Ashwani — Made with <Heart size={13} className="blue" fill="#3b82f6" /> in Kanpur
          </span>
          <span className="footer__copy">
            Built with React + Vite
          </span>
        </div>
      </div>
    </footer>
  );
}
