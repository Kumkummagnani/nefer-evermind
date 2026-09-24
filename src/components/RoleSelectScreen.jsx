import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { LANGUAGES } from '../locales/translations';
import EverMindLogo from './common/EverMindLogo';
import { ArrowLeft, Heart, Shield } from 'lucide-react';

export default function RoleSelectScreen() {
  const { confirmRole, cancelRoleSwitch, previousRole, language, changeLanguage, t } = useContext(AppContext);

  const handleConfirm = (role) => {
    confirmRole(role);
  };

  return (
    <div className="role-select-screen">
      <div className="role-select-card">

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <EverMindLogo size={64} />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'calc(2rem * var(--font-scale))',
          fontWeight: 900,
          color: 'var(--color-primary)',
          margin: '0 0 6px 0',
          letterSpacing: '-0.02em',
        }}>
          Evermind
        </h1>
        <p style={{
          fontSize: 'calc(1.0625rem * var(--font-scale))',
          color: 'var(--color-text-muted)',
          margin: '0 0 32px 0',
          lineHeight: 1.5,
        }}>
          {t?.appTagline || 'Always with you.'}
        </p>

        {/* Who are you? */}
        <div style={{
          fontSize: 'calc(0.9375rem * var(--font-scale))',
          fontWeight: 700,
          color: 'var(--color-text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '14px',
        }}>
          {t?.whoAreYou || 'Who is using Evermind today?'}
        </div>

        {/* Role Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>

          {/* Patient */}
          <button
            type="button"
            className="role-btn role-btn-patient"
            onClick={() => handleConfirm('patient')}
            aria-label="I am a patient or elderly person"
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }} aria-hidden="true">
              <Heart size={22} color="#FFFFFF" fill="#FFFFFF" />
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 'calc(1.125rem * var(--font-scale))' }}>
                {t?.iAmPatient || 'I am a Patient'}
              </div>
              <div style={{ fontWeight: 500, opacity: 0.85, fontSize: 'calc(0.875rem * var(--font-scale))', marginTop: '2px' }}>
                {t?.patientSubtitle || 'Loved elder, memory companion'}
              </div>
            </div>
          </button>

          {/* Caregiver */}
          <button
            type="button"
            className="role-btn role-btn-caregiver"
            onClick={() => handleConfirm('caregiver')}
            aria-label="I am a caregiver or family member"
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--color-secondary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }} aria-hidden="true">
              <Shield size={22} color="var(--color-secondary)" />
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 'calc(1.125rem * var(--font-scale))' }}>
                {t?.iAmCaregiver || 'I am a Caregiver'}
              </div>
              <div style={{ fontWeight: 500, color: 'var(--color-text-muted)', fontSize: 'calc(0.875rem * var(--font-scale))', marginTop: '2px' }}>
                {t?.caregiverSubtitle || 'Family member, nurse or doctor'}
              </div>
            </div>
          </button>
        </div>

        {/* Language Selector */}
        <div style={{
          borderTop: '1.5px solid var(--color-border)',
          paddingTop: '24px',
          marginBottom: '8px',
        }}>
          <div style={{
            fontSize: 'calc(0.8125rem * var(--font-scale))',
            fontWeight: 700,
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
          }}>
            {t?.preferredLanguage || 'Language / भाषा / ভাষা'}
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.entries(LANGUAGES).map(([code, item]) => (
              <button
                key={code}
                type="button"
                onClick={() => changeLanguage(code)}
                aria-pressed={language === code}
                aria-label={`Switch to ${item.label}`}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: language === code
                    ? '2px solid var(--color-primary)'
                    : '1.5px solid var(--color-border)',
                  background: language === code ? 'var(--color-primary)' : 'var(--color-surface-warm)',
                  color: language === code ? '#FFFFFF' : 'var(--color-text-primary)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: 'calc(0.9375rem * var(--font-scale))',
                  transition: 'all 0.18s ease',
                  fontFamily: 'inherit',
                }}
              >
                {item.native}
              </button>
            ))}
          </div>
        </div>

        {/* Cancel (only when switching mid-session) */}
        {previousRole && (
          <button
            type="button"
            onClick={cancelRoleSwitch}
            aria-label="Go back without switching"
            style={{
              marginTop: '20px',
              width: '100%',
              minHeight: '52px',
              background: 'transparent',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-muted)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontFamily: 'inherit',
              fontSize: 'calc(1rem * var(--font-scale))',
              transition: 'all 0.18s ease',
            }}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span>{t?.cancelGoBack || 'Cancel — Go Back'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
