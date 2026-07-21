import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Caveat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SplashCursor from '@/components/SplashCursor';
import JsonLd from '@/components/JsonLd';
import { constructMetadata, generatePersonSchema, generateWebsiteSchema } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=sessionStorage.getItem("theme")||"dark";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />
        {/* Google Analytics 4 Script placeholder */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-71VE63DXYD" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-71VE63DXYD');`,
          }}
        />
      </head>
      <body>
        <JsonLd schema={personSchema} />
        <JsonLd schema={websiteSchema} />
        <div className="noise">
          <SplashCursor />
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
