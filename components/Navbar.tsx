'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/projects', label: 'projects' },
  { href: '/skills', label: 'skills' },
  { href: '/blog', label: 'blog' },
  { href: '/contact', label: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<string>('dark');
  const pathname = usePathname();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link href="/" className="navbar__logo effect-elastic" aria-label="Ashwani Portfolio Homepage">
          <span>a</span><span>s</span><span>h</span><span>w</span><span>a</span><span>n</span><span>i</span><span className="blue">_</span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Main Navigation">
          {navLinks.map(l => {
            const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className="btn btn-primary navbar__cta">
          Hire me
        </Link>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          type="button"
        >
          <span className="theme-toggle__wrapper">
            <Sun className="theme-toggle__sun" size={18} aria-hidden="true" />
            <Moon className="theme-toggle__moon" size={18} aria-hidden="true" />
          </span>
        </button>

        {/* Mobile menu toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={open}
          type="button"
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer ${open ? 'navbar__drawer--open' : ''}`}>
        {navLinks.map(l => {
          const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`navbar__drawer-link ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {l.label}
            </Link>
          );
        })}
        <Link href="/contact" className="btn btn-primary" style={{ marginTop: '8px' }}>
          Hire me
        </Link>
      </div>
    </header>
  );
}
