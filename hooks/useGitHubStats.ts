import { useState, useEffect } from 'react';

interface GitHubStats {
  repos: number;
  stars: number;
  commits: number;
  loading: boolean;
  error: boolean;
}

export function useGitHubStats(username: string = 'lets-make-ashwani'): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>({
    repos: 18,
    stars: 12,
    commits: 250,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchStats() {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error('Failed to fetch GitHub stats');
        const data = await res.json();

        if (isMounted) {
          setStats(prev => ({
            ...prev,
            repos: data.public_repos || prev.repos,
            loading: false,
          }));
        }
      } catch (err) {
        if (isMounted) {
          setStats(prev => ({ ...prev, loading: false, error: true }));
        }
      }
    }
    fetchStats();
    return () => {
      isMounted = false;
    };
  }, [username]);

  return stats;
}
