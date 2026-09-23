import React, { useState } from 'react';
import { User, Shield, Heart, CheckCircle2, ArrowRight, ArrowLeft, Palette } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES, translations } from '../../locales/translations';
import TremorButton from '../common/TremorButton';
import EverMindLogo from '../common/EverMindLogo';
import ThemeSelector from '../common/ThemeSelector';

export default function LoginView() {
  const { loginUser, cancelSwitch, currentUser, language, changeLanguage, t } = useApp();

  const [role, setRole] = useState(currentUser?.role || 'patient');
  const [name, setName] = useState(currentUser?.name || (currentUser?.role === 'caregiver' ? 'Debojit Sharma' : 'Shanti Devi'));
  const [age, setAge] = useState(currentUser?.age || 74);

  const handleSelectLanguage = (code) => {
    changeLanguage(code);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    loginUser({
      role,
      name: name.trim() || (role === 'patient' ? (language === 'hi-IN' ? 'आदरणीय सदस्य' : 'Beloved Elder') : 'Caregiver'),
      age: Number(age) || 74,
      language
    });
  };

  const setQuickProfile = (profile) => {
    setRole(profile.role);
    setName(profile.name);
    setAge(profile.age);
    changeLanguage(profile.language);
  };

  return (
    <div style={{ maxWidth: '720px', margin: '30px auto', padding: '0 16px' }}>
      <div className="card muga-border" style={{ padding: '36px 28px' }}>
        {/* Cultural Hero Banner */}
        <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '24px', border: '2px solid #DECBB1', boxShadow: 'var(--shadow-sm)' }}>
          <img
            src="/hero-banner.jpg"
            alt="Elders enjoying peaceful morning tea overlooking rolling green tea gardens"
            style={{ width: '100%', height: '210px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Brand Header with EverMind Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
            <EverMindLogo size={64} />
          </div>
          <h1 style={{ fontSize: 'var(--font-size-xxl)', color: 'var(--color-primary)', marginBottom: '6px', letterSpacing: '-0.02em' }}>
            Evermind
          </h1>
          <div className="cultural-header-badge" style={{ marginBottom: '12px' }}>
            <Heart size={16} fill="currentColor" />
            <span>Always with you.</span>
          </div>
          <p style={{ fontSize: 'var(--font-size-large)', color: 'var(--color-text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
            {t.welcomeGreeting}
          </p>
        </div>

        {/* Color Theme Selector on Login Screen */}
        <div style={{ background: 'var(--color-surface-warm)', padding: '16px 20px', borderRadius: 'var(--radius-md)', marginBottom: '28px', border: '1.5px solid #DECBB1' }}>
          <ThemeSelector />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Role Picker */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: 'var(--font-size-large)', fontWeight: 800, marginBottom: '12px', color: 'var(--color-text-primary)' }}>
              {t.selectRole}
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <button
                type="button"
                onClick={() => setRole('patient')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '20px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: role === 'patient' ? '4px solid var(--color-primary)' : '2px solid #DECBB1',
                  background: role === 'patient' ? 'var(--color-primary-light)' : 'var(--color-surface)',
                  cursor: 'pointer',
                  minHeight: '100px'
                }}
              >
                <User size={32} color={role === 'patient' ? 'var(--color-primary)' : 'var(--color-text-secondary)'} />
                <span style={{ fontSize: 'var(--font-size-large)', fontWeight: 800, color: role === 'patient' ? 'var(--color-primary)' : 'var(--color-text-primary)' }}>
                  {t.rolePatient}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRole('caregiver')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '20px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: role === 'caregiver' ? '4px solid var(--color-secondary)' : '2px solid #DECBB1',
                  background: role === 'caregiver' ? 'var(--color-secondary-light)' : 'var(--color-surface)',
                  cursor: 'pointer',
                  minHeight: '100px'
                }}
              >
                <Shield size={32} color={role === 'caregiver' ? 'var(--color-secondary)' : 'var(--color-text-secondary)'} />
                <span style={{ fontSize: 'var(--font-size-large)', fontWeight: 800, color: role === 'caregiver' ? 'var(--color-secondary)' : 'var(--color-text-primary)' }}>
                  {t.roleCaregiver}
                </span>
              </button>
            </div>
          </div>

          {/* Name & Age Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '26px' }}>
            <div>
              <label htmlFor="login-name" style={{ display: 'block', fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: '8px' }}>
                {role === 'patient' ? t.patientNameLabel : t.caregiverNameLabel}
              </label>
              <input
                id="login-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  height: '54px',
                  padding: '12px 16px',
                  fontSize: 'var(--font-size-base)',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid #DECBB1',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label htmlFor="login-age" style={{ display: 'block', fontSize: 'var(--font-size-base)', fontWeight: 700, marginBottom: '8px' }}>
                {t.ageLabel}
              </label>
              <input
                id="login-age"
                type="number"
                min="45"
                max="115"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{
                  width: '100%',
                  height: '54px',
                  padding: '12px 16px',
                  fontSize: 'var(--font-size-base)',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid #DECBB1',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* 5 Languages Picker (including Hindi) */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', fontSize: 'var(--font-size-large)', fontWeight: 800, marginBottom: '12px' }}>
              {t.preferredLanguage}
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {Object.entries(LANGUAGES).map(([code, item]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelectLanguage(code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: language === code ? '3px solid var(--color-primary)' : '2px solid #E5DEC9',
                    background: language === code ? 'var(--color-primary-light)' : 'var(--color-surface)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                      {item.native}
                    </div>
                    <div style={{ fontSize: 'calc(0.75rem * var(--font-scale))', color: 'var(--color-text-secondary)' }}>
                      {item.label}
                    </div>
                  </div>
                  {language === code && <CheckCircle2 size={22} color="var(--color-primary)" />}
                </button>
              ))}
            </div>
          </div>

          {/* Start Session Action */}
          <TremorButton
            type="submit"
            variant="primary"
            size="large"
            className="w-full"
            style={{ width: '100%' }}
          >
            <span>{t.enterApp}</span>
            <ArrowRight size={24} />
          </TremorButton>
        </form>

        {/* Quick Demo Pre-fills */}
        <div style={{ marginTop: '26px', paddingTop: '18px', borderTop: '2px dashed #E2D9C8' }}>
          <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '10px' }}>
            💡 Quick Demo Profiles:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setQuickProfile({ role: 'patient', name: 'शांति देवी (Shanti)', age: 74, language: 'hi-IN' })}
              style={{
                fontSize: 'var(--font-size-base)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid #D6CEBE',
                background: 'var(--color-surface-warm)',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              हिन्दी (Shanti Devi, 74)
            </button>

            <button
              type="button"
              onClick={() => setQuickProfile({ role: 'patient', name: 'Bhaben Phukan', age: 76, language: 'as-IN' })}
              style={{
                fontSize: 'var(--font-size-base)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid #D6CEBE',
                background: 'var(--color-surface-warm)',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              অসমীয়া (Bhaben, 76)
            </button>

            <button
              type="button"
              onClick={() => setQuickProfile({ role: 'patient', name: 'Ibemhal Devi', age: 72, language: 'mni-IN' })}
              style={{
                fontSize: 'var(--font-size-base)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid #D6CEBE',
                background: 'var(--color-surface-warm)',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              ꯃꯤꯇꯩꯂꯣꯟ (Ibemhal, 72)
            </button>

            <button
              type="button"
              onClick={() => setQuickProfile({ role: 'caregiver', name: 'Debojit Sharma', age: 46, language: 'en-IN' })}
              style={{
                fontSize: 'var(--font-size-base)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid #D6CEBE',
                background: 'var(--color-surface-warm)',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              Caregiver (Debojit)
            </button>
          </div>
        </div>

        {/* FIX 4: Cancel Button — only show if active session exists */}
        {(() => {
          const hasActiveSession = typeof window !== 'undefined' && !!localStorage.getItem('evermind-active-role');
          return hasActiveSession ? (
            <button
              type="button"
              onClick={cancelSwitch}
              style={{
                display: 'block',
                width: '100%',
                marginTop: 24,
                padding: '16px',
                background: 'transparent',
                border: '2px solid var(--color-muted, #786C60)',
                borderRadius: 12,
                color: 'var(--color-muted, #786C60)',
                fontSize: 'calc(1rem * var(--font-scale))',
                cursor: 'pointer',
                minHeight: 56,
                fontWeight: 700
              }}
            >
              ← Cancel — Go Back
            </button>
          ) : null;
        })()}
      </div>
    </div>
  );
}
