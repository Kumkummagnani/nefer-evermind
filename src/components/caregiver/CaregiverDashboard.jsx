import React from 'react';
import {
  Shield, User, Award, Activity, AlertTriangle, Phone,
  Stethoscope, Clock, CheckCircle2, FileText, Calendar, Pill
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useReminders } from '../../context/ReminderContext';
import { translations } from '../../locales/translations';
import EmergencyLanguageSwitch from './EmergencyLanguageSwitch';
import CaregiverAlertModal from './CaregiverAlertModal';
import TremorButton from '../common/TremorButton';

export default function CaregiverDashboard() {
  const { currentUser = {}, gameScores = [], clinicalProfile = {} } = useApp();
  const safeProfile = {
    diagnosis: 'Mild Cognitive Impairment (Early Stage)',
    doctorName: 'Dr. Anita Sen, Neurologist',
    doctorPhone: '+91 98301 23456',
    emergencyContact: 'Debojit Sharma (Son) • +91 98765 43210',
    prescriptions: [
      { name: 'Donepezil 5mg', timing: '8:00 AM — Morning (With breakfast)' },
      { name: 'Memantine 10mg', timing: '8:00 PM — Night (After dinner)' }
    ],
    ...clinicalProfile
  };
  const safeScores = Array.isArray(gameScores) ? gameScores : [];
  const safeUser = { name: 'Shanti Devi', age: 74, language: 'en-IN', ...currentUser };
  const lang = safeUser.language || 'en-IN';
  const t = translations[lang] || translations['en-IN'];

  const { tier3ActiveAlerts, activityHistory, acknowledgeTier3Alert } = useReminders();

  // Weekly activity completion days
  const weekDays = [
    { day: 'Mon', completed: true, pct: 100 },
    { day: 'Tue', completed: true, pct: 90 },
    { day: 'Wed', completed: true, pct: 100 },
    { day: 'Thu', completed: true, pct: 85 },
    { day: 'Fri', completed: true, pct: 100 },
    { day: 'Sat', completed: true, pct: 95 },
    { day: 'Sun (Today)', completed: true, pct: 88 }
  ];

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      {/* Tier 3 Alert Modal if triggered */}
      <CaregiverAlertModal />

      {/* Top Header */}
      <div style={{ marginBottom: '28px', textAlign: 'center' }}>
        <div className="cultural-header-badge" style={{ marginBottom: '10px' }}>
          <Shield size={16} />
          <span>Caregiver Central Monitoring</span>
        </div>
        <h1 style={{ fontSize: 'calc(2.25rem * var(--font-scale))', color: 'var(--color-primary)', marginBottom: '6px' }}>
          {t.caregiverTitle}
        </h1>
        <p style={{ fontSize: 'calc(1.25rem * var(--font-scale))', color: 'var(--color-text-secondary)' }}>
          {t.caregiverSubtitle}
        </p>
      </div>

      {/* ADD-ON 3: Emergency Language Override Control */}
      <EmergencyLanguageSwitch />

      {/* Active Overdue Safety Alerts Section (ADD-ON 5 Tier 3) */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <h2 style={{ fontSize: 'calc(1.5rem * var(--font-scale))', color: 'var(--color-text-primary)' }}>
            {t.activeAlerts}
          </h2>
          {tier3ActiveAlerts.length > 0 ? (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#FEE2E2',
                color: '#DC2626',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 800,
                fontSize: 'calc(0.875rem * var(--font-scale))'
              }}
            >
              <span className="alert-dot-pulse" />
              <span>{tier3ActiveAlerts.length} Overdue</span>
            </span>
          ) : (
            <span
              style={{
                background: '#ECFDF5',
                color: '#065F46',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: 'calc(0.875rem * var(--font-scale))'
              }}
            >
              ✓ All Clear
            </span>
          )}
        </div>

        {tier3ActiveAlerts.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {tier3ActiveAlerts.map((alert) => (
              <div
                key={alert.reminderId}
                className="card"
                style={{
                  border: '3px solid var(--color-alert)',
                  background: '#FFF5F5',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: '#FEE2E2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid var(--color-alert)'
                    }}
                  >
                    <AlertTriangle size={28} color="var(--color-alert)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'calc(1.25rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                      ⚠️ {currentUser.name} has not completed: <span style={{ color: 'var(--color-alert)' }}>{alert.title}</span>
                    </div>
                    <div style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                      Scheduled at {alert.time}. Now <strong>{alert.overdueMinutes} minutes overdue</strong>.
                    </div>
                  </div>
                </div>

                <TremorButton
                  variant="alert"
                  onClick={() => acknowledgeTier3Alert(alert.reminderId)}
                  style={{ minHeight: '48px', padding: '8px 20px', fontSize: 'calc(1rem * var(--font-scale))' }}
                >
                  <CheckCircle2 size={18} />
                  <span>Acknowledge Alert</span>
                </TremorButton>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="card"
            style={{
              padding: '20px 24px',
              background: '#F0FDF4',
              borderColor: '#86EFAC',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: 'calc(1.125rem * var(--font-scale))',
              fontWeight: 700
            }}
          >
            <CheckCircle2 size={24} color="#166534" />
            <span>{t.noAlerts}</span>
          </div>
        )}
      </div>

      {/* Grid: Patient Clinical Profile & Weekly Routine Adherence */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {/* Patient Clinical Profile */}
        <div className="card muga-border">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'var(--color-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <User size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: 'calc(1.375rem * var(--font-scale))', color: 'var(--color-primary)' }}>
                {safeUser.name}
              </h3>
              <div style={{ fontSize: 'calc(0.875rem * var(--font-scale))', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                Age: {safeUser.age} • {safeProfile.diagnosis}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: 'calc(1rem * var(--font-scale))' }}>
            <div style={{ padding: '12px', background: 'var(--color-surface-warm)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                <Stethoscope size={18} color="var(--color-secondary)" />
                <span>{t.doctorInfo}</span>
              </div>
              <div style={{ marginTop: '4px', color: 'var(--color-text-secondary)' }}>
                {safeProfile.doctorName}
              </div>
              <div style={{ fontSize: 'calc(0.875rem * var(--font-scale))', color: 'var(--color-primary)', fontWeight: 700, marginTop: '2px' }}>
                📞 {safeProfile.doctorPhone}
              </div>
            </div>

            <div style={{ padding: '12px', background: 'var(--color-surface-warm)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                <Phone size={18} color="var(--color-primary)" />
                <span>{t.emergencyContact}</span>
              </div>
              <div style={{ marginTop: '4px', color: 'var(--color-text-secondary)' }}>
                {safeProfile.emergencyContact}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, marginBottom: '8px' }}>
                <Pill size={18} color="var(--color-primary)" />
                <span>{t.prescribedMedicines}</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(safeProfile.prescriptions || []).map((med, idx) => (
                  <li key={idx} style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', color: 'var(--color-text-secondary)', paddingLeft: '8px', borderLeft: '3px solid var(--color-primary)' }}>
                    <strong>{med.name}</strong> — {med.timing}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Weekly Adherence & Cognitive Trends */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <Activity size={26} color="var(--color-secondary)" />
            <h3 style={{ fontSize: 'calc(1.375rem * var(--font-scale))', color: 'var(--color-text-primary)' }}>
              {t.weeklyAdherence}
            </h3>
          </div>

          <p style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginBottom: '18px' }}>
            Patient adherence to scheduled reminders and morning routine over the past 7 days:
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '140px', paddingBottom: '10px', borderBottom: '2px solid #E5DEC9', marginBottom: '16px' }}>
            {weekDays.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                <span style={{ fontSize: 'calc(0.75rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-secondary)' }}>{item.pct}%</span>
                <div
                  style={{
                    width: '28px',
                    height: `${(item.pct / 100) * 90}px`,
                    background: item.pct >= 90 ? 'var(--color-secondary)' : 'var(--color-warning)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.3s ease'
                  }}
                />
                <span style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-secondary)', marginTop: '4px' }}>{item.day.slice(0, 3)}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', color: 'var(--color-text-secondary)', background: 'var(--color-surface-warm)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
            <strong>Summary:</strong> High adherence (94% avg). Memory games show consistent recall retention in morning sessions.
          </div>
        </div>
      </div>

      {/* Game Scores Over Time */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={26} color="var(--color-primary)" />
            <h3 style={{ fontSize: 'calc(1.375rem * var(--font-scale))', color: 'var(--color-text-primary)' }}>
              {t.gameProgress}
            </h3>
          </div>
          <span style={{ fontSize: 'calc(0.875rem * var(--font-scale))', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
            {safeScores.length} logged sessions
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #DECBB1', fontSize: 'calc(0.9375rem * var(--font-scale))', color: 'var(--color-text-secondary)' }}>
                <th style={{ padding: '12px 8px' }}>Date</th>
                <th style={{ padding: '12px 8px' }}>Exercise Name</th>
                <th style={{ padding: '12px 8px' }}>Score</th>
                <th style={{ padding: '12px 8px' }}>Attempts</th>
                <th style={{ padding: '12px 8px' }}>Duration</th>
                <th style={{ padding: '12px 8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {safeScores.slice(0, 8).map((sc) => (
                <tr key={sc.id} style={{ borderBottom: '1px solid #EBE4D5', fontSize: 'calc(1rem * var(--font-scale))' }}>
                  <td style={{ padding: '12px 8px', color: 'var(--color-text-secondary)' }}>{sc.date}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 800, textTransform: 'capitalize' }}>
                    {sc.game === 'memory' ? 'Memory Match' : sc.game === 'daily' ? 'Daily Routine' : sc.game === 'number' ? 'Number Recall' : sc.game === 'faces' ? 'Faces & Family' : 'Story Recall'}
                  </td>
                  <td style={{ padding: '12px 8px', fontWeight: 800, color: 'var(--color-primary)' }}>
                    {sc.score} / {sc.maxScore || 100}
                  </td>
                  <td style={{ padding: '12px 8px', color: 'var(--color-text-secondary)' }}>{sc.moves || 1}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--color-text-secondary)' }}>{sc.timeSecs ? `${sc.timeSecs}s` : '—'}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', fontWeight: 700, color: '#166534', background: '#DCFCE7', padding: '3px 8px', borderRadius: '4px' }}>
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Activity Log */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <FileText size={24} color="var(--color-text-secondary)" />
          <h3 style={{ fontSize: 'calc(1.375rem * var(--font-scale))', color: 'var(--color-text-primary)' }}>
            Patient Activity History & Time-Stamped Audit Log
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activityHistory.slice(0, 8).map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: item.type === 'alert' ? '#FEF2F2' : 'var(--color-surface-warm)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: `4px solid ${item.type === 'alert' ? 'var(--color-alert)' : 'var(--color-secondary)'}`
              }}
            >
              <div style={{ fontSize: 'calc(1rem * var(--font-scale))', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {item.text}
              </div>
              <div style={{ fontSize: 'calc(0.875rem * var(--font-scale))', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
