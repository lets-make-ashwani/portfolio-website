import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 0' }}>
      <p className="section-label">404 Error</p>
      <h1 className="section-title handwritten" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: 'var(--blue)' }}>
        Page Not Found
      </h1>
      <p className="muted" style={{ maxWidth: '460px', marginTop: '16px', marginBottom: '32px' }}>
        The page you are looking for doesn't exist, was moved, or was automated away.
      </p>
      <Link href="/" className="btn btn-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Return Home
      </Link>
    </div>
  );
}
