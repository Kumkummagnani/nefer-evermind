import React, { useState, useEffect } from 'react';
import EverMindLogo from './common/EverMindLogo';
import { useApp } from '../context/AppContext';

export default function TopBar({ onMenuClick }) {
  const { t, activeRole, goToRoleSelect } = useApp();
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
        zIndex: 200
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
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

        {/* Right: Switch Profile button + Clock + Date grounding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            onClick={goToRoleSelect}
            className="switch-profile-btn"
            aria-label="Switch Profile"
            style={{
              position: 'relative',
              zIndex: 200,
              minHeight: '44px',
              padding: '8px 14px',
              borderRadius: 10,
              background: 'var(--color-background)',
              border: '2px solid var(--color-primary)',
              color: 'var(--color-primary)',
              fontWeight: 800,
              fontSize: 'calc(0.85rem * var(--font-scale))',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              pointerEvents: 'auto'
            }}
          >
            <span>🔄</span>
            <span>Switch Profile</span>
          </button>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, color: 'var(--color-text)', fontSize: 'calc(1.1rem * var(--font-scale))' }}>
              {timeStr}
            </div>
            <div style={{ fontSize: 'calc(0.75rem * var(--font-scale))', color: 'var(--color-muted)' }}>
              {dateStr}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
