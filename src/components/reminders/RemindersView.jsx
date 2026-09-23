import React from 'react';
import { Bell, CheckCircle2, Clock, Calendar, Droplets, Pill, RefreshCw, Zap, Volume2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useReminders } from '../../context/ReminderContext';
import { useSpeechContext } from '../../context/SpeechContext';
import { translations } from '../../locales/translations';
import TremorButton from '../common/TremorButton';
import EscalationOverlay from './EscalationOverlay';
import { sounds } from '../../services/soundEffects';

export default function RemindersView() {
  const { currentUser } = useApp();
  const lang = currentUser.language || 'en-IN';
  const t = translations[lang] || translations['en-IN'];
  const { speak } = useSpeechContext();

  const {
    reminders,
    escalations,
    markAsDone,
    resetReminders,
    demoAcceleration,
    setDemoAcceleration,
    triggerDemoCheck
  } = useReminders();

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      {/* Tier 1 & Tier 2 Overlays */}
      <EscalationOverlay />

      {/* Header Bar */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="cultural-header-badge" style={{ marginBottom: '10px' }}>
          <Bell size={16} />
          <span>Care Schedule & Wellness</span>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-xxl)', color: 'var(--color-primary)', marginBottom: '8px' }}>
          {t.remindersTitle}
        </h1>
        <p style={{ fontSize: 'var(--font-size-large)', color: 'var(--color-text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
          {t.remindersSubtitle}
        </p>
      </div>

      {/* Demo Escalation Accelerator Control Box */}
      <div
        className="card"
        style={{
          background: demoAcceleration ? '#FEF3C7' : 'var(--color-surface-warm)',
          borderColor: demoAcceleration ? '#F59E0B' : '#DECBB1',
          padding: '16px 22px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap size={24} color={demoAcceleration ? '#B45309' : 'var(--color-primary)'} />
          <div>
            <div style={{ fontSize: 'var(--font-size-large)', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {t.simulateEscalation || 'Simulate Alert Escalation Engine (Demo Accelerator)'}
            </div>
            <div style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
              {demoAcceleration
                ? '⚡ Fast Demo Mode: T1 (0s) -> T2 (15s) -> T3 Caregiver Alert (40s)'
                : 'Standard Medical Timing: T1 (Scheduled) -> T2 (+30m) -> T3 Caregiver Alert (+60m)'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => {
              const next = !demoAcceleration;
              setDemoAcceleration(next);
              if (next) triggerDemoCheck();
            }}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              border: '2px solid',
              borderColor: demoAcceleration ? '#B45309' : '#DECBB1',
              background: demoAcceleration ? '#D97706' : 'var(--color-surface)',
              color: demoAcceleration ? '#FFFFFF' : 'var(--color-text-primary)',
              fontWeight: 800,
              fontSize: 'calc(0.9375rem * var(--font-scale))',
              cursor: 'pointer'
            }}
          >
            {demoAcceleration ? 'Active (Fast 40s Tiers)' : 'Turn On Fast Demo'}
          </button>

          <button
            type="button"
            onClick={resetReminders}
            title="Reset All Reminders"
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid #DECBB1',
              background: 'var(--color-surface)',
              cursor: 'pointer',
              color: 'var(--color-text-secondary)'
            }}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Reminders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {reminders.map((rem) => {
          const esc = escalations[rem.id];
          const isDone = rem.done;
          const isTier1 = esc && esc.tier === 1;
          const isTier2 = esc && esc.tier === 2;
          const isTier3 = esc && esc.tier === 3;

          let cardBorder = '2px solid #DECBB1';
          let cardBg = 'var(--color-surface)';
          let badgeText = t.statusPending;
          let badgeBg = 'var(--color-surface-warm)';
          let badgeColor = 'var(--color-text-secondary)';

          if (isDone) {
            cardBorder = '2px solid #10B981';
            cardBg = '#F0FDF4';
            badgeText = `✓ ${t.statusDone} (${rem.doneTimestamp || 'Today'})`;
            badgeBg = '#DCFCE7';
            badgeColor = '#166534';
          } else if (isTier3) {
            cardBorder = '3px solid var(--color-alert)';
            cardBg = '#FEF2F2';
            badgeText = `⚠️ Tier 3 Overdue (${esc.overdueMinutes || 60}m)`;
            badgeBg = '#FEE2E2';
            badgeColor = '#991B1B';
          } else if (isTier2) {
            cardBorder = '3px solid var(--color-warning)';
            cardBg = '#FFFBEB';
            badgeText = `⏰ Tier 2 Escalated (${esc.overdueMinutes || 30}m)`;
            badgeBg = '#FEF3C7';
            badgeColor = '#B45309';
          } else if (isTier1) {
            cardBorder = '2px solid var(--color-primary)';
            badgeText = `🌸 Tier 1 Gentle Nudge`;
            badgeBg = 'var(--color-primary-light)';
            badgeColor = 'var(--color-primary)';
          }

          const remTitle = rem.title[lang] || rem.title['en-IN'];

          return (
            <div
              key={rem.id}
              className="card"
              style={{
                border: cardBorder,
                background: cardBg,
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: '280px' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'calc(2.375rem * var(--font-scale))',
                    border: '2px solid #DECBB1',
                    flexShrink: 0
                  }}
                >
                  {rem.icon}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontSize: 'calc(0.8125rem * var(--font-scale))',
                        fontWeight: 800,
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        background: badgeBg,
                        color: badgeColor,
                        textTransform: 'uppercase'
                      }}
                    >
                      {badgeText}
                    </span>

                    <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={16} />
                      <strong>{rem.time}</strong>
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1.25 }}>
                    {remTitle}
                  </h2>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => speak(`${remTitle}. Scheduled for ${rem.time}.`)}
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid #DECBB1',
                    background: 'var(--color-surface)',
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Read aloud"
                  aria-label={`Read ${remTitle} aloud`}
                >
                  <Volume2 size={24} />
                </button>

                {isDone ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      background: '#DCFCE7',
                      color: '#15803D',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 800,
                      fontSize: 'calc(1.125rem * var(--font-scale))',
                      border: '2px solid #86EFAC'
                    }}
                  >
                    <CheckCircle2 size={24} />
                    <span>{t.completed}</span>
                  </div>
                ) : (
                  <TremorButton
                    variant={isTier3 ? 'alert' : isTier2 ? 'warning' : 'primary'}
                    onClick={() => markAsDone(rem.id)}
                    style={{ minHeight: '60px', padding: '14px 28px', fontSize: 'calc(1.25rem * var(--font-scale))' }}
                  >
                    <CheckCircle2 size={24} />
                    <span>{t.markDone}</span>
                  </TremorButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
