'use client';

import Link from 'next/link';
import { 
  Bot, QrCode, Coins, Code, GraduationCap, Server 
} from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import Breadcrumbs from '@/components/Breadcrumbs';

const iconMap: Record<string, any> = {
  Bot, QrCode, Coins, Code, GraduationCap, Server
};

export default function BlogIndexPage() {
  return (
    <div className="container blog-page page-enter">
      <Breadcrumbs items={[{ name: 'Home', item: '/' }, { name: 'Blog', item: '/blog' }]} />

      <header className="blog-header">
        <p className="section-label">Blog</p>
        <h1 className="section-title">
          Thoughts & <br />Build Logs
        </h1>
        <p className="muted" style={{ marginTop: '12px', maxWidth: '480px' }}>
          I write about things I'm building, lessons I'm learning, and opinions I have about code.
          No fluff — just real stuff from the keyboard.
        </p>
      </header>

      {/* Blog Cards Grid */}
      <section className="blog-grid" aria-label="Blog posts list">
        {blogPosts.map((post) => {
          const IconComponent = iconMap[post.iconName] || Code;
          return (
            <article
              key={post.id}
              className={`blog-card ${post.coming ? 'blog-card--coming' : ''}`}
              style={{ '--post-color': post.tagColor } as React.CSSProperties}
            >
              <div className="blog-card__top">
                <IconComponent size={22} className="blog-card__icon" style={{ color: post.tagColor }} aria-hidden="true" />
                <span
                  className="blog-card__tag"
                  style={{
                    color: post.tagColor,
                    background: `${post.tagColor}15`,
                    borderColor: `${post.tagColor}35`,
                  }}
                >
                  {post.tag}
                </span>
              </div>
              <div className="blog-card__body">
                <h2 className="blog-card__title">
                  {post.coming ? (
                    post.title
                  ) : (
                    <Link href={`/blog/${post.slug}`} className="blog-card__title-link">
                      {post.title}
                    </Link>
                  )}
                </h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
              </div>
              <div className="blog-card__footer">
                <span className="blog-card__date muted mono">{post.date}</span>
                <span className="blog-card__read muted mono">{post.readTime}</span>
                {post.coming ? (
                  <span className="blog-card__coming">Coming soon</span>
                ) : (
                  <Link href={`/blog/${post.slug}`} className="blog-card__cta">
                    Read →
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* Newsletter Signup */}
      <section className="blog-newsletter" aria-labelledby="newsletter-title">
        <p id="newsletter-title" className="handwritten" style={{ fontSize: '2rem', color: 'var(--blue)', marginBottom: '8px' }}>
          Want to be notified?
        </p>
        <p className="muted" style={{ marginBottom: '20px' }}>
          I'll send an email when new posts go live. No spam — promise.
        </p>
        <form className="blog-newsletter__form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="your@email.com"
            className="blog-newsletter__input"
            required
          />
          <button type="submit" className="btn btn-primary">Notify me</button>
        </form>
        <p className="muted" style={{ fontSize: '0.75rem', marginTop: '10px' }}>
          More posts are coming soon!
        </p>
      </section>
    </div>
  );
}
