import React, { useState } from 'react';
import { User, Phone, Globe, Type, LogOut, Heart, ChevronRight, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../locales/translations';
import { applyFontScale } from '../../fontScale';
import PatientSosButton from '../common/PatientSosButton';
import ConfusionHelpButton from '../common/ConfusionHelpButton';

export default function ProfileScreen() {
  const {
    patientData = {},
    caregiverData = {},
    familyMembers = [],
    language,
    changeLanguage,
    goToRoleSelect,
    t = {},
    clinicalProfile = {},
    toggleCalmMode,
    activeRole,
  } = useApp();

  const [activeSize, setActiveSize] = useState(() => {
    try { return localStorage.getItem('evermind-font-scale') || 'A'; } catch { return 'A'; }
  });

  const handleSize = (size) => {
    applyFontScale(size);
    setActiveSize(size);
  };

  const patientName  = patientData?.name || 'Shanti Devi';
  const patientAge   = patientData?.age  || 74;
  const primaryCaregiver = familyMembers.find(m => m.isPrimary) || {
    name: caregiverData?.name || 'Debojit Sharma',
    relationship: 'Son',
    phone: clinicalProfile?.doctorPhone || '+91 98765 43210',
  };

  const sizeLabels = { A: 'Normal', AA: 'Larger', AAA: 'Largest' };

  return (
    <div style={{ paddingBottom: '100px' }}>

      {/* ── Profile Header ────────────────────────────────── */}
      <div style={{
        textAlign: 'center',
        padding: '28px 20px 24px',
        background: 'linear-gradient(145deg, var(--color-surface-warm) 0%, var(--color-surface) 100%)',
        borderRadius: 'var(--radius-xl)',
        border: '1.5px solid var(--color-border)',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Soft decorative circle */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'var(--color-primary-xlight)',
          pointerEvents: 'none',
        }} aria-hidden="true" />

        {/* Avatar */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'var(--color-primary-light)',
          margin: '0 auto 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid var(--color-primary)',
          boxShadow: '0 4px 16px rgba(156,65,36,0.18)',
        }} aria-hidden="true">
          <User size={40} color="var(--color-primary)" />
        </div>

        <h1 style={{
          fontSize: 'calc(1.75rem * var(--font-scale))',
          fontWeight: 900,
          color: 'var(--color-text-primary)',
          margin: '0 0 4px',
        }}>
          {patientName}
        </h1>
        <p style={{
          fontSize: 'calc(0.9375rem * var(--font-scale))',
          color: 'var(--color-text-muted)',
          margin: 0,
        }}>
          {t.patientProfileLabel || 'Patient Profile'} • {t.ageLabel || 'Age'} {patientAge}
        </p>
      </div>

      {/* ── Text Size ─────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '16px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: 'var(--radius-xs)',
            background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }} aria-hidden="true">
            <Type size={18} color="var(--color-primary)" />
          </div>
          <div>
            <h2 style={{ fontSize: 'calc(1.0625rem * var(--font-scale))', fontWeight: 800, margin: 0 }}>
              {t.textSizeLabel || 'Text Size'}
            </h2>
            <p style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', color: 'var(--color-text-muted)', margin: 0 }}>
              {t.textSizeHint || 'Choose what feels most comfortable to read'}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }} role="group" aria-label="Choose text size">
          {['A', 'AA', 'AAA'].map(size => (
            <button
              key={size}
              type="button"
              className={`text-size-btn${activeSize === size ? ' active' : ''}`}
              onClick={() => handleSize(size)}
              aria-pressed={activeSize === size}
              aria-label={`Set text size to ${sizeLabels[size]}`}
            >
              <span style={{ fontSize: size === 'A' ? '1rem' : size === 'AA' ? '1.25rem' : '1.5rem', lineHeight: 1 }}>A</span>
              <span style={{ fontSize: '0.625rem', opacity: 0.75, marginTop: '3px' }}>{sizeLabels[size]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Language ──────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: '16px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: 'var(--radius-xs)',
            background: 'var(--color-secondary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }} aria-hidden="true">
            <Globe size={18} color="var(--color-secondary)" />
          </div>
          <div>
            <h2 style={{ fontSize: 'calc(1.0625rem * var(--font-scale))', fontWeight: 800, margin: 0 }}>
              {t.preferredLanguage || 'Language'}
            </h2>
            <p style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', color: 'var(--color-text-muted)', margin: 0 }}>
              {t.languageHint || 'Choose your preferred reading language'}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                padding: '13px 16px',
                borderRadius: 'var(--radius-sm)',
                border: language === code ? '2px solid var(--color-secondary)' : '1.5px solid var(--color-border)',
                background: language === code ? 'var(--color-secondary-light)' : 'var(--color-surface-warm)',
                color: 'var(--color-text-primary)',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'calc(1rem * var(--font-scale))',
                transition: 'all 0.18s ease',
                minHeight: '52px',
              }}
            >
              <span>{item.native}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', color: 'var(--color-text-muted)' }}>
                  {item.label}
                </span>
                {language === code && (
                  <span style={{
                    fontSize: 'calc(0.75rem * var(--font-scale))',
                    fontWeight: 800,
                    background: 'var(--color-secondary)',
                    color: '#FFFFFF',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                  }}>
                    {t.active || 'Active'}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Family / Help Contact ──────────────────────────── */}
      <div className="card" style={{ marginBottom: '20px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: 'var(--radius-xs)',
            background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }} aria-hidden="true">
            <Heart size={18} color="#DC2626" fill="#DC2626" />
          </div>
          <div>
            <h2 style={{ fontSize: 'calc(1.0625rem * var(--font-scale))', fontWeight: 800, margin: 0 }}>
              {t.myFamily || 'My Family & Help'}
            </h2>
            <p style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', color: 'var(--color-text-muted)', margin: 0 }}>
              {t.familyHint || 'People who care for you'}
            </p>
          </div>
        </div>

        {/* Primary caregiver card */}
        <div style={{
          padding: '16px',
          background: 'var(--color-surface-warm)',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--color-border)',
          marginBottom: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 'calc(1.0625rem * var(--font-scale))', color: 'var(--color-text-primary)' }}>
                {primaryCaregiver.name}
              </div>
              <div style={{ fontSize: 'calc(0.875rem * var(--font-scale))', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                {primaryCaregiver.relationship} • {t.primaryCaregiverLabel || 'Primary Caregiver'}
              </div>
            </div>
            <span style={{
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: 'calc(0.75rem * var(--font-scale))',
              fontWeight: 800,
            }}>
              {t.primaryLabel || 'Primary'}
            </span>
          </div>

          <a
            href={`tel:${String(primaryCaregiver.phone || '').replace(/[^0-9+]/g, '')}`}
            aria-label={`Call ${primaryCaregiver.name} at ${primaryCaregiver.phone}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              background: 'var(--color-secondary)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              fontWeight: 800,
              fontSize: 'calc(1rem * var(--font-scale))',
              textDecoration: 'none',
              transition: 'all 0.18s ease',
              minHeight: '46px',
            }}
          >
            <Phone size={18} aria-hidden="true" />
            <span>{t.callNow || 'Call Now'} — {primaryCaregiver.phone}</span>
          </a>
        </div>
      </div>

      {/* ── Calm Mode shortcut ────────────────────────────── */}
      <button
        type="button"
        onClick={toggleCalmMode}
        style={{
          width: '100%',
          minHeight: '56px',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          background: '#1A1412',
          border: '1.5px solid #3D3532',
          color: '#FDE68A',
          fontWeight: 800,
          fontSize: 'calc(1.0625rem * var(--font-scale))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer',
          marginBottom: '12px',
          fontFamily: 'inherit',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#2A2220'}
        onMouseLeave={e => e.currentTarget.style.background = '#1A1412'}
      >
        <span style={{ fontSize: '1.3rem' }} aria-hidden="true">🌿</span>
        <span>{t.enterCalmMode || 'Enter Calm Mode — Breathing & Rest'}</span>
      </button>

      {/* ── Switch Profile ─────────────────────────────────── */}
      <button
        type="button"
        onClick={goToRoleSelect}
        className="switch-profile-btn"
        aria-label="Switch profile or sign out"
        style={{
          position: 'relative',
          zIndex: 200,
          width: '100%',
          minHeight: '52px',
          padding: '14px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-surface)',
          border: '1.5px solid var(--color-border)',
          color: 'var(--color-text-muted)',
          fontWeight: 700,
          fontSize: 'calc(1rem * var(--font-scale))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer',
          pointerEvents: 'auto',
          fontFamily: 'inherit',
          transition: 'all 0.18s ease',
        }}
      >
        <LogOut size={18} aria-hidden="true" />
        <span>{t.switchProfile || 'Switch Profile / Sign Out'}</span>
      </button>

      {/* Floating Helpers */}
      <PatientSosButton />
      <ConfusionHelpButton />
    </div>
  );
}
