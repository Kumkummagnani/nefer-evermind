import React, { useState, useEffect } from 'react';
import EverMindLogo from './EverMindLogo';
import { Heart, Sparkles } from 'lucide-react';

const AFFIRMATIONS = [
  'Awakening gentle memory moments and peaceful thoughts...',
  'Honoring your timeless wisdom, smiles, and life journey...',
  'Remi is warming up sweet songs and memories for you...',
  'Taking good care of your heart and mind today...'
];

export default function LoadingSplash({ onFinished, minDurationMs = 1200 }) {
  const [affirmation] = useState(() => {
    return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinished) onFinished();
    }, minDurationMs);

    return () => clearTimeout(timer);
  }, [onFinished, minDurationMs]);

  return (
    <div className="loading-splash-container" role="status" aria-label="Loading EverMind">
      <div className="splash-halo">
        <EverMindLogo size={80} />
      </div>

      <h1 style={{ fontSize: 'calc(2.375rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
        Evermind
      </h1>

      <p style={{ fontSize: 'calc(1.25rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-secondary)', letterSpacing: '0.02em', marginBottom: '18px' }}>
        Always with you.
      </p>

      <div className="splash-progress-bar">
        <div className="splash-progress-fill" />
      </div>

      <div
        style={{
          marginTop: '28px',
          maxWidth: '440px',
          textAlign: 'center',
          fontSize: 'calc(1.0625rem * var(--font-scale))',
          color: 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '0 16px'
        }}
      >
        <Sparkles size={18} color="var(--color-primary)" className="spin-slow" />
        <span>{affirmation}</span>
      </div>

      <button
        type="button"
        onClick={onFinished}
        style={{
          marginTop: '32px',
          background: 'transparent',
          border: '1.5px solid #DECBB1',
          padding: '8px 18px',
          borderRadius: 'var(--radius-full)',
          color: 'var(--color-text-secondary)',
          fontSize: 'calc(0.875rem * var(--font-scale))',
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Skip to App
      </button>
    </div>
  );
}
