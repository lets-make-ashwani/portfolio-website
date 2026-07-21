export default function Loading() {
  return (
    <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="glow-dot" style={{ width: '12px', height: '12px' }} />
        <span className="mono muted" style={{ fontSize: '0.9rem' }}>Loading portfolio...</span>
      </div>
    </div>
  );
}
