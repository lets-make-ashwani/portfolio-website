'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled App Error:', error);
  }, [error]);

  return (
    <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 0' }}>
      <p className="section-label">500 Error</p>
      <h1 className="section-title" style={{ fontSize: '2.5rem', color: 'var(--heading)' }}>
        Something Went Wrong
      </h1>
      <p className="muted" style={{ maxWidth: '460px', marginTop: '16px', marginBottom: '32px' }}>
        An unexpected error occurred while rendering this page.
      </p>
      <button onClick={() => reset()} className="btn btn-primary">
        Try Again
      </button>
    </div>
  );
}
