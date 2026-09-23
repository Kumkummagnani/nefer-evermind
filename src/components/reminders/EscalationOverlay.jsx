import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Volume2 } from 'lucide-react';
import { useReminders } from '../../context/ReminderContext';
import { useSpeechContext } from '../../context/SpeechContext';
import TremorButton from '../common/TremorButton';
import { sounds } from '../../services/soundEffects';

export default function EscalationOverlay() {
  const { activeTierAlert, setActiveTierAlert, markAsDone } = useReminders();
  const { speak } = useSpeechContext();

  if (!activeTierAlert) return null;

  const isTier2 = activeTierAlert.tier === 2;

  const handleDone = () => {
    sounds.playSuccess();
    markAsDone(activeTierAlert.reminderId);
  };

  const handleDismissGentle = () => {
    sounds.playTap();
    setActiveTierAlert(null);
  };

  return (
    <div className="escalation-overlay" role="dialog" aria-modal="true" aria-label="Reminder alert">
      <div className={isTier2 ? 'escalation-card-tier2' : 'escalation-card-tier1'}>
        {/* Visual Icon Badge */}
        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: isTier2 ? 'var(--color-warning-light)' : 'var(--color-primary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            border: isTier2 ? '3px solid var(--color-warning)' : '3px solid var(--color-primary)',
            fontSize: 'calc(3rem * var(--font-scale))'
          }}
        >
          {activeTierAlert.icon || (isTier2 ? <AlertTriangle size={52} color="var(--color-warning)" /> : <Bell size={52} color="var(--color-primary)" />)}
        </div>

        {/* Header Title */}
        <h2
          style={{
            fontSize: isTier2 ? '32px' : '28px',
            fontWeight: 800,
            color: isTier2 ? '#92400E' : 'var(--color-primary)',
            marginBottom: '14px'
          }}
        >
          {isTier2 ? 'Friendly Care Reminder ⏰' : 'Gentle Daily Nudge 🌸'}
        </h2>

        {/* Message */}
        <p
          style={{
            fontSize: isTier2 ? '24px' : '22px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.5,
            marginBottom: '32px',
            padding: '0 12px'
          }}
        >
          {activeTierAlert.message}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
          <TremorButton
            variant={isTier2 ? 'warning' : 'primary'}
            size="large"
            onClick={handleDone}
            style={{ width: '100%', maxWidth: '420px', minHeight: '68px', fontSize: 'calc(1.5rem * var(--font-scale))' }}
          >
            <CheckCircle size={28} />
            <span>Mark as Completed Now</span>
          </TremorButton>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => speak(activeTierAlert.message)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid #DECBB1',
                background: 'var(--color-surface)',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontSize: 'calc(1rem * var(--font-scale))',
                fontWeight: 600
              }}
            >
              <Volume2 size={18} />
              <span>Read Aloud</span>
            </button>

            <button
              type="button"
              onClick={handleDismissGentle}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid transparent',
                background: 'transparent',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontSize: 'calc(1rem * var(--font-scale))',
                fontWeight: 600
              }}
            >
              I will do it in a moment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
