import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/seo';
import JsonLd from './JsonLd';

interface BreadcrumbItem {
  name: string;
  item: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      <JsonLd schema={schema} />
      <nav aria-label="Breadcrumb navigation" className="breadcrumbs">
        {items.map((it, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <span key={it.item} className="breadcrumbs__item">
              {idx > 0 && <ChevronRight size={14} aria-hidden="true" />}
              {isLast ? (
                <span className="breadcrumbs__current" aria-current="page">
                  {it.name}
                </span>
              ) : (
                <Link href={it.item} className="breadcrumbs__link">
                  {it.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
