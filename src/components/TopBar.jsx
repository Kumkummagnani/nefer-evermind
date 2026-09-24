import React, { useState, useEffect } from 'react';
import EverMindLogo from './common/EverMindLogo';
import { useApp } from '../context/AppContext';
import { UserCircle, Clock } from 'lucide-react';

export default function TopBar({ onMenuClick }) {
  const { t, activeRole, goToRoleSelect } = useApp();
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="top-bar" role="banner">
      <div className="top-bar-inner">

        {/* Left: Hamburger + Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            className="hamburger-btn"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            aria-expanded="false"
          >
            ≡
          </button>

          <div className="brand-mark" onClick={() => {}} aria-hidden="true">
            <EverMindLogo size={38} />
            <div>
              <div className="brand-name">Evermind</div>
              <div className="brand-tagline">
                {activeRole === 'caregiver'
                  ? 'Caregiver Portal'
                  : (t?.appTagline || 'Always with you')}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Clock grounding + profile switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Grounding clock — helps patients orient to time of day */}
          <div
            className="grounding-clock"
            aria-label={`Current time: ${timeStr}, ${dateStr}`}
            style={{ flexDirection: 'column', alignItems: 'flex-end', gap: '1px', padding: '6px 14px' }}
          >
            <span style={{
              fontSize: 'calc(1.1rem * var(--font-scale))',
              fontWeight: 900,
              color: 'var(--color-primary)',
              lineHeight: 1.2
            }}>
              {timeStr}
            </span>
            <span style={{
              fontSize: 'calc(0.6875rem * var(--font-scale))',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              lineHeight: 1
            }}>
              {dateStr}
            </span>
          </div>

          {/* Switch Profile */}
          <button
            type="button"
            onClick={goToRoleSelect}
            className="switch-profile-btn"
            aria-label="Switch profile or sign out"
            title="Switch Profile"
            style={{
              position: 'relative',
              zIndex: 200,
              minWidth: '44px',
              minHeight: '44px',
              background: 'var(--color-surface-warm)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              pointerEvents: 'auto',
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.color = 'var(--color-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            <UserCircle size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
