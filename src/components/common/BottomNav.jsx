import React from 'react';
import { Home, Gamepad2, Bell, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../services/soundEffects';

const TABS = [
  { id: 'home', label: 'Home', icon: Home, ariaLabel: 'Go to home screen' },
  { id: 'games', label: 'Games', icon: Gamepad2, ariaLabel: 'Go to mind games' },
  { id: 'reminders', label: 'Reminders', icon: Bell, ariaLabel: 'Go to daily reminders' },
  { id: 'profile', label: 'Profile', icon: User, ariaLabel: 'Go to your profile' },
];

export default function BottomNav() {
  const { activeScreen, setActiveScreen, setActiveGame, t } = useApp();

  const handleTabClick = (tabId) => {
    sounds.playTap();
    setActiveScreen(tabId);
    setActiveGame(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const labels = {
    home: t?.navHome || 'Home',
    games: t?.navGames || 'Games',
    reminders: t?.navReminders || 'Reminders',
    profile: t?.navProfile || 'Profile',
  };

  return (
    <nav
      className="bottom-nav"
      aria-label="Main navigation"
      role="navigation"
    >
      {TABS.map((tab) => {
        const isActive = activeScreen === tab.id || (!activeScreen && tab.id === 'home');
        const IconComponent = tab.icon;
        const label = labels[tab.id] || tab.label;

        return (
          <button
            key={tab.id}
            type="button"
            className={`bottom-nav-item${isActive ? ' active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            aria-label={tab.ariaLabel}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="bottom-nav-icon-wrap">
              <IconComponent
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                aria-hidden="true"
              />
            </div>
            <span aria-hidden="true">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
