import React from 'react';
import { Bell, CheckCircle2, Clock, Volume2, RefreshCw, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useReminders } from '../../context/ReminderContext';
import { useSpeechContext } from '../../context/SpeechContext';
import { translations } from '../../locales/translations';
import TremorButton from '../common/TremorButton';
import EscalationOverlay from './EscalationOverlay';

export default function RemindersView({ showDemoControls = false }) {
  const { currentUser, activeRole } = useApp();
  const lang = currentUser?.language || 'en-IN';
  const t = translations[lang] || translations['en-IN'];
  const { speak } = useSpeechContext();

  const {
    reminders,
    escalations,
    markAsDone,
    resetReminders,
    demoAcceleration,
    setDemoAcceleration,
    triggerDemoCheck,
  } = useReminders();

  // Demo controls are only shown in the dedicated Reminders screen (not on home),
  // and only when explicitly requested (e.g., caregiver mode or dev mode).
  const canShowDemoControls = showDemoControls && activeRole === 'caregiver';

  return (
    <div>
      {/* Tier 1 & Tier 2 Overlays */}
      <EscalationOverlay />

      {/* ── Header ───────────────────────────────────────── */}
      <div style={{ marginBottom: '20px' }}>
        <div className="section-pill">
          <Bell size={14} aria-hidden="true" />
          <span>{t.remindersPill || 'Care Reminders'}</span>
        </div>
        <h1 style={{
          fontSize: 'calc(1.75rem * var(--font-scale))',
          fontWeight: 900,
          color: 'var(--color-text-primary)',
          margin: '0 0 6px 0',
          lineHeight: 1.2,
        }}>
          {t.remindersTitle || "Today's Reminders"}
        </h1>
        <p style={{
          fontSize: 'calc(0.9375rem * var(--font-scale))',
          color: 'var(--color-text-secondary)',
          margin: 0,
          lineHeight: 1.55,
        }}>
          {t.remindersSubtitle || 'Your medicines and important tasks for today.'}
        </p>
      </div>

      {/* ── Developer Demo Controls (hidden from patients) ─ */}
      {canShowDemoControls && (
        <div
          className="card"
          style={{
            background: demoAcceleration ? 'var(--color-warning-light)' : 'var(--color-surface-warm)',
            borderColor: demoAcceleration ? 'var(--color-warning-border)' : 'var(--color-border)',
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={20} color={demoAcceleration ? 'var(--color-warning)' : 'var(--color-primary)'} aria-hidden="true" />
            <div>
              <div style={{ fontSize: 'calc(0.875rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                Demo Escalation Simulator
              </div>
              <div style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', color: 'var(--color-text-secondary)' }}>
                {demoAcceleration
                  ? '⚡ Fast: T1 (0s) → T2 (15s) → T3 (40s)'
                  : 'Standard timing: T1 → +30m → +60m'}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => {
                const next = !demoAcceleration;
                setDemoAcceleration(next);
                if (next) triggerDemoCheck();
              }}
              style={{
                padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid',
                borderColor: demoAcceleration ? 'var(--color-warning)' : 'var(--color-border)',
                background: demoAcceleration ? 'var(--color-warning)' : 'var(--color-surface)',
                color: demoAcceleration ? '#FFFFFF' : 'var(--color-text-primary)',
                fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 'calc(0.875rem * var(--font-scale))',
              }}
            >
              {demoAcceleration ? 'Fast Mode ON' : 'Enable Fast Mode'}
            </button>
            <button
              type="button"
              onClick={resetReminders}
              title="Reset all reminders"
              aria-label="Reset all reminders"
              style={{
                padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-border)',
                background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-text-secondary)',
                display: 'flex', alignItems: 'center',
              }}
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Reminder Cards ────────────────────────────────── */}
      {reminders.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon">🎉</span>
          <div className="empty-state-title">{t.noReminders || 'No reminders yet!'}</div>
          <p className="empty-state-desc">{t.noRemindersDesc || 'Your caregiver will add reminders here.'}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {reminders.map(rem => {
            const esc = escalations[rem.id];
            const isDone   = rem.done;
            const isTier1  = esc && esc.tier === 1;
            const isTier2  = esc && esc.tier === 2;
            const isTier3  = esc && esc.tier === 3;

            let cardClass = 'reminder-card';
            let badgeClass = 'status-badge';
            let badgeText = t.statusPending || 'Pending';

            if (isDone) {
              cardClass += ' done';
              badgeClass += ' status-badge-done';
              badgeText = `✓ ${t.statusDone || 'Done'}`;
            } else if (isTier3) {
              cardClass += ' tier-3';
              badgeClass += ' status-badge-error';
              badgeText = `⚠ Overdue (${esc.overdueMinutes || 60} min)`;
            } else if (isTier2) {
              cardClass += ' tier-2';
              badgeClass += ' status-badge-warning';
              badgeText = `⏰ Missed (${esc.overdueMinutes || 30} min)`;
            } else if (isTier1) {
              cardClass += ' tier-1';
              badgeClass += ' status-badge-primary';
              badgeText = `🌸 Gentle Reminder`;
            } else {
              badgeClass += ' status-badge-pending';
            }

            const remTitle = rem.title[lang] || rem.title['en-IN'];

            return (
              <div
                key={rem.id}
                className={cardClass}
                style={{ flexWrap: 'wrap', gap: '16px' }}
              >
                {/* Icon */}
                <div className="reminder-icon" aria-hidden="true">
                  {rem.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: '200px' }}>
                  {/* Badge + Time row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span className={badgeClass}>{badgeText}</span>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: 'calc(0.9375rem * var(--font-scale))',
                      fontWeight: 700,
                      color: 'var(--color-text-secondary)',
                    }}>
                      <Clock size={15} aria-hidden="true" />
                      <span aria-label={`Scheduled for ${rem.time}`}>{rem.time}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontSize: 'calc(1.25rem * var(--font-scale))',
                    fontWeight: 800,
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.25,
                    margin: 0,
                  }}>
                    {remTitle}
                  </h2>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  {/* Read aloud */}
                  <button
                    type="button"
                    onClick={() => speak(`${remTitle}. Scheduled for ${rem.time}.`)}
                    aria-label={`Read ${remTitle} aloud`}
                    title="Read aloud"
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--color-border)',
                      background: 'var(--color-surface)',
                      color: 'var(--color-text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                  >
                    <Volume2 size={22} />
                  </button>

                  {/* Mark done / done badge */}
                  {isDone ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 20px',
                      background: 'var(--color-success-light)',
                      color: 'var(--color-success)',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 800,
                      fontSize: 'calc(1rem * var(--font-scale))',
                      border: '1.5px solid var(--color-success-border)',
                      minHeight: '52px',
                    }}>
                      <CheckCircle2 size={20} aria-hidden="true" />
                      <span>{t.completed || 'Done'}</span>
                    </div>
                  ) : (
                    <TremorButton
                      variant={isTier3 ? 'alert' : isTier2 ? 'warning' : 'primary'}
                      onClick={() => markAsDone(rem.id)}
                      style={{ minHeight: '52px', padding: '10px 22px', fontSize: 'calc(1.0625rem * var(--font-scale))' }}
                      ariaLabel={`Mark ${remTitle} as done`}
                    >
                      <CheckCircle2 size={20} aria-hidden="true" />
                      <span>{t.markDone || 'Mark Done'}</span>
                    </TremorButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Encouragement */}
      {reminders.length > 0 && reminders.every(r => r.done) && (
        <div style={{
          marginTop: '24px',
          padding: '20px',
          background: 'var(--color-success-light)',
          border: '1.5px solid var(--color-success-border)',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }} aria-hidden="true">🌟</div>
          <h2 style={{ fontSize: 'calc(1.2rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-success)', margin: '0 0 4px' }}>
            {t.allDone || 'Wonderful!'}
          </h2>
          <p style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', color: 'var(--color-success)', margin: 0 }}>
            {t.allDoneMessage || "You've completed all your reminders for today. You're doing great!"}
          </p>
        </div>
      )}
    </div>
  );
}
