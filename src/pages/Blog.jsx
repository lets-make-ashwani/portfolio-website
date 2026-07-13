import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { posts } from '../data/blogPosts';
import useSEO from '../hooks/useSEO';
import './Blog.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.45 } }),
};

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  useSEO({
    title: selectedPost ? selectedPost.title : 'Blog & Build Logs',
    description: selectedPost ? selectedPost.excerpt : 'Read software guides, learning journals, and development build logs written by Ashwani Vishwakarma. Covers Python scripting and full-stack development.'
  });

  const handleBack = () => {
    setSelectedPost(null);
    window.scrollTo(0, 0);
  };

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] } },
        exit: { opacity: 0, y: -16, transition: { duration: 0.25, ease: [0.25, 1, 0.5, 1] } }
      }}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container blog-page">
        {selectedPost ? (
          // Full post view
          <motion.article 
            className="blog-post-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <button className="blog-post-back" onClick={handleBack}>
              <ArrowLeft size={16} />
              <span>Back to Articles</span>
            </button>

            <header className="blog-post-header">
              <span className="blog-post-tag" style={{ color: selectedPost.tagColor, background: `${selectedPost.tagColor}15`, borderColor: `${selectedPost.tagColor}35` }}>
                {selectedPost.tag}
              </span>
              <h1 className="blog-post-title">{selectedPost.title}</h1>
              <div className="blog-post-meta muted mono">
                <span className="meta-item">
                  <Calendar size={14} />
                  <span>{selectedPost.date}</span>
                </span>
                <span className="meta-item">
                  <Clock size={14} />
                  <span>{selectedPost.readTime}</span>
                </span>
              </div>
            </header>

            <hr className="blog-post-divider" />

            <div 
              className="blog-post-content" 
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          </motion.article>
        ) : (
          // Blog index list view
          <>
            <motion.div className="blog-header" variants={fadeUp} initial="hidden" animate="show">
              <p className="section-label">Blog</p>
              <h1 className="section-title">Thoughts & <br />Build Logs</h1>
              <p className="muted" style={{ marginTop: '12px', maxWidth: '480px' }}>
                I write about things I'm building, lessons I'm learning, and opinions I have about code.
                No fluff — just real stuff from the keyboard.
              </p>
            </motion.div>

            <div className="blog-grid">
              {posts.map((post, i) => {
                const IconComponent = post.icon;
                return (
                  <motion.article
                    key={post.id}
                    className={`blog-card ${post.coming ? 'blog-card--coming' : ''}`}
                    custom={i * 0.1} 
                    variants={fadeUp} 
                    initial="hidden" 
                    whileInView="show" 
                    viewport={{ once: true }}
                    whileHover={!post.coming ? { y: -5 } : {}}
                    onClick={() => {
                      if (!post.coming) {
                        setSelectedPost(post);
                        window.scrollTo(0, 0);
                      }
                    }}
                    style={{ '--post-color': post.tagColor }}
                  >
                    <div className="blog-card__top">
                      {IconComponent && <IconComponent size={22} className="blog-card__icon" style={{ color: post.tagColor }} />}
                      <span className="blog-card__tag" style={{ color: post.tagColor, background: `${post.tagColor}15`, borderColor: `${post.tagColor}35` }}>
                        {post.tag}
                      </span>
                    </div>
                    <div className="blog-card__body">
                      <h2 className="blog-card__title">{post.title}</h2>
                      <p className="blog-card__excerpt">{post.excerpt}</p>
                    </div>
                    <div className="blog-card__footer">
                      <span className="blog-card__date muted mono">{post.date}</span>
                      <span className="blog-card__read muted mono">{post.readTime}</span>
                      {post.coming ? (
                        <span className="blog-card__coming">Coming soon</span>
                      ) : (
                        <button className="blog-card__cta" onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPost(post);
                          window.scrollTo(0, 0);
                        }}>Read →</button>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <motion.div className="blog-newsletter" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="handwritten" style={{ fontSize: '2rem', color: 'var(--blue)', marginBottom: '8px' }}>
                Want to be notified?
              </p>
              <p className="muted" style={{ marginBottom: '20px' }}>
                I'll send an email when new posts go live. No spam — promise.
              </p>
              <div className="blog-newsletter__form">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="blog-newsletter__input"
                />
                <button className="btn btn-primary">Notify me</button>
              </div>
              <p className="muted" style={{ fontSize: '0.75rem', marginTop: '10px' }}>
                More posts are coming soon!
              </p>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
