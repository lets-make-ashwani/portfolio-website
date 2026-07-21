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
  const schema = generateFAQSchema(faqs);

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <JsonLd schema={schema} />
      <div className="container">
        <div className="section-label">AIEO & Search Insights</div>
        <h2 id="faq-title" className="section-title">
          Frequently Asked <span className="blue">Questions</span>
        </h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <article key={index} className="faq-card">
              <h3 className="faq-card__question">{faq.question}</h3>
              <p className="faq-card__answer">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
