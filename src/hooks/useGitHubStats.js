import { useState, useEffect } from 'react';

const GITHUB_USERNAME = 'lets-make-ashwani';

// Cache to avoid refetching on every mount
let cache = null;

/**
 * Fetches live stats from the GitHub public API:
 *  - totalRepos: total public repos
 *  - liveProjects: repos that have a homepage URL set (deployed projects)
 *  - languages: count of unique primary languages used
 */
export default function useGitHubStats() {
  const [stats, setStats] = useState({
    totalRepos: null,
    liveProjects: null,
    languages: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (cache) {
      setStats({ ...cache, loading: false, error: null });
      return;
    }

    async function fetchStats() {
      try {
        // Fetch all public repos (up to 100)
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
            },
          }
        );

        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

        const repos = await res.json();

        const totalRepos = repos.length;

        // Live projects = repos that have a homepage URL set
        const liveProjects = repos.filter(
          (r) => r.homepage && r.homepage.trim() !== ''
        ).length;

        // Unique primary languages
        const langs = new Set(
          repos
            .map((r) => r.language)
            .filter(Boolean)
        );
        const languages = langs.size;

        const result = { totalRepos, liveProjects, languages };
        cache = result;

        setStats({ ...result, loading: false, error: null });
      } catch (err) {
        console.error('GitHub stats fetch failed:', err);
        // Fallback to manually curated counts
        setStats({
          totalRepos: 18,
          liveProjects: 8,
          languages: 4,
          loading: false,
          error: err.message,
        });
      }
    }

    fetchStats();
  }, []);

  return stats;
}
