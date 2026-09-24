import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { applyFontScale } from '../fontScale';
import { LANGUAGES } from '../locales/translations';
import EverMindLogo from './common/EverMindLogo';
import {
  X, Home, Gamepad2, Bell, User, MessageCircle,
  Calendar, Image, Wind, Globe, Type, LogOut, ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { screen: 'home',      label: 'Home',           icon: Home,          emoji: '🏠', ariaLabel: 'Go to home screen' },
  { screen: 'games',     label: 'Mind Games',     icon: Gamepad2,      emoji: '🎮', ariaLabel: 'Go to mind games' },
  { screen: 'reminders', label: 'Reminders',      icon: Bell,          emoji: '🔔', ariaLabel: 'Go to daily reminders' },
  { screen: 'schedule',  label: 'Daily Schedule', icon: Calendar,      emoji: '📅', ariaLabel: 'Go to today\'s schedule' },
  { screen: 'memories',  label: 'My Memories',    icon: Image,         emoji: '📷', ariaLabel: 'Go to memory wall' },
  { screen: 'companion', label: 'Remi Companion', icon: MessageCircle, emoji: '💬', ariaLabel: 'Chat with Remi' },
  { screen: 'breathing', label: 'Calm Breathing', icon: Wind,          emoji: '🌿', ariaLabel: 'Go to breathing exercises' },
  { screen: 'profile',   label: 'Profile',        icon: User,          emoji: '👤', ariaLabel: 'Go to your profile' },
];

export default function Sidebar({ isOpen, onClose }) {
  const {
    activeRole,
    activeScreen,
    patientData,
    caregiverData,
    language,
    changeLanguage,
    t,
    goToRoleSelect,
    setActiveScreen,
    setActiveGame,
  } = useApp();

  const [activeSize, setActiveSize] = useState(() => {
    try { return localStorage.getItem('evermind-font-scale') || 'A'; } catch { return 'A'; }
  });

  const handleSize = (size) => {
    applyFontScale(size);
    setActiveSize(size);
  };

  const navigateTo = (screen) => {
    setActiveScreen(screen);
    setActiveGame(null);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchRole = () => {
    goToRoleSelect();
    onClose();
  };

  const currentName = activeRole === 'caregiver'
    ? caregiverData?.name || 'Caregiver'
    : patientData?.name || 'Friend';

  const sizeLabels = { A: 'Normal', AA: 'Larger', AAA: 'Largest' };
  const sizeSamples = { A: '16px', AA: '19px', AAA: '22px' };

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay${isOpen ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`sidebar-drawer${isOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        id="sidebar-drawer"
      >
        {/* ── Header ─────────────────────────────────── */}
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: '1.5px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <EverMindLogo size={36} />
            <div>
              <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: 'calc(1.1rem * var(--font-scale))', lineHeight: 1.1 }}>Evermind</div>
              <div style={{ fontSize: 'calc(0.75rem * var(--font-scale))', color: 'var(--color-text-muted)', fontWeight: 600 }}>Menu</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            style={{
              width: '44px', height: '44px',
              background: 'var(--color-surface-warm)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.18s ease',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Profile Badge ───────────────────────────── */}
        <div style={{
          margin: '16px 16px 0',
          padding: '14px 16px',
          background: activeRole === 'caregiver' ? 'var(--color-secondary-light)' : 'var(--color-primary-xlight)',
          borderRadius: 'var(--radius-md)',
          border: `1.5px solid ${activeRole === 'caregiver' ? 'var(--color-secondary-light)' : 'var(--color-primary-light)'}`,
        }}>
          <div style={{ fontSize: 'calc(0.75rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
            {activeRole === 'caregiver' ? '🛡️ Caregiver' : '🌸 Patient'}
          </div>
          <div style={{ fontWeight: 800, color: 'var(--color-text-primary)', fontSize: 'calc(1.0625rem * var(--font-scale))' }}>
            {currentName}
          </div>
        </div>

        {/* ── Nav Items ───────────────────────────────── */}
        <nav style={{ padding: '12px 16px', flex: 1, overflow: 'auto' }} aria-label="Site navigation">
          <div style={{ fontSize: 'calc(0.75rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '8px 4px 6px', marginBottom: '4px' }}>
            Navigate To
          </div>

          {NAV_ITEMS.map(item => {
            const isActive = activeScreen === item.screen;
            const label = t?.[`nav_${item.screen}`] || item.label;
            return (
              <button
                key={item.screen}
                type="button"
                onClick={() => navigateTo(item.screen)}
                aria-label={item.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '13px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--color-primary-light)' : 'transparent',
                  border: isActive ? '1.5px solid var(--color-primary-light)' : '1.5px solid transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  fontWeight: isActive ? 800 : 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  marginBottom: '2px',
                  transition: 'all 0.18s ease',
                  fontFamily: 'inherit',
                  fontSize: 'calc(1rem * var(--font-scale))',
                  minHeight: '50px',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--color-surface-warm)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <item.icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                </div>
                {isActive && <ChevronRight size={16} aria-hidden="true" />}
              </button>
            );
          })}
        </nav>

        {/* ── Settings ────────────────────────────────── */}
        <div style={{
          padding: '16px',
          borderTop: '1.5px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          flexShrink: 0,
        }}>

          {/* Text Size */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Type size={16} color="var(--color-primary)" aria-hidden="true" />
              <span style={{ fontSize: 'calc(0.875rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                {t?.textSizeLabel || 'Text Size'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }} role="group" aria-label="Choose text size">
              {['A', 'AA', 'AAA'].map(size => (
                <button
                  key={size}
                  type="button"
                  className={`text-size-btn${activeSize === size ? ' active' : ''}`}
                  onClick={() => handleSize(size)}
                  aria-pressed={activeSize === size}
                  aria-label={`Text size: ${sizeLabels[size]}`}
                  title={`${sizeLabels[size]} (${sizeSamples[size]})`}
                >
                  <span style={{ fontSize: size === 'A' ? '0.875rem' : size === 'AA' ? '1.0625rem' : '1.25rem' }}>A</span>
                  <span style={{ fontSize: '0.625rem', opacity: 0.7, marginTop: '2px' }}>{sizeLabels[size]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Globe size={16} color="var(--color-primary)" aria-hidden="true" />
              <span style={{ fontSize: 'calc(0.875rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
                {t?.preferredLanguage || 'Language'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {Object.entries(LANGUAGES).map(([code, item]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => changeLanguage(code)}
                  aria-pressed={language === code}
                  aria-label={`Switch to ${item.label}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: language === code ? 'var(--color-primary)' : 'var(--color-surface-warm)',
                    color: language === code ? '#FFFFFF' : 'var(--color-text-primary)',
                    border: language === code ? '1.5px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    fontSize: 'calc(0.9375rem * var(--font-scale))',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <span>{item.native}</span>
                  <small style={{ opacity: 0.8, fontSize: 'calc(0.75rem * var(--font-scale))' }}>{item.label}</small>
                </button>
              ))}
            </div>
          </div>

          {/* Switch Role */}
          <button
            type="button"
            onClick={handleSwitchRole}
            className="switch-profile-btn"
            aria-label="Switch role or sign out"
            style={{
              position: 'relative',
              zIndex: 200,
              width: '100%',
              minHeight: '52px',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              background: 'transparent',
              border: '1.5px solid var(--color-border)',
              color: 'var(--color-text-muted)',
              fontWeight: 700,
              cursor: 'pointer',
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontFamily: 'inherit',
              fontSize: 'calc(0.9375rem * var(--font-scale))',
              transition: 'all 0.18s ease',
            }}
          >
            <LogOut size={18} aria-hidden="true" />
            <span>{t?.switchRole || 'Switch Role / Sign Out'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
