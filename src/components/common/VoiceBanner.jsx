import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { translations } from '../../locales/translations';

export default function VoiceBanner({ currentLanguage = 'en-IN', onDismiss }) {
  const t = translations[currentLanguage] || translations['en-IN'];

  return (
    <div className="voice-banner" role="status" aria-live="polite">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <WifiOff size={24} color="#B45309" />
        <div>
          <span style={{ fontSize: 'calc(1.125rem * var(--font-scale))', fontWeight: 700 }}>
            {t.voicePaused || 'Voice paused — reconnecting…'}
          </span>
          <p style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', opacity: 0.9, marginTop: '2px' }}>
            {t.retryingVoice || 'Game and session progress remain completely safe.'}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RefreshCw size={20} className="spin-slow" color="#B45309" />
        {onDismiss && (
          <button
            onClick={onDismiss}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: 'calc(1.25rem * var(--font-scale))',
              cursor: 'pointer',
              marginLeft: '12px',
              padding: '4px 8px'
            }}
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
