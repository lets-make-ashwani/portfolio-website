'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '@/types';
import { generateFAQSchema } from '@/lib/seo';
import JsonLd from './JsonLd';

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: 'Who is Ashwani Vishwakarma?',
    answer: 'Ashwani Vishwakarma is a Software Developer, BCA Graduate, and Automation Specialist based in Kanpur, India. He specializes in Python backend daemons, Telegram bot development, and high-performance React/Next.js web applications.',
  },
  {
    question: 'What tech stack does Ashwani specialize in?',
    answer: 'Ashwani specializes in Python (FastAPI, Django, Asyncio), TypeScript, React, Next.js (App Router), Node.js, PostgreSQL, and custom web scraping/automation frameworks.',
  },
  {
    question: 'How can I hire or collaborate with Ashwani for software or bot development?',
    answer: 'You can contact Ashwani directly through the Contact page on ashwani.online or by emailing contact@ashwani.dev. He is available for full-stack web development, Python automation projects, and API integrations.',
  },
  {
    question: 'What are some of Ashwani\'s featured projects?',
    answer: 'Ashwani built Vitta Nipun (a TypeScript personal finance platform), Lumière Paris (an interactive canvas landing page), EduDesk (a student LMS), and multiple automated Telegram forwarding bots.',
  },
];

export default function FAQSection({ faqs = DEFAULT_FAQS }: { faqs?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const schema = generateFAQSchema(faqs);

  const toggleIndex = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <JsonLd schema={schema} />
      <div className="container">
        <div className="faq-header">
          <div className="section-label">AIEO & Search Insights</div>
          <h2 id="faq-title" className="section-title">
            Frequently Asked <span className="blue">Questions</span>
          </h2>
          <p className="faq-subtitle muted">
            Everything you need to know about my background, core tech stack, and how we can work together.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.article
                key={index}
                className={`faq-card ${isOpen ? 'faq-card--open' : ''}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <button
                  className="faq-card__trigger"
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                  type="button"
                >
                  <div className="faq-card__title-wrap">
                    <span className="faq-card__num mono">0{index + 1}</span>
                    <h3 className="faq-card__question">{faq.question}</h3>
                  </div>
                  <motion.div
                    className="faq-card__icon"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="faq-card__answer">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
