import React from 'react';
import { Home, Gamepad2, Bell, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function BottomNav() {
  const { activeScreen, setActiveScreen, setActiveGame } = useApp();

  const handleTabClick = (tabId) => {
    setActiveScreen(tabId);
    setActiveGame(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, emoji: '🏠' },
    { id: 'games', label: 'Games', icon: Gamepad2, emoji: '🎮' },
    { id: 'reminders', label: 'Reminders', icon: Bell, emoji: '💊' },
    { id: 'profile', label: 'Profile', icon: User, emoji: '👤' }
  ];

  return (
    <nav
      className="bottom-nav-bar"
      aria-label="Bottom Navigation"
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 150,
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        background: 'var(--color-surface, #F2EBE3)',
        borderTop: '2px solid rgba(193, 96, 74, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '6px 4px 8px 4px',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.06)'
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeScreen === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            style={{
              flex: 1,
              minHeight: '56px',
              background: 'transparent',
              border: 'none',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              cursor: 'pointer',
              color: isActive ? 'var(--color-primary)' : 'var(--color-muted)',
              fontWeight: isActive ? 800 : 600,
              padding: '6px 4px',
              transition: 'all 0.15s ease'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 8,
                background: isActive ? 'var(--color-primary-light)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              <IconComponent size={22} color={isActive ? 'var(--color-primary)' : 'currentColor'} />
            </div>
            <span style={{ fontSize: 'calc(0.75rem * var(--font-scale))', lineHeight: 1 }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
