import React, { useState } from 'react';
import { User, Phone, Globe, Type, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../locales/translations';
import { applyFontScale } from '../../fontScale';
import PatientSosButton from '../common/PatientSosButton';
import ConfusionHelpButton from '../common/ConfusionHelpButton';

export default function ProfileScreen() {
  const {
    patientData = {},
    caregiverData = {},
    language,
    changeLanguage,
    goToRoleSelect,
    t = {},
    clinicalProfile = {}
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

  const patientName = patientData?.name || 'Shanti Devi';
  const patientAge = patientData?.age || 74;
  const emergencyPhone = clinicalProfile?.doctorPhone || '+91 98765 43210';
  const caregiverName = caregiverData?.name || 'Debojit Sharma';

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'var(--color-primary-light)',
            margin: '0 auto 12px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid var(--color-primary)'
          }}
        >
          <User size={36} color="var(--color-primary)" />
        </div>
        <h1 style={{ fontSize: 'calc(1.8rem * var(--font-scale))', color: 'var(--color-primary)', margin: '0 0 4px 0' }}>
          {patientName}
        </h1>
        <p style={{ fontSize: 'calc(0.95rem * var(--font-scale))', color: 'var(--color-muted)', margin: 0 }}>
          Patient Profile • Age {patientAge}
        </p>
      </div>

      {/* Text Size (A · AA · AAA) */}
      <div className="card" style={{ marginBottom: '18px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Type size={20} color="var(--color-primary)" />
          <h2 style={{ fontSize: 'calc(1.15rem * var(--font-scale))', margin: 0, color: 'var(--color-text)' }}>
            {t.textSizeLabel || 'Text Size'}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {['A', 'AA', 'AAA'].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => handleSize(size)}
              style={{
                flex: 1,
                minHeight: '52px',
                borderRadius: 10,
                border: activeSize === size ? '3px solid var(--color-primary)' : '2px solid #DECBB1',
                background: activeSize === size ? 'var(--color-primary)' : 'var(--color-surface)',
                color: activeSize === size ? '#FFFFFF' : 'var(--color-primary)',
                fontWeight: 900,
                fontSize: size === 'A' ? '1rem' : size === 'AA' ? '1.2rem' : '1.4rem',
                cursor: 'pointer'
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Language Switcher */}
      <div className="card" style={{ marginBottom: '18px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Globe size={20} color="var(--color-primary)" />
          <h2 style={{ fontSize: 'calc(1.15rem * var(--font-scale))', margin: 0, color: 'var(--color-text)' }}>
            {t.preferredLanguage || 'Preferred Language'}
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Object.entries(LANGUAGES).map(([code, item]) => (
            <button
              key={code}
              type="button"
              onClick={() => changeLanguage(code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 10,
                border: language === code ? '2px solid var(--color-primary)' : '1px solid #DECBB1',
                background: language === code ? 'var(--color-primary-light)' : 'var(--color-surface)',
                color: 'var(--color-text)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>{item.native}</span>
              <span style={{ fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-muted)' }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Family / Emergency Contact */}
      <div className="card" style={{ marginBottom: '24px', padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Phone size={20} color="var(--color-primary)" />
          <h2 style={{ fontSize: 'calc(1.15rem * var(--font-scale))', margin: 0, color: 'var(--color-text)' }}>
            Primary Caregiver & Help
          </h2>
        </div>
        <div style={{ fontSize: 'calc(1.05rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text)' }}>
          {caregiverName} (Family)
        </div>
        <div style={{ fontSize: 'calc(0.95rem * var(--font-scale))', color: 'var(--color-primary)', fontWeight: 700, marginTop: '2px' }}>
          📞 {emergencyPhone}
        </div>
      </div>

      {/* Prominent Switch Profile Button (relative, z-index: 200) */}
      <button
        type="button"
        onClick={goToRoleSelect}
        className="switch-profile-btn"
        aria-label="Switch Profile or Log Out"
        style={{
          position: 'relative',
          zIndex: 200,
          width: '100%',
          minHeight: '56px',
          padding: '16px',
          borderRadius: 14,
          background: 'var(--color-surface)',
          border: '2px solid var(--color-primary)',
          color: 'var(--color-primary)',
          fontWeight: 800,
          fontSize: 'calc(1.1rem * var(--font-scale))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: 'pointer',
          pointerEvents: 'auto',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <LogOut size={20} />
        <span>Switch Profile / Log Out</span>
      </button>

      {/* Floating Helpers */}
      <PatientSosButton />
      <ConfusionHelpButton />
    </div>
  );
}
