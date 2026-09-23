import React, { useState } from 'react';
import {
  X, Brain, Bot, Calendar, Image as ImageIcon, Wind, Bell,
  ShieldCheck, Moon, Globe, Type, Palette, PhoneCall, LogOut,
  UserCheck, ChevronRight, Edit3, Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../locales/translations';
import EverMindLogo from './EverMindLogo';
import { sounds } from '../../services/soundEffects';
import { applyFontScale } from '../../fontScale';

export default function SidebarDrawer({ isOpen: propIsOpen, onClose: propOnClose }) {
  const {
    currentUser,
    isSidebarOpen,
    closeSidebar,
    activeScreen,
    setActiveScreen,
    setActiveGame,
    language,
    changeLanguage,
    t,
    theme,
    changeTheme,
    toggleCalmMode,
    emergencyContact,
    setEmergencyContact,
    logoutUser
  } = useApp();

  const isOpen = propIsOpen !== undefined ? propIsOpen : isSidebarOpen;
  const onClose = propOnClose || closeSidebar;

  const [activeSize, setActiveSize] = useState(
    () => (typeof window !== 'undefined' ? localStorage.getItem('evermind-font-scale') || 'A' : 'A')
  );

  const handleSize = (size) => {
    applyFontScale(size);
    setActiveSize(size);
  };

  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactName, setContactName] = useState(emergencyContact.name);
  const [contactPhone, setContactPhone] = useState(emergencyContact.phone);

  const handleNav = (screenId) => {
    sounds.playTap();
    setActiveScreen(screenId);
    setActiveGame(null);
    onClose();
  };

  const handleLogout = () => {
    sounds.playTap();
    logoutUser();
    onClose();
  };

  const handleSaveContact = () => {
    sounds.playSuccess();
    setEmergencyContact(prev => ({
      ...prev,
      name: contactName.trim() || 'Debojit Sharma',
      phone: contactPhone.trim() || '+91 98640 44321'
    }));
    setIsEditingContact(false);
  };

  const isCaregiver = currentUser?.role === 'caregiver';

  return (
    <>
      {/* Warm Backdrop Overlay */}
      <div
        onClick={onClose}
        style={{
          display: isOpen ? 'block' : 'none',
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 999,
        }}
      />

      {/* Slide-in Drawer */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: 300,
          background: 'var(--color-surface)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          zIndex: 1000,
          overflowY: 'auto',
          boxShadow: isOpen ? '4px 0 24px rgba(0,0,0,0.18)' : 'none',
        }}
        role="dialog"
        aria-label="Navigation & Settings Menu"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '24px 22px 18px',
            borderBottom: '2px solid #EFE4D2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-surface-warm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <EverMindLogo size={48} />
            <div>
              <div style={{ fontSize: 'calc(1.5rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.1 }}>
                Evermind
              </div>
              <div style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-secondary)', letterSpacing: '0.02em' }}>
                {t.appTagline || 'Always with you.'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--color-surface)',
              border: '2px solid #DECBB1',
              color: 'var(--color-text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Role Identity Badge */}
        <div style={{ padding: '16px 22px', background: 'var(--color-surface)', borderBottom: '1px solid #EFE4D2' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              background: isCaregiver ? 'var(--color-secondary-light)' : 'var(--color-primary-light)',
              color: isCaregiver ? 'var(--color-secondary)' : 'var(--color-primary)',
              fontWeight: 800,
              fontSize: 'calc(0.9375rem * var(--font-scale))',
              border: '1.5px solid currentColor'
            }}
          >
            <UserCheck size={18} />
            <span>
              {isCaregiver ? 'Logged in as: Caregiver' : `Logged in as: Patient (${currentUser?.name || 'Elder'})`}
            </span>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          {/* Main Navigation Links */}
          <div>
            <div style={{ fontSize: 'calc(0.875rem * var(--font-scale))', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-secondary)', letterSpacing: '0.06em', marginBottom: '10px' }}>
              {t.menuTitle || 'Menu'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                type="button"
                onClick={() => handleNav('games')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: activeScreen === 'games' ? '2px solid var(--color-primary)' : '1.5px solid #EFE4D2',
                  background: activeScreen === 'games' ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  color: activeScreen === 'games' ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  fontWeight: 800,
                  fontSize: 'calc(1.125rem * var(--font-scale))',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Brain size={24} color="var(--color-primary)" />
                  <span>{t.navGames || 'Cognitive Games'}</span>
                </div>
                <ChevronRight size={18} opacity={0.6} />
              </button>

              <button
                type="button"
                onClick={() => handleNav('companion')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: activeScreen === 'companion' ? '2px solid var(--color-primary)' : '1.5px solid #EFE4D2',
                  background: activeScreen === 'companion' ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  color: activeScreen === 'companion' ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  fontWeight: 800,
                  fontSize: 'calc(1.125rem * var(--font-scale))',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Bot size={24} color="var(--color-primary)" />
                  <span>{t.navCompanion || 'Remi AI Companion'}</span>
                </div>
                <ChevronRight size={18} opacity={0.6} />
              </button>

              <button
                type="button"
                onClick={() => handleNav('schedule')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: activeScreen === 'schedule' ? '2px solid var(--color-primary)' : '1.5px solid #EFE4D2',
                  background: activeScreen === 'schedule' ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  color: activeScreen === 'schedule' ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  fontWeight: 800,
                  fontSize: 'calc(1.125rem * var(--font-scale))',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Calendar size={24} color="var(--color-primary)" />
                  <span>Dainik Dincharya</span>
                </div>
                <ChevronRight size={18} opacity={0.6} />
              </button>

              <button
                type="button"
                onClick={() => handleNav('memories')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: activeScreen === 'memories' ? '2px solid var(--color-primary)' : '1.5px solid #EFE4D2',
                  background: activeScreen === 'memories' ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  color: activeScreen === 'memories' ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  fontWeight: 800,
                  fontSize: 'calc(1.125rem * var(--font-scale))',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <ImageIcon size={24} color="var(--color-primary)" />
                  <span>{t.navMemories || 'Memory Wall'}</span>
                </div>
                <ChevronRight size={18} opacity={0.6} />
              </button>

              <button
                type="button"
                onClick={() => handleNav('breathing')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: activeScreen === 'breathing' ? '2px solid var(--color-primary)' : '1.5px solid #EFE4D2',
                  background: activeScreen === 'breathing' ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  color: activeScreen === 'breathing' ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  fontWeight: 800,
                  fontSize: 'calc(1.125rem * var(--font-scale))',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Wind size={24} color="var(--color-secondary)" />
                  <span>{t.navBreathing || 'Calm Breath & Relaxation'}</span>
                </div>
                <ChevronRight size={18} opacity={0.6} />
              </button>

              <button
                type="button"
                onClick={() => handleNav('reminders')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: activeScreen === 'reminders' ? '2px solid var(--color-primary)' : '1.5px solid #EFE4D2',
                  background: activeScreen === 'reminders' ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  color: activeScreen === 'reminders' ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  fontWeight: 800,
                  fontSize: 'calc(1.125rem * var(--font-scale))',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Bell size={24} color="#DC2626" />
                  <span>{t.navReminders || 'Daily Reminders'}</span>
                </div>
                <ChevronRight size={18} opacity={0.6} />
              </button>

              {/* Caregiver Portal */}
              <button
                type="button"
                onClick={() => handleNav('dashboard')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: activeScreen === 'dashboard' ? '2px solid var(--color-secondary)' : '1.5px solid #EFE4D2',
                  background: activeScreen === 'dashboard' ? 'var(--color-secondary-light)' : 'var(--color-surface)',
                  color: activeScreen === 'dashboard' ? 'var(--color-secondary)' : 'var(--color-text-primary)',
                  fontWeight: 800,
                  fontSize: 'calc(1.125rem * var(--font-scale))',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <ShieldCheck size={24} color="var(--color-secondary)" />
                  <span>{t.navDashboard || 'Caregiver Hub'}</span>
                </div>
                <ChevronRight size={18} opacity={0.6} />
              </button>
            </div>
          </div>

          {/* Calm Mode Quick Launcher */}
          <div style={{ background: '#2B231D', borderRadius: 'var(--radius-md)', padding: '16px', color: '#FDFBF7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Moon size={20} color="#FDE68A" />
              <span style={{ fontWeight: 800, fontSize: 'calc(1rem * var(--font-scale))', color: '#FDE68A' }}>
                {t.calmModeBtn || 'Enter Calm Sanctuary 🌿'}
              </span>
            </div>
            <p style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', color: '#D6D3D1', lineHeight: 1.4, margin: '0 0 12px 0' }}>
              Instant dimmed screen, soft rain sounds, and guided breathing.
            </p>
            <button
              type="button"
              onClick={() => {
                toggleCalmMode(true);
                onClose();
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                background: '#FDE68A',
                color: '#1C1917',
                border: 'none',
                fontWeight: 800,
                fontSize: 'calc(1rem * var(--font-scale))',
                cursor: 'pointer'
              }}
            >
              Start Calm Mode Now 🌿
            </button>
          </div>

          {/* FIX 1 Step 4: Text Size Control A · AA · AAA */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Type size={18} color="var(--color-primary)" />
              <span style={{ fontSize: 'calc(1rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {t.textSizeLabel || 'Text Size'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              {['A', 'AA', 'AAA'].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSize(size)}
                  style={{
                    background: activeSize === size ? 'var(--color-primary)' : 'transparent',
                    color: activeSize === size ? '#fff' : 'var(--color-primary)',
                    border: '2px solid var(--color-primary)',
                    borderRadius: 8,
                    padding: '12px 20px',
                    minWidth: 56,
                    minHeight: 56,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Language Switcher */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Globe size={18} color="var(--color-primary)" />
              <span style={{ fontSize: 'calc(1rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {t.preferredLanguage || 'Preferred Language'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {Object.entries(LANGUAGES).map(([code, item]) => {
                const isActive = language === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => changeLanguage(code)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: isActive ? '2.5px solid var(--color-primary)' : '1.5px solid #DECBB1',
                      background: isActive ? 'var(--color-primary-light)' : 'var(--color-surface)',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text-primary)',
                      fontWeight: 800,
                      fontSize: 'calc(0.875rem * var(--font-scale))',
                      cursor: 'pointer',
                      textAlign: 'center',
                      boxShadow: isActive ? '0 2px 8px rgba(156, 65, 36, 0.2)' : 'none'
                    }}
                  >
                    <div>{item.native}</div>
                    <div style={{ fontSize: 'calc(0.6875rem * var(--font-scale))', opacity: 0.75 }}>{item.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Themes */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Palette size={18} color="var(--color-primary)" />
              <span style={{ fontSize: 'calc(1rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {t.themeLabel || 'Color Theme'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'terracotta', name: 'Terracotta', bg: '#9C4124' },
                { id: 'emerald', name: 'Emerald', bg: '#1E6B47' },
                { id: 'indigo', name: 'Indigo', bg: '#1E3A8A' },
                { id: 'sunset', name: 'Sunset', bg: '#B45309' },
                { id: 'rose', name: 'Rose', bg: '#9F1239' }
              ].map(tObj => (
                <button
                  key={tObj.id}
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    changeTheme(tObj.id);
                  }}
                  style={{
                    flex: 1,
                    minWidth: '60px',
                    padding: '8px 6px',
                    borderRadius: 'var(--radius-sm)',
                    border: theme === tObj.id ? '2.5px solid #1E293B' : '1px solid #DECBB1',
                    background: theme === tObj.id ? '#FFF' : 'var(--color-surface-warm)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: tObj.bg }} />
                  <span style={{ fontSize: 'calc(0.6875rem * var(--font-scale))', fontWeight: 700 }}>{tObj.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Emergency Contact Information (Editable) */}
          <div style={{ background: '#FEF2F2', border: '1.5px solid #FCA5A5', borderRadius: 'var(--radius-md)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#DC2626', fontWeight: 800, fontSize: 'calc(0.9375rem * var(--font-scale))' }}>
                <PhoneCall size={18} />
                <span>{t.emergencyContactTitle || 'Emergency Contact'}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingContact(prev => !prev)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#B91C1C',
                  fontSize: 'calc(0.8125rem * var(--font-scale))',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Edit3 size={14} />
                <span>{isEditingContact ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>

            {isEditingContact ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Contact Name"
                  style={{ padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid #DECBB1', fontSize: 'calc(0.9375rem * var(--font-scale))' }}
                />
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Phone Number"
                  style={{ padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid #DECBB1', fontSize: 'calc(0.9375rem * var(--font-scale))' }}
                />
                <button
                  type="button"
                  onClick={handleSaveContact}
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    background: '#DC2626',
                    color: '#FFF',
                    border: 'none',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Check size={16} /> Save Contact
                </button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 'calc(1.0625rem * var(--font-scale))', fontWeight: 800, color: '#991B1B' }}>
                  {emergencyContact.name} ({emergencyContact.relation || 'Family'})
                </div>
                <div style={{ fontSize: 'calc(1rem * var(--font-scale))', fontWeight: 700, color: '#7F1D1D', marginTop: '2px' }}>
                  {emergencyContact.phone}
                </div>
              </div>
            )}
          </div>

          {/* Switch Profile / Logout */}
          <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface-warm)',
                border: '2px solid #DECBB1',
                color: 'var(--color-primary)',
                fontWeight: 800,
                fontSize: 'calc(1.0625rem * var(--font-scale))',
                cursor: 'pointer'
              }}
            >
              <LogOut size={20} />
              <span>{t.logoutBtn || 'Log Out'}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
