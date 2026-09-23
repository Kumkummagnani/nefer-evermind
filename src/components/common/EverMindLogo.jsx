import React from 'react';

export default function EverMindLogo({ size = 44, className = '', showText = false, textClass = '' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }} className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
        aria-label="EverMind Logo"
      >
        <rect width="100" height="100" rx="26" fill="var(--color-primary)" />
        
        {/* Radiant concentric halo rings representing cognitive clarity */}
        <circle cx="50" cy="50" r="38" stroke="var(--color-surface)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
        <circle cx="50" cy="50" r="32" stroke="var(--color-accent)" strokeWidth="2" opacity="0.6" />

        {/* Nurturing Blooming Lotus & Brain Harmony Motif */}
        {/* Left Brain / Petal Hemisphere */}
        <path
          d="M50 26 C36 26 26 36 26 50 C26 62 34 72 44 76 C46 76.5 48 75 48 73 C48 68 44 64 42 58 C40 52 42 44 48 38 C49 37 50 35 50 33 Z"
          fill="#FFFFFF"
          opacity="0.95"
        />
        {/* Right Brain / Petal Hemisphere */}
        <path
          d="M50 26 C64 26 74 36 74 50 C74 62 66 72 56 76 C54 76.5 52 75 52 73 C52 68 56 64 58 58 C60 52 58 44 52 38 C51 37 50 35 50 33 Z"
          fill="#FFFFFF"
          opacity="0.95"
        />

        {/* Central Awakening Bud / Heart in warm sunset amber */}
        <path
          d="M50 36 C45 44 44 54 48 62 C49 64 51 64 52 62 C56 54 55 44 50 36 Z"
          fill="var(--color-accent)"
        />

        {/* Gentle Core Star / Sparkle */}
        <circle cx="50" cy="48" r="4.5" fill="#FEF3C7" />
        
        {/* Soothing Green tea leaf base representing renewal and North East roots */}
        <path
          d="M40 76 C44 79 56 79 60 76 C57 82 43 82 40 76 Z"
          fill="var(--color-secondary)"
        />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }} className={textClass}>
          <span style={{ fontSize: 'calc(1.5rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            EverMind
          </span>
          <span style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Cognitive Care & Remi
          </span>
        </div>
      )}
    </div>
  );
}
