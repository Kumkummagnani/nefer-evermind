import React, { useEffect, useState } from 'react';
import { PhoneCall, AlertTriangle, X, Check, BellRing, Ambulance, ShieldAlert, Stethoscope } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../services/soundEffects';

export default function PatientSosButton() {
  const {
    currentUser,
    emergencyContact,
    clinicalProfile,
    isSosModalOpen,
    openSosModal,
    closeSosModal,
    triggerSosEmergency,
    t
  } = useApp();

  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [autoDialSeconds, setAutoDialSeconds] = useState(5);
  const currentTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const dial = (phone) => {
    const clean = String(phone).replace(/[^0-9+]/g, '');
    if (clean) window.location.href = `tel:${clean}`;
  };

  // Auto-dial the primary family contact after a short countdown. A patient in
  // acute confusion may not manage another tap; the phone must ring itself.
  useEffect(() => {
    if (!hasConfirmed) return;
    if (autoDialSeconds <= 0) {
      dial(emergencyContact.phone);
      return;
    }
    const timer = setTimeout(() => setAutoDialSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [hasConfirmed, autoDialSeconds, emergencyContact.phone]);

  // SOS is strictly for patients
  if (currentUser.role === 'caregiver') return null;

  const handleConfirmYes = () => {
    setHasConfirmed(true);
    setAutoDialSeconds(5);
    triggerSosEmergency();
  };

  const handleCancel = () => {
    sounds.playTap();
    setHasConfirmed(false);
    closeSosModal();
  };

  return (
    <>
      {/* Pinned Large Red SOS Button — always visible on patient screens */}
      <button
        type="button"
        className="patient-sos-btn"
        onClick={openSosModal}
        aria-label="Emergency SOS — Call family for help"
        title="Emergency Help (SOS)"
      >
        <PhoneCall size={28} />
        <span>{t.sosButton || 'EMERGENCY SOS'}</span>
      </button>

      {/* Confirmation Modal */}
      {isSosModalOpen && (
        <div
          className="sos-modal-overlay"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="sos-title"
        >
          <div className="sos-modal-card">
            {!hasConfirmed ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '50%',
                      background: '#FEE2E2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid #DC2626'
                    }}
                  >
                    <AlertTriangle size={42} color="#DC2626" />
                  </div>
                </div>

                <h2
                  id="sos-title"
                  style={{
                    fontSize: 'clamp(26px, 3.8vw, 34px)',
                    fontWeight: 900,
                    color: '#DC2626',
                    marginBottom: '16px',
                    lineHeight: 1.2
                  }}
                >
                  {t.sosQuestion || 'Do you need help right now?'}
                </h2>

                <p style={{ fontSize: 'calc(1.125rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginBottom: '32px', lineHeight: 1.5 }}>
                  {emergencyContact.name} ({emergencyContact.phone})
                </p>

                {/* Big Action Buttons */}
                <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                  <button
                    type="button"
                    onClick={handleConfirmYes}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      borderRadius: 'var(--radius-md)',
                      background: '#DC2626',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: 'calc(1.375rem * var(--font-scale))',
                      fontWeight: 900,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      boxShadow: '0 6px 18px rgba(220, 38, 38, 0.4)'
                    }}
                  >
                    <Check size={32} />
                    <span>{t.sosYes || '🚨 YES, CALL FOR HELP'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    style={{
                      width: '100%',
                      padding: '16px 24px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-surface-warm)',
                      color: 'var(--color-text-primary)',
                      border: '2.5px solid #DECBB1',
                      fontSize: 'calc(1.25rem * var(--font-scale))',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                  >
                    <X size={24} />
                    <span>{t.sosCancel || 'No, I am okay 🌸'}</span>
                  </button>
                </div>
              </>
            ) : (
              /* Emergency Contact Active Calling Screen */
              <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '84px',
                      height: '84px',
                      borderRadius: '50%',
                      background: '#DC2626',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                      animation: 'sosPulse 1.6s infinite ease-in-out'
                    }}
                  >
                    <BellRing size={46} />
                  </div>
                </div>

                <div style={{ fontSize: 'calc(1.25rem * var(--font-scale))', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Emergency Alert Activated
                </div>

                <div
                  style={{
                    margin: '24px 0',
                    padding: '24px 18px',
                    background: '#FEF2F2',
                    border: '3px solid #DC2626',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{ fontSize: 'calc(1.125rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
                    Calling Family Emergency Contact {autoDialSeconds > 0 ? `in ${autoDialSeconds}s...` : '(dialing now)'}:
                  </div>

                  {/* HUGE Text for easy readability by elder */}
                  <div style={{ fontSize: 'calc(2.25rem * var(--font-scale))', fontWeight: 900, color: '#991B1B', lineHeight: 1.2 }}>
                    {emergencyContact.name}
                  </div>

                  <a
                    href={`tel:${emergencyContact.phone.replace(/[^0-9+]/g, '')}`}
                    onClick={(e) => { e.preventDefault(); dial(emergencyContact.phone); }}
                    style={{
                      display: 'inline-block',
                      fontSize: 'calc(2.125rem * var(--font-scale))',
                      fontWeight: 900,
                      color: '#DC2626',
                      marginTop: '12px',
                      textDecoration: 'underline'
                    }}
                  >
                    {emergencyContact.phone}
                  </a>

                  <div style={{ fontSize: 'calc(1rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
                    ({emergencyContact.relation || 'Family Contact'})
                  </div>
                </div>

                {/* Patient Summary Card */}
                <div
                  style={{
                    background: 'var(--color-surface-warm)',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid #DECBB1',
                    marginBottom: '26px',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ fontSize: 'calc(1.125rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                    Patient: {currentUser.name}
                  </div>
                  <div style={{ fontSize: 'calc(1rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                    Time: {currentTimeStr} · Status: <strong>"I need help right now"</strong>
                  </div>
                </div>

                {/* One-tap emergency services — no reading required */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '26px' }}>
                  {[
                    { label: 'Doctor', sub: clinicalProfile?.doctorName?.split(',')[0] || 'Doctor', icon: Stethoscope, phone: clinicalProfile?.doctorPhone, bg: '#EEF2FF', color: '#4338CA' },
                    { label: 'Ambulance', sub: '102', icon: Ambulance, phone: '102', bg: '#FEF2F2', color: '#DC2626' },
                    { label: 'Emergency', sub: '112', icon: ShieldAlert, phone: '112', bg: '#FFFBEB', color: '#B45309' }
                  ].map((svc) => (
                    <button
                      key={svc.label}
                      type="button"
                      onClick={() => dial(svc.phone)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '14px 8px',
                        borderRadius: 'var(--radius-md)',
                        background: svc.bg,
                        color: svc.color,
                        border: `2px solid ${svc.color}`,
                        cursor: 'pointer',
                        fontWeight: 900,
                        fontSize: 'calc(1.125rem * var(--font-scale))'
                      }}
                    >
                      <svc.icon size={28} />
                      <span>{svc.label}</span>
                      <span style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', fontWeight: 700, opacity: 0.85 }}>{svc.sub}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text-primary)',
                    border: '2px solid #DECBB1',
                    fontSize: 'calc(1.125rem * var(--font-scale))',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Close Emergency Screen
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
