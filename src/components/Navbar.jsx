import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const links = [
  { to: '/',         label: 'home'     },
  { to: '/about',    label: 'about'    },
  { to: '/projects', label: 'projects' },
  { to: '/skills',   label: 'skills'   },
  { to: '/blog',     label: 'blog'     },
  { to: '/contact',  label: 'contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo effect-elastic">
          <span>a</span><span>s</span><span>h</span><span>w</span><span>a</span><span>n</span><span>i</span><span className="blue">_</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="navbar__links">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <a href="/contact" className="btn btn-primary navbar__cta">
          Hire me
        </a>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <span className="theme-toggle__wrapper">
            <Sun className="theme-toggle__sun" size={18} aria-hidden="true" />
            <Moon className="theme-toggle__moon" size={18} aria-hidden="true" />
          </span>
        </button>

        {/* Mobile toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${open ? 'navbar__drawer--open' : ''}`}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `navbar__drawer-link ${isActive ? 'active' : ''}`
            }
          >
            {l.label}
          </NavLink>
        ))}
        <a href="/contact" className="btn btn-primary" style={{ marginTop: '8px' }}>
          Hire me
        </a>
      </div>
    </header>
  );
}
