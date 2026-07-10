import { useEffect } from 'react';

/**
 * Custom hook to dynamically update page titles and meta description tags.
 * Ensures search engines and tab headers display accurate information for each route.
 */
export default function useSEO({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Ashwani Vishwakarma`;
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);
}
