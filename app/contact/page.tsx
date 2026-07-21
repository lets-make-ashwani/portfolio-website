'use client';

import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { GitHubIcon, LinkedinIcon } from '@/components/BrandIcons';
import { GITHUB_URL } from '@/data/projects';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/seo';

const socials = [
  { icon: <Mail size={20} />, label: 'Email', val: 'contact@ashwani.dev', href: 'mailto:contact@ashwani.dev', color: '#3b82f6' },
  { icon: <GitHubIcon size={20} />, label: 'GitHub', val: 'lets-make-ashwani', href: GITHUB_URL, color: '#e2e2ec' },
  { icon: <LinkedinIcon size={20} />, label: 'LinkedIn', val: 'Ashwani Vishwakarma', href: 'https://www.linkedin.com/in/ashwani-vishwakarma-54104432a/', color: '#0a66c2' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null as string | null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus({ loading: false, success: true, error: null });
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 4000);
      } else {
        setStatus({ loading: false, success: false, error: result.message || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again.' });
    }
  };

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Ashwani Vishwakarma',
    description: 'Get in touch with Ashwani Vishwakarma for software development, Python automation, and project collaborations.',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Person',
      name: 'Ashwani Vishwakarma',
      email: 'contact@ashwani.dev',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kanpur',
        addressCountry: 'India',
      },
    },
  };

  return (
    <div className="container contact-page page-enter">
      <JsonLd schema={contactPageSchema} />
      <Breadcrumbs items={[{ name: 'Home', item: '/' }, { name: 'Contact', item: '/contact' }]} />

      <header className="contact-header">
        <p className="section-label">Contact</p>
        <h1 className="section-title handwritten" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--blue)' }}>
          Let's chat!
        </h1>
        <p className="muted" style={{ marginTop: '12px', maxWidth: '500px' }}>
          Got a project, a bot to build, or just want to talk about Python? 
          Hit me up — I respond within 24 hours.
        </p>
        <div className="contact-header__status">
          <span className="glow-dot" aria-hidden="true" />
          <span className="muted" style={{ fontSize: '0.85rem' }}>Currently open to new opportunities & collaborations</span>
        </div>
      </header>

      <div className="contact-grid">
        {/* Social Cards */}
        <section className="contact-socials" aria-label="Social connections">
          <h2 className="contact-socials__title">Find me on</h2>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-card"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="contact-social-card__icon" style={{ color: s.color, background: `${s.color}15` }}>
                {s.icon}
              </span>
              <div>
                <p className="contact-social-card__label">{s.label}</p>
                <p className="contact-social-card__val mono">{s.val}</p>
              </div>
            </a>
          ))}

          <div className="contact-location">
            <MapPin size={15} className="blue" aria-hidden="true" />
            <div>
              <p style={{ color: 'var(--heading)', fontWeight: 600 }}>Kanpur, India</p>
              <p className="muted" style={{ fontSize: '0.8rem' }}>IST (UTC+5:30)</p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form-wrap" aria-labelledby="form-title">
          <h2 id="form-title" className="contact-form-wrap__title">Send a message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            {status.error && (
              <div
                role="alert"
                style={{
                  color: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.85rem',
                  marginBottom: '16px',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                }}
              >
                {status.error}
              </div>
            )}
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="contact-form__field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div className="contact-form__field">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Let's build something cool"
                required
              />
            </div>
            <div className="contact-form__field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, idea, or just say hi..."
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              disabled={status.loading}
              className={`btn btn-primary contact-form__submit ${status.success ? 'sent' : ''}`}
            >
              {status.loading ? (
                <span>Sending...</span>
              ) : status.success ? (
                <><CheckCircle size={16} aria-hidden="true" /> Sent!</>
              ) : (
                <><Send size={16} aria-hidden="true" /> Send Message</>
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
