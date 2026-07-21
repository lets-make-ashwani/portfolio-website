import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { constructMetadata, generateArticleSchema } from '@/lib/seo';

export async function generateStaticParams() {
  return blogPosts
    .filter(p => !p.coming)
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return constructMetadata();

  return constructMetadata({
    title: post.title,
    description: post.excerpt,
    canonical: `/blog/${post.slug}`,
    type: 'article',
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post || post.coming) {
    notFound();
    return null;
  }

  const articleSchema = generateArticleSchema(post);

  // Find related posts (excluding current)
  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug && !p.coming).slice(0, 2);

  return (
    <div className="container blog-page page-enter">
      <JsonLd schema={articleSchema} />
      <Breadcrumbs
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
          { name: post.title, item: `/blog/${post.slug}` },
        ]}
      />

      <article className="blog-post-view">
        <Link href="/blog" className="blog-post-back">
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Articles</span>
        </Link>

        <header className="blog-post-header">
          <span
            className="blog-post-tag"
            style={{
              color: post.tagColor,
              background: `${post.tagColor}15`,
              borderColor: `${post.tagColor}35`,
            }}
          >
            {post.tag}
          </span>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta muted mono">
            <span className="meta-item">
              <User size={14} aria-hidden="true" />
              <span>{post.author.name}</span>
            </span>
            <span className="meta-item">
              <Calendar size={14} aria-hidden="true" />
              <time dateTime={post.isoDate}>{post.date}</time>
            </span>
            <span className="meta-item">
              <Clock size={14} aria-hidden="true" />
              <span>{post.readTime}</span>
            </span>
          </div>
        </header>

        <hr className="blog-post-divider" />

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <section style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--border)' }} aria-labelledby="related-title">
            <h2 id="related-title" style={{ fontSize: '1.2rem', color: 'var(--heading)', marginBottom: '20px' }}>
              Related Articles
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {relatedPosts.map(rel => (
                <Link key={rel.id} href={`/blog/${rel.slug}`} className="card" style={{ padding: '20px' }}>
                  <span className="tag" style={{ marginBottom: '8px', color: rel.tagColor, borderColor: `${rel.tagColor}40` }}>
                    {rel.tag}
                  </span>
                  <h3 style={{ fontSize: '1rem', color: 'var(--heading)', margin: '8px 0' }}>{rel.title}</h3>
                  <p className="muted" style={{ fontSize: '0.82rem' }}>{rel.readTime}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
