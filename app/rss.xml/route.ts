import { NextResponse } from 'next/server';
import { blogPosts } from '@/data/blogPosts';
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from '@/lib/seo';

export async function GET() {
  const postsXml = blogPosts
    .filter((p) => !p.coming)
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.isoDate).toUTCString()}</pubDate>
    </item>`
    )
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE_NAME}]]></title>
    <link>${SITE_URL}</link>
    <description><![CDATA[${DEFAULT_DESCRIPTION}]]></description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${postsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
