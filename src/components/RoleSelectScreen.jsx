import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { LANGUAGES } from '../locales/translations';
import EverMindLogo from './common/EverMindLogo';

export default function RoleSelectScreen() {
  const { confirmRole, cancelRoleSwitch, previousRole, language, changeLanguage, t } = useContext(AppContext);
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState('patient');

  const handleConfirm = (role) => {
    confirmRole(role, name.trim() ? { name: name.trim() } : {});
  };

  return (
    <div style={{ maxWidth: 540, margin: '40px auto', padding: '24px 16px' }}>
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: 20,
          padding: '32px 24px',
          border: '2px solid rgba(193, 96, 74, 0.2)',
          boxShadow: '0 8px 30px rgba(44, 44, 44, 0.06)',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <EverMindLogo size={60} />
        </div>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: 6 }}>Evermind</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: 24 }}>
          {t.appTagline || 'Always with you.'}
        </p>

        {/* Role selection buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          <button
            type="button"
            onClick={() => handleConfirm('patient')}
            style={{
              width: '100%',
              minHeight: 'var(--tap-min)',
              padding: '18px 20px',
              borderRadius: 14,
              background: 'var(--color-primary)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12
            }}
          >
            <span>🌸</span>
            <span>I am a Patient / Loved Elder</span>
          </button>

          <button
            type="button"
            onClick={() => handleConfirm('caregiver')}
            style={{
              width: '100%',
              minHeight: 'var(--tap-min)',
              padding: '18px 20px',
              borderRadius: 14,
              background: 'transparent',
              color: 'var(--color-primary)',
              border: '2px solid var(--color-primary)',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12
            }}
          >
            <span>🛡️</span>
            <span>I am a Caregiver / Family Member</span>
          </button>
        </div>

        {/* Language Switcher */}
        <div style={{ borderTop: '1px solid rgba(138, 126, 116, 0.2)', paddingTop: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 'calc(0.9rem * var(--font-scale))', color: 'var(--color-muted)', marginBottom: 10, fontWeight: 600 }}>
            {t.preferredLanguage || 'Preferred Language'}:
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(LANGUAGES).map(([code, item]) => (
              <button
                key={code}
                type="button"
                onClick={() => changeLanguage(code)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 10,
                  border: language === code ? '2px solid var(--color-primary)' : '1px solid var(--color-muted)',
                  background: language === code ? 'var(--color-primary)' : 'transparent',
                  color: language === code ? '#FFFFFF' : 'var(--color-text)',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {item.native}
              </button>
            ))}
          </div>
        </div>

        {/* Rule 4: Cancel Button only when previousRole exists */}
        {previousRole && (
          <button
            type="button"
            onClick={cancelRoleSwitch}
            style={{
              marginTop: 24,
              width: '100%',
              minHeight: 'var(--tap-min)',
              background: 'transparent',
              border: '2px solid var(--color-muted)',
              borderRadius: 12,
              color: 'var(--color-muted)',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ← Cancel — Go Back
          </button>
        )}
      </div>
    </div>
  );
}
