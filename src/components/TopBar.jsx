import React, { useState, useEffect } from 'react';
import EverMindLogo from './common/EverMindLogo';
import { useApp } from '../context/AppContext';

export default function TopBar({ onMenuClick }) {
  const { t, activeRole } = useApp();
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      style={{
        background: 'var(--color-surface)',
        borderBottom: '2px solid rgba(193, 96, 74, 0.2)',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12
        }}
      >
        {/* Left: ≡ Hamburger menu (min 56px) & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open Navigation Menu"
            style={{
              minWidth: 'var(--tap-min)',
              minHeight: 'var(--tap-min)',
              background: 'var(--color-background)',
              border: '2px solid var(--color-primary)',
              borderRadius: 12,
              color: 'var(--color-primary)',
              fontSize: 'calc(1.6rem * var(--font-scale))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontWeight: 'bold',
              lineHeight: 1
            }}
          >
            ≡
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <EverMindLogo size={40} />
            <div>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: 'calc(1.2rem * var(--font-scale))', lineHeight: 1.1 }}>
                Evermind
              </div>
              <div style={{ fontSize: 'calc(0.75rem * var(--font-scale))', color: 'var(--color-muted)' }}>
                {activeRole === 'caregiver' ? 'Caregiver Portal' : (t.appTagline || 'Always with you.')}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Clock + Date grounding */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 800, color: 'var(--color-text)', fontSize: 'calc(1.1rem * var(--font-scale))' }}>
            {timeStr}
          </div>
          <div style={{ fontSize: 'calc(0.75rem * var(--font-scale))', color: 'var(--color-muted)' }}>
            {dateStr}
          </div>
        </div>
      </div>
    </header>
  );
}
