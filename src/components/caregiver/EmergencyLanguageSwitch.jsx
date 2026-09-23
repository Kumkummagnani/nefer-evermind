import React from 'react';
import { Globe, AlertCircle, Check, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES, translations } from '../../locales/translations';
import { sounds } from '../../services/soundEffects';

export default function EmergencyLanguageSwitch() {
  const { currentUser, emergencySwitchLanguage } = useApp();
  const lang = currentUser.language || 'en-IN';
  const t = translations[lang] || translations['en-IN'];

  const handleSwitch = (targetLang) => {
    if (targetLang === lang) return;
    sounds.playTap();
    // Instant switch in <1 second
    emergencySwitchLanguage(targetLang);
  };

  return (
    <div
      className="card"
      style={{
        border: '3px solid var(--color-primary)',
        background: '#FFFDF9',
        padding: '24px 26px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--color-primary)'
            }}
          >
            <Zap size={26} color="var(--color-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: 'calc(1.4375rem * var(--font-scale))', color: 'var(--color-primary)', fontWeight: 800 }}>
              {t.emergencyOverride}
            </h3>
            <p style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              {t.emergencyOverrideDesc} • Instant 1-click update without session loss
            </p>
          </div>
        </div>

        <span
          style={{
            fontSize: 'calc(0.8125rem * var(--font-scale))',
            fontWeight: 800,
            background: '#ECFDF5',
            color: '#065F46',
            border: '1px solid #10B981',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)'
          }}
        >
          ✓ Live Global Sync &lt; 1s
        </span>
      </div>

      {/* 4 Language Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        {Object.entries(LANGUAGES).map(([code, item]) => {
          const isActive = lang === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => handleSwitch(code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                border: isActive ? '3px solid var(--color-primary)' : '2px solid #DECBB1',
                background: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
                color: isActive ? '#FFFFFF' : 'var(--color-text-primary)',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: 'calc(1.125rem * var(--font-scale))',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.12s ease'
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <div>{item.native}</div>
                <div style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', opacity: isActive ? 0.9 : 0.7, fontWeight: 600 }}>
                  {item.label}
                </div>
              </div>
              {isActive && <Check size={22} color="#FFFFFF" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
