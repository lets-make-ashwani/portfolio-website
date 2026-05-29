import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Send, CheckCircle } from 'lucide-react';
import { GitHubIcon, LinkedinIcon } from '../components/BrandIcons';
import { GITHUB_URL } from '../data/projects';
import './Contact.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.45 } }),
};

const socials = [
  { icon: <Mail size={20} />,          label: 'Email',    val: 'contact@ashwani.dev',   href: 'mailto:contact@ashwani.dev',                                  color: '#3b82f6' },
  { icon: <GitHubIcon size={20} />,    label: 'GitHub',   val: 'lets-make-ashwani',     href: GITHUB_URL,                                                    color: '#e2e2ec' },
  { icon: <LinkedinIcon size={20} />,  label: 'LinkedIn', val: 'Ashwani Vishwakarma',   href: 'https://www.linkedin.com/in/ashwani-vishwakarma-54104432a/',  color: '#0a66c2' },
  { icon: <MessageCircle size={20}/>,  label: 'Telegram', val: '@ashwani_dev',           href: 'https://t.me/ashwani_dev',                                    color: '#229ed9' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    // Opens mailto with form values as a demo
    const body = encodeURIComponent(`Name: ${form.name}\n\n${form.message}`);
    window.location.href = `mailto:contact@ashwani.dev?subject=${encodeURIComponent(form.subject)}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="container contact-page">

        <motion.div className="contact-header" variants={fadeUp} initial="hidden" animate="show">
          <p className="section-label">Contact</p>
          <h1 className="section-title handwritten" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', color: 'var(--blue)' }}>
            Let's chat!
          </h1>
          <p className="muted" style={{ marginTop: '12px', maxWidth: '500px' }}>
            Got a project, a bot to build, or just want to talk about Python? 
            Hit me up — I respond within 24 hours.
          </p>
          <div className="contact-header__status">
            <span className="glow-dot" />
            <span className="muted" style={{ fontSize: '0.85rem' }}>Currently open to freelance & collaborations</span>
          </div>
        </motion.div>

        <div className="contact-grid">

          {/* Socials */}
          <motion.div className="contact-socials" custom={0.5} variants={fadeUp} initial="hidden" animate="show">
            <h3 className="contact-socials__title">Find me on</h3>
            {socials.map((s, i) => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="contact-social-card"
                custom={i * 0.1} variants={fadeUp} initial="hidden" animate="show"
                whileHover={{ x: 6, borderColor: s.color }}>
                <span className="contact-social-card__icon" style={{ color: s.color, background: `${s.color}15` }}>
                  {s.icon}
                </span>
                <div>
                  <p className="contact-social-card__label">{s.label}</p>
                  <p className="contact-social-card__val mono">{s.val}</p>
                </div>
              </motion.a>
            ))}

            <div className="contact-location">
              <MapPin size={15} className="blue" />
              <div>
                <p style={{ color: '#fff', fontWeight: 600 }}>Kanpur, India</p>
                <p className="muted" style={{ fontSize: '0.8rem' }}>IST (UTC+5:30)</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div className="contact-form-wrap" custom={1} variants={fadeUp} initial="hidden" animate="show">
            <h3 className="contact-form-wrap__title">Send a message</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label>Your Name</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder="John Doe" required />
                </div>
                <div className="contact-form__field">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="john@example.com" required />
                </div>
              </div>
              <div className="contact-form__field">
                <label>Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange}
                  placeholder="Let's build something cool" required />
              </div>
              <div className="contact-form__field">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project, idea, or just say hi..." rows={5} required />
              </div>
              <button type="submit" className={`btn btn-primary contact-form__submit ${sent ? 'sent' : ''}`}>
                {sent
                  ? <><CheckCircle size={16} /> Sent!</>
                  : <><Send size={16} /> Send Message</>
                }
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
