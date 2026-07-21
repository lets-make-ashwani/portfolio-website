import { Metadata } from 'next';
import { BlogPost, Project } from '@/types';

export const SITE_URL = 'https://ashwani.online';
export const SITE_NAME = 'Ashwani — Software Developer & Automation Specialist';
export const DEFAULT_DESCRIPTION = 'Ashwani is a BCA graduate, Python & Web Automation Specialist, Telegram Bot Builder, and Full-Stack Developer from Kanpur, India. Specializing in high-performance web applications, custom API integrations, and Python automation daemons.';
export const AUTHOR_NAME = 'Ashwani Vishwakarma';

export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  image = '/my image.webp',
  canonical,
  type = 'website',
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: 'website' | 'article';
} = {}): Metadata {
  const metaTitle = title ? `${title} | Ashwani` : 'Ashwani | I build automation so you don\'t have to.';
  const pageUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  return {
    title: metaTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: pageUrl,
    },
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    publisher: AUTHOR_NAME,
    keywords: [
      'Ashwani',
      'Ashwani Vishwakarma',
      'Software Developer Kanpur',
      'Python Automation Specialist',
      'Telegram Bot Developer',
      'React Developer India',
      'Next.js Developer',
      'Full Stack Developer',
      'FastAPI Developer',
      'BCA Graduate Developer',
      'Web Scraping Engineer',
      'Custom Bot Building Services',
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: metaTitle,
      description,
      url: pageUrl,
      siteName: 'Ashwani Portfolio',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description,
      images: [image],
      creator: '@ashwaniVish1508',
    },
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/my image.webp`,
    jobTitle: 'Software Developer & Automation Specialist',
    worksFor: {
      '@type': 'Organization',
      name: 'Brandmate Digital',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Jagran College of Arts, Science & Commerce, Kanpur',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kanpur',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'India',
    },
    sameAs: [
      'https://github.com/lets-make-ashwani',
      'https://www.linkedin.com/in/ashwani-vishwakarma-54104432a/',
      'https://x.com/ashwaniVish1508',
    ],
    knowsAbout: [
      'Full Stack Web Development',
      'Python Automation',
      'Telegram Bot API',
      'React.js & Next.js',
      'FastAPI & Django',
      'Web Scraping & Data Extraction',
      'TypeScript',
    ],
    description: DEFAULT_DESCRIPTION,
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Ashwani Portfolio',
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@id': `${SITE_URL}/#person`,
    },
    inLanguage: 'en-US',
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: `${SITE_URL}${it.item}`,
    })),
  };
}

export function generateArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url,
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    image: `${SITE_URL}/my image.webp`,
    inLanguage: 'en-US',
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateProjectSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    author: {
      '@id': `${SITE_URL}/#person`,
    },
    url: project.live || project.github,
    codeRepository: project.github,
  };
}
