import React from 'react';
import { AlertOctagon, CheckCircle2, Phone, BellRing } from 'lucide-react';
import { useReminders } from '../../context/ReminderContext';
import TremorButton from '../common/TremorButton';
import { sounds } from '../../services/soundEffects';

export default function CaregiverAlertModal() {
  const remindersContext = useReminders() || {};
  const caregiverModalAlert = remindersContext.caregiverModalAlert;
  const acknowledgeTier3Alert = remindersContext.acknowledgeTier3Alert || (() => {});

  if (!caregiverModalAlert) return null;

  const handleAcknowledge = () => {
    sounds.playTap();
    acknowledgeTier3Alert(caregiverModalAlert.reminderId);
  };

  return (
    <div className="escalation-overlay" style={{ zIndex: 1200 }} role="alertdialog" aria-modal="true">
      <div
        className="card"
        style={{
          maxWidth: '620px',
          width: '100%',
          padding: '36px 30px',
          border: '5px solid var(--color-alert)',
          background: '#FFF8F8',
          boxShadow: '0 25px 60px rgba(220, 38, 38, 0.4)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              background: '#FEE2E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              border: '3px solid var(--color-alert)'
            }}
          >
            <AlertOctagon size={48} color="var(--color-alert)" />
          </div>

          <h2 style={{ fontSize: 'calc(1.875rem * var(--font-scale))', color: 'var(--color-alert)', fontWeight: 800 }}>
            ⚠️ Urgent Caregiver Escalation Alert
          </h2>
          <span style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', fontWeight: 700, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Tier 3: Overdue &gt; 60 Minutes
          </span>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            padding: '20px 24px',
            borderRadius: 'var(--radius-md)',
            border: '2px solid #FCA5A5',
            marginBottom: '26px'
          }}
        >
          <p style={{ fontSize: 'calc(1.3125rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
            <strong>{caregiverModalAlert.patientName}</strong> has not completed:{' '}
            <span style={{ color: 'var(--color-alert)' }}>{caregiverModalAlert.reminderTitle}</span>
          </p>

          <div style={{ marginTop: '12px', display: 'flex', gap: '20px', fontSize: 'calc(1rem * var(--font-scale))', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
            <span>Scheduled: <strong>{caregiverModalAlert.scheduledTime}</strong></span>
            <span>Overdue: <strong style={{ color: 'var(--color-alert)' }}>{caregiverModalAlert.overdueMinutes} minutes</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <TremorButton
            variant="alert"
            size="large"
            onClick={handleAcknowledge}
            style={{ width: '100%', minHeight: '64px', fontSize: 'calc(1.3125rem * var(--font-scale))' }}
          >
            <CheckCircle2 size={24} />
            <span>I Have Checked on the Patient</span>
          </TremorButton>

          <a
            href="tel:+919864044321"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '14px',
              background: 'var(--color-surface)',
              border: '2px solid #DECBB1',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-primary)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 'calc(1.0625rem * var(--font-scale))'
            }}
          >
            <Phone size={20} color="var(--color-secondary)" />
            <span>Call Attending Physician / Son (+91 98640 44321)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
