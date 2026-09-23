import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';

export default function MeiteiVisualFallback({ text, onClose }) {
  if (!text) return null;

  return (
    <div
      className="meitei-fallback-container"
      role="region"
      aria-label="Visual speech announcement"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div className="meitei-fallback-badge">
          <Sparkles size={16} />
          <span>ꯃꯤꯇꯩꯂꯣꯟ Visual Voice Guide</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FEF3C7',
              fontSize: 'calc(1.375rem * var(--font-scale))',
              cursor: 'pointer',
              padding: '4px'
            }}
            aria-label="Close visual guide"
          >
            ✕
          </button>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: '#9C4124', padding: '14px', borderRadius: '50%', display: 'flex' }}>
          <Volume2 size={32} color="#FFF" />
        </div>
        <div className="meitei-fallback-text" style={{ flex: 1 }}>
          {text}
        </div>
      </div>
    </div>
  );
}
