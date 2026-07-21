import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { blogPosts } from '@/data/blogPosts';
import { PROJECTS } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/projects', '/skills', '/blog', '/contact'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogRoutes = blogPosts
    .filter(p => !p.coming)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.isoDate).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...routes, ...blogRoutes];
}
