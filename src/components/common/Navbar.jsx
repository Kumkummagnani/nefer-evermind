import React from 'react';
import { Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EverMindLogo from './EverMindLogo';
import GroundingClock from './GroundingClock';
import { sounds } from '../../services/soundEffects';
export default function Navbar({ onOpenSidebar }) {
  const {
    toggleSidebar,
    setActiveScreen,
    setActiveGame,
    langToast,
    t
  } = useApp();

  const handleOpen = onOpenSidebar || toggleSidebar;

  const handleHomeClick = () => {
    sounds.playTap();
    setActiveScreen('games');
    setActiveGame(null);
  };

  return (
    <>
      <header className="navbar muga-border" role="banner">
        <div
          className="navbar-inner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {/* Left: Soft Hamburger Dash Button (>=56px tap target) & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="button"
              className="hamburger-btn"
              onClick={handleOpen}
              title="Open Menu (≡)"
              aria-label="Open Navigation and Settings Menu"
              style={{
                minWidth: '56px',
                minHeight: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Menu size={32} />
            </button>

            <div
              className="brand-logo"
              onClick={handleHomeClick}
              tabIndex={0}
              role="button"
              aria-label="Evermind Home"
              onKeyDown={(e) => { if (e.key === 'Enter') handleHomeClick(); }}
            >
              <EverMindLogo size={44} />
              <div>
                <div className="brand-title" style={{ fontSize: 'calc(1.625rem * var(--font-scale))' }}>Evermind</div>
                <div className="brand-subtitle" style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', letterSpacing: '0.02em' }}>
                  {t.appTagline || 'Always with you.'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Large Grounding Clock Always Visible */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <GroundingClock />
          </div>
        </div>

        {/* Emergency Language Switch Toast */}
        {langToast && (
          <div className="lang-toast-banner" role="status" aria-live="assertive">
            {langToast}
          </div>
        )}
      </header>
    </>
  );
}
