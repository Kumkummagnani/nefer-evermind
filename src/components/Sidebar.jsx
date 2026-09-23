import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { applyFontScale } from '../fontScale';
import { LANGUAGES } from '../locales/translations';

export default function Sidebar({ isOpen, onClose }) {
  const {
    activeRole,
    patientData,
    caregiverData,
    language,
    changeLanguage,
    t,
    goToRoleSelect,
    setActiveScreen,
    setActiveGame
  } = useApp();

  const [activeSize, setActiveSize] = useState(() => {
    try {
      return localStorage.getItem('evermind-font-scale') || 'A';
    } catch {
      return 'A';
    }
  });

  const handleSize = (size) => {
    applyFontScale(size);
    setActiveSize(size);
  };

  const navigateTo = (screen) => {
    setActiveScreen(screen);
    setActiveGame(null);
    onClose();
  };

  const handleSwitchRole = () => {
    goToRoleSelect();
    onClose();
  };

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 300,
        height: '100vh',
        background: 'var(--color-surface)',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.28s ease',
        zIndex: 250,
        pointerEvents: isOpen ? 'auto' : 'none',
        overflowY: 'auto',
        padding: 24,
        boxShadow: isOpen ? '4px 0 24px rgba(0,0,0,0.15)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 20
      }}
    >
      {/* Header with Close ✕ */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 800, color: 'var(--color-primary)', fontSize: 'calc(1.2rem * var(--font-scale))' }}>
          Evermind Menu
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Menu"
          style={{
            minWidth: 44,
            minHeight: 44,
            background: 'transparent',
            border: 'none',
            fontSize: 'calc(1.5rem * var(--font-scale))',
            color: 'var(--color-text)',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ✕
        </button>
      </div>

      {/* Role Badge */}
      <div
        style={{
          background: 'var(--color-background)',
          padding: '10px 14px',
          borderRadius: 10,
          border: '1px solid rgba(138, 126, 116, 0.25)',
          fontSize: 'calc(0.85rem * var(--font-scale))'
        }}
      >
        <div style={{ color: 'var(--color-muted)', fontWeight: 600 }}>Active Profile:</div>
        <div style={{ fontWeight: 800, color: 'var(--color-primary)' }}>
          {activeRole === 'caregiver'
            ? `🛡️ Caregiver (${caregiverData?.name || 'Debojit'})`
            : `🌸 Patient (${patientData?.name || 'Shanti Devi'})`}
        </div>
      </div>

      {/* Text Size Controls A · AA · AAA */}
      <div>
        <div style={{ fontSize: 'calc(0.85rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-muted)', marginBottom: 8 }}>
          {t.textSizeLabel || 'Text Size'}:
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['A', 'AA', 'AAA'].map(size => (
            <button
              key={size}
              type="button"
              onClick={() => handleSize(size)}
              style={{
                flex: 1,
                background: activeSize === size ? 'var(--color-primary)' : 'transparent',
                color: activeSize === size ? '#FFFFFF' : 'var(--color-primary)',
                border: '2px solid var(--color-primary)',
                borderRadius: 8,
                padding: '12px 14px',
                minWidth: 'var(--tap-min)',
                minHeight: 'var(--tap-min)',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Language Switcher */}
      <div>
        <div style={{ fontSize: 'calc(0.85rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-muted)', marginBottom: 8 }}>
          {t.preferredLanguage || 'Language'}:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {Object.entries(LANGUAGES).map(([code, item]) => (
            <button
              key={code}
              type="button"
              onClick={() => changeLanguage(code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 8,
                background: language === code ? 'var(--color-primary)' : 'transparent',
                color: language === code ? '#FFFFFF' : 'var(--color-text)',
                border: '1px solid rgba(138, 126, 116, 0.3)',
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span>{item.native}</span>
              <small style={{ opacity: 0.8 }}>{item.label}</small>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Quick Links */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        <button
          type="button"
          onClick={() => navigateTo('home')}
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            background: 'var(--color-background)',
            border: '1px solid rgba(193, 96, 74, 0.3)',
            color: 'var(--color-text)',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          🏠 Home Screen
        </button>

        <button
          type="button"
          onClick={() => navigateTo('games')}
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            background: 'var(--color-background)',
            border: '1px solid rgba(193, 96, 74, 0.3)',
            color: 'var(--color-text)',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          🎮 {t.navGames || 'Cognitive Games'}
        </button>

        <button
          type="button"
          onClick={() => navigateTo('companion')}
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            background: 'var(--color-background)',
            border: '1px solid rgba(193, 96, 74, 0.3)',
            color: 'var(--color-text)',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          💬 {t.navCompanion || 'Remi AI Companion'}
        </button>

        <button
          type="button"
          onClick={() => navigateTo('schedule')}
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            background: 'var(--color-background)',
            border: '1px solid rgba(193, 96, 74, 0.3)',
            color: 'var(--color-text)',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          📅 Dainik Dincharya (Schedule)
        </button>

        <button
          type="button"
          onClick={() => navigateTo('reminders')}
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            background: 'var(--color-background)',
            border: '1px solid rgba(193, 96, 74, 0.3)',
            color: 'var(--color-text)',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          🔔 {t.navReminders || 'Daily Reminders'}
        </button>

        <button
          type="button"
          onClick={() => navigateTo('profile')}
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            background: 'var(--color-background)',
            border: '1px solid rgba(193, 96, 74, 0.3)',
            color: 'var(--color-text)',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          👤 Profile & Settings
        </button>

        <button
          type="button"
          onClick={() => navigateTo('dashboard')}
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            background: 'var(--color-background)',
            border: '1px solid rgba(193, 96, 74, 0.3)',
            color: 'var(--color-text)',
            fontWeight: 700,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          🛡️ Caregiver Dashboard
        </button>
      </div>

      {/* Switch Role Button */}
      <div style={{ marginTop: 'auto', paddingTop: 14 }}>
        <button
          type="button"
          onClick={handleSwitchRole}
          className="switch-profile-btn"
          style={{
            position: 'relative',
            zIndex: 200,
            width: '100%',
            minHeight: 'var(--tap-min)',
            padding: 14,
            borderRadius: 10,
            background: 'transparent',
            border: '2px solid var(--color-primary)',
            color: 'var(--color-primary)',
            fontWeight: 800,
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
        >
          🔄 Switch Role / Profile
        </button>
      </div>
    </aside>
  );
}
