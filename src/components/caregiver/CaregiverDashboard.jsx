import React, { useState } from 'react';
import {
  Shield, User, Award, Activity, AlertTriangle, Phone,
  Stethoscope, CheckCircle2, FileText, Pill, Heart, Users,
  Plus, Trash2, Mail, Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useReminders } from '../../context/ReminderContext';
import { translations } from '../../locales/translations';
import EmergencyLanguageSwitch from './EmergencyLanguageSwitch';
import CaregiverAlertModal from './CaregiverAlertModal';
import TremorButton from '../common/TremorButton';

export default function CaregiverDashboard() {
  const appData = useApp() || {};
  const remindersContext = useReminders() || {};

  const {
    patientData = {},
    caregiverData = {},
    clinicalProfile = {},
    gameScores = [],
    memories = [],
    language = 'en-IN',
    familyMembers = [],
    addFamilyMember,
    goToRoleSelect
  } = appData;

  // Safe Fallbacks for all data
  const patientName = patientData?.name || 'Your Patient';
  const patientAge = patientData?.age || 74;
  const caregiverName = caregiverData?.name || 'Debojit Sharma';

  const safeProfile = {
    diagnosis: 'Mild Cognitive Impairment (Early Stage)',
    doctorName: 'Dr. Anita Sen, Neurologist',
    doctorPhone: '+91 98301 23456',
    emergencyContact: `${caregiverName} (Family) • +91 98765 43210`,
    prescriptions: [
      { name: 'Donepezil 5mg', timing: '8:00 AM — Morning (With breakfast)' },
      { name: 'Memantine 10mg', timing: '8:00 PM — Night (After dinner)' }
    ],
    ...(clinicalProfile || {})
  };

  const scores = (Array.isArray(gameScores) && gameScores.length > 0)
    ? gameScores
    : (Array.isArray(patientData?.scores) ? patientData.scores : [
        { id: 's1', game: 'memory', date: 'Today, 10:15 AM', score: 92, moves: 8, timeSecs: 45, maxScore: 100 },
        { id: 's2', game: 'daily', date: 'Yesterday, 3:30 PM', score: 85, moves: 1, timeSecs: 30, maxScore: 100 },
        { id: 's3', game: 'number', date: 'Yesterday, 11:00 AM', score: 88, moves: 2, timeSecs: 50, maxScore: 100 }
      ]);

  const allReminders = Array.isArray(remindersContext.reminders) ? remindersContext.reminders : [];
  const addReminder = remindersContext.addReminder || (() => {});
  const deleteReminder = remindersContext.deleteReminder || (() => {});

  const rawAlerts = Array.isArray(remindersContext.tier3ActiveAlerts)
    ? remindersContext.tier3ActiveAlerts
    : (Array.isArray(patientData?.alerts) ? patientData.alerts : []);

  const alerts = rawAlerts || [];
  const acknowledgeTier3Alert = remindersContext.acknowledgeTier3Alert || (() => {});

  const history = Array.isArray(remindersContext.activityHistory) && remindersContext.activityHistory.length > 0
    ? remindersContext.activityHistory
    : [
        { id: 'h1', text: `${patientName} completed Morning Routine on time`, time: '08:15 AM', type: 'success' },
        { id: 'h2', text: `${patientName} finished Memory Match (92% recall)`, time: '10:15 AM', type: 'game' },
        { id: 'h3', text: 'Hydration break reminder acknowledged', time: '11:30 AM', type: 'success' }
      ];

  const memoryList = Array.isArray(memories) && memories.length > 0
    ? memories
    : [
        {
          id: 'm1',
          title: 'Jorhat Tea Garden Harvest',
          caption: 'Visiting the lush green tea garden with family in the refreshing morning mist.',
          image: '/memories/tea-garden.jpg',
          date: 'Family Holiday'
        },
        {
          id: 'm2',
          title: 'Rongali Bihu Spring Celebration',
          caption: 'Dancing with the dhol and pepa under the blooming trees with joyous laughter.',
          image: '/memories/bihu-dance.jpg',
          date: 'Spring Festival'
        }
      ];

  const familyList = Array.isArray(familyMembers) && familyMembers.length > 0
    ? familyMembers
    : [
        {
          id: 'fam-1',
          name: 'Debojit Sharma',
          relationship: 'Son',
          phone: '+91 98765 43210',
          email: 'debojit.sharma@gmail.com',
          role: 'Primary Caregiver & Daily Care Coordinator',
          isPrimary: true
        },
        {
          id: 'fam-2',
          name: 'Priyanka Sharma',
          relationship: 'Daughter-in-law',
          phone: '+91 98765 43211',
          email: 'priyanka.s@gmail.com',
          role: 'Secondary Caregiver & Nutrition / Meals',
          isPrimary: false
        },
        {
          id: 'fam-3',
          name: 'Aarav Sharma',
          relationship: 'Grandson',
          phone: '+91 98765 43212',
          email: 'aarav.sharma@gmail.com',
          role: 'Family Member & Cognitive Storytelling',
          isPrimary: false
        },
        {
          id: 'fam-4',
          name: 'Dr. Anita Sen',
          relationship: 'Attending Neurologist & Family Friend',
          phone: '+91 98301 23456',
          email: 'dr.anitasen@neurology.in',
          role: 'Clinical Advisor & Specialist Care',
          isPrimary: false
        }
      ];

  const t = translations[language] || translations['en-IN'] || {};

  // Form State: Add Caregiver Modal
  const [isAddCaregiverModalOpen, setIsAddCaregiverModalOpen] = useState(false);
  const [newCaregiver, setNewCaregiver] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    role: ''
  });

  const handleSaveCaregiver = (e) => {
    e.preventDefault();
    if (!newCaregiver.name.trim()) return;

    if (typeof addFamilyMember === 'function') {
      addFamilyMember({
        name: newCaregiver.name.trim(),
        relationship: newCaregiver.relationship.trim() || 'Family Caregiver',
        phone: newCaregiver.phone.trim() || '+91 98000 00000',
        email: newCaregiver.email.trim(),
        role: newCaregiver.role.trim() || 'Caregiver Support',
        isPrimary: false
      });
    }

    setNewCaregiver({ name: '', relationship: '', phone: '', email: '', role: '' });
    setIsAddCaregiverModalOpen(false);
  };

  // Form State: Add Reminder Modal
  const [isAddReminderModalOpen, setIsAddReminderModalOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    time: '08:00 AM',
    date: 'Today',
    category: 'medicine',
    description: ''
  });

  const handleSaveReminder = (e) => {
    e.preventDefault();
    if (!newReminder.title.trim()) return;

    addReminder({
      title: newReminder.title.trim(),
      time: newReminder.time.trim() || '09:00 AM',
      date: newReminder.date.trim() || 'Today',
      category: newReminder.category,
      description: newReminder.description.trim()
    });

    setNewReminder({
      title: '',
      time: '08:00 AM',
      date: 'Today',
      category: 'medicine',
      description: ''
    });
    setIsAddReminderModalOpen(false);
  };

  // State: Delete Confirmation
  const [reminderToDelete, setReminderToDelete] = useState(null);

  const handleConfirmDeleteReminder = () => {
    if (reminderToDelete?.id) {
      deleteReminder(reminderToDelete.id);
      setReminderToDelete(null);
    }
  };

  // Weekly routine completion days
  const weekDays = [
    { day: 'Mon', pct: 100 },
    { day: 'Tue', pct: 90 },
    { day: 'Wed', pct: 100 },
    { day: 'Thu', pct: 85 },
    { day: 'Fri', pct: 100 },
    { day: 'Sat', pct: 95 },
    { day: 'Sun (Today)', pct: 88 }
  ];

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'var(--color-background, #FDF8F3)',
        color: 'var(--color-text, #2C2C2C)',
        padding: '10px 0'
      }}
    >
      {/* Tier 3 Alert Modal if triggered */}
      <CaregiverAlertModal />

      {/* Top Header with Switch Profile Button */}
      <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="cultural-header-badge" style={{ marginBottom: '8px' }}>
            <Shield size={16} />
            <span>Caregiver Central Monitoring</span>
          </div>
          <h1 style={{ fontSize: 'calc(2.2rem * var(--font-scale))', color: 'var(--color-primary)', margin: '0 0 6px 0' }}>
            {t.caregiverTitle || 'Caregiver Portal'}
          </h1>
          <p style={{ fontSize: 'calc(1.1rem * var(--font-scale))', color: 'var(--color-muted)', margin: 0 }}>
            {t.caregiverSubtitle || 'Live telemetry, safety alerts, and cognitive progress'}
          </p>
        </div>

        {/* Switch Profile Button (relative, z-index: 200) */}
        <button
          type="button"
          onClick={goToRoleSelect}
          className="switch-profile-btn"
          aria-label="Switch Profile or Role"
          style={{
            position: 'relative',
            zIndex: 200,
            padding: '12px 20px',
            borderRadius: 12,
            background: 'var(--color-surface)',
            border: '2px solid var(--color-primary)',
            color: 'var(--color-primary)',
            fontWeight: 800,
            fontSize: 'calc(1rem * var(--font-scale))',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
        >
          <span>🔄</span>
          <span>Switch Profile</span>
        </button>
      </div>

      {/* SECTION 1: Patient Name & Clinical Profile at the Top */}
      <div className="card muga-border" style={{ marginBottom: '28px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--color-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--color-primary)'
              }}
            >
              <User size={30} color="var(--color-primary)" />
            </div>
            <div>
              <div style={{ fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-muted)', fontWeight: 600 }}>
                Patient Overview
              </div>
              <h2 style={{ fontSize: 'calc(1.6rem * var(--font-scale))', color: 'var(--color-primary)', margin: '2px 0 0 0' }}>
                {patientName}
              </h2>
              <div style={{ fontSize: 'calc(0.9rem * var(--font-scale))', color: 'var(--color-text-secondary)', fontWeight: 600, marginTop: '2px' }}>
                Age: {patientAge} • {safeProfile.diagnosis}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ padding: '8px 16px', background: 'var(--color-surface-warm)', borderRadius: 10, border: '1px solid #DECBB1' }}>
              <div style={{ fontSize: 'calc(0.75rem * var(--font-scale))', color: 'var(--color-muted)', fontWeight: 700 }}>MMSE SCORE</div>
              <div style={{ fontSize: 'calc(1.2rem * var(--font-scale))', color: 'var(--color-primary)', fontWeight: 900 }}>24 / 30</div>
            </div>
            <div style={{ padding: '8px 16px', background: 'var(--color-surface-warm)', borderRadius: 10, border: '1px solid #DECBB1' }}>
              <div style={{ fontSize: 'calc(0.75rem * var(--font-scale))', color: 'var(--color-muted)', fontWeight: 700 }}>PRIMARY CAREGIVER</div>
              <div style={{ fontSize: 'calc(1.1rem * var(--font-scale))', color: 'var(--color-text)', fontWeight: 800 }}>{caregiverName}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '14px', background: 'var(--color-surface-warm)', borderRadius: 'var(--radius-sm)', border: '1px solid #E5DEC9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              <Stethoscope size={18} color="var(--color-secondary)" />
              <span>{t.doctorInfo || 'Physician Info'}</span>
            </div>
            <div style={{ marginTop: '4px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              {safeProfile.doctorName}
            </div>
            <div style={{ fontSize: 'calc(0.9rem * var(--font-scale))', color: 'var(--color-primary)', fontWeight: 700, marginTop: '2px' }}>
              📞 {safeProfile.doctorPhone}
            </div>
          </div>

          <div style={{ padding: '14px', background: 'var(--color-surface-warm)', borderRadius: 'var(--radius-sm)', border: '1px solid #E5DEC9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              <Phone size={18} color="var(--color-primary)" />
              <span>{t.emergencyContact || 'Emergency Contact'}</span>
            </div>
            <div style={{ marginTop: '4px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
              {safeProfile.emergencyContact}
            </div>
          </div>

          <div style={{ padding: '14px', background: 'var(--color-surface-warm)', borderRadius: 'var(--radius-sm)', border: '1px solid #E5DEC9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              <Pill size={18} color="var(--color-primary)" />
              <span>{t.prescribedMedicines || 'Daily Prescriptions'}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {(safeProfile.prescriptions || []).map((med, idx) => (
                <li key={idx} style={{ fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-text-secondary)', borderLeft: '3px solid var(--color-primary)', paddingLeft: '8px' }}>
                  <strong>{med.name}</strong> — {med.timing}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION: Patient Family & Care Circle (REQUIREMENT 1 & 2) */}
      <div className="card" style={{ marginBottom: '28px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={24} color="var(--color-primary)" />
            <h2 style={{ fontSize: 'calc(1.4rem * var(--font-scale))', color: 'var(--color-text)', margin: 0 }}>
              Patient Family & Care Circle
            </h2>
            <span
              style={{
                fontSize: 'calc(0.8rem * var(--font-scale))',
                fontWeight: 700,
                background: 'var(--color-primary-light, #FFF2EB)',
                color: 'var(--color-primary)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(193, 96, 74, 0.3)'
              }}
            >
              {familyList.length} Members
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsAddCaregiverModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 12,
              background: 'var(--color-primary)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 800,
              fontSize: 'calc(0.95rem * var(--font-scale))',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 2px 8px rgba(193, 96, 74, 0.25)'
            }}
          >
            <Plus size={18} />
            <span>Add Caregiver Detail</span>
          </button>
        </div>

        <p style={{ fontSize: 'calc(0.95rem * var(--font-scale))', color: 'var(--color-text-secondary)', margin: '0 0 18px 0' }}>
          Family members, secondary caregivers, and healthcare liaisons supporting {patientName}:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {familyList.map((member) => (
            <div
              key={member.id}
              style={{
                padding: '18px',
                background: 'var(--color-surface-warm, #FAF5EE)',
                borderRadius: 'var(--radius-md)',
                border: member.isPrimary ? '2px solid var(--color-primary)' : '1.5px solid #DECBB1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 12,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                  <div>
                    <h3 style={{ fontSize: 'calc(1.15rem * var(--font-scale))', color: 'var(--color-text)', margin: 0, fontWeight: 800 }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-muted)', fontWeight: 600 }}>
                      {member.relationship}
                    </div>
                  </div>
                  {member.isPrimary && (
                    <span
                      style={{
                        fontSize: 'calc(0.7rem * var(--font-scale))',
                        fontWeight: 800,
                        background: '#DCFCE7',
                        color: '#166534',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid #86EFAC',
                        textTransform: 'uppercase'
                      }}
                    >
                      Primary
                    </span>
                  )}
                </div>

                <div
                  style={{
                    fontSize: 'calc(0.85rem * var(--font-scale))',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    background: 'var(--color-primary-light, #FFF2EB)',
                    padding: '6px 10px',
                    borderRadius: 8,
                    marginBottom: 10
                  }}
                >
                  {member.role || 'Family Caregiver'}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-text-secondary)' }}>
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      <Phone size={14} />
                      <span>{member.phone}</span>
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--color-text-secondary)', textDecoration: 'none' }}
                    >
                      <Mail size={14} />
                      <span>{member.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: Reminders Management & Schedule (REQUIREMENT 3) */}
      <div className="card" style={{ marginBottom: '28px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell size={24} color="var(--color-primary)" />
            <h2 style={{ fontSize: 'calc(1.4rem * var(--font-scale))', color: 'var(--color-text)', margin: 0 }}>
              Daily Patient Reminders & Schedule
            </h2>
            <span
              style={{
                fontSize: 'calc(0.8rem * var(--font-scale))',
                fontWeight: 700,
                background: 'var(--color-surface-warm)',
                color: 'var(--color-text)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid #DECBB1'
              }}
            >
              {allReminders.length} Scheduled
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsAddReminderModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 12,
              background: 'var(--color-primary)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 800,
              fontSize: 'calc(0.95rem * var(--font-scale))',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 2px 8px rgba(193, 96, 74, 0.25)'
            }}
          >
            <Plus size={18} />
            <span>Add Reminder</span>
          </button>
        </div>

        <p style={{ fontSize: 'calc(0.95rem * var(--font-scale))', color: 'var(--color-text-secondary)', margin: '0 0 18px 0' }}>
          Configure medication, hydration, and daily routine prompts delivered by Remi voice and visual alerts:
        </p>

        {allReminders.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-muted)', background: 'var(--color-surface-warm)', borderRadius: 'var(--radius-sm)' }}>
            No reminders scheduled. Tap "+ Add Reminder" above to create one.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {allReminders.map((rem) => {
              const remTitle = typeof rem.title === 'object' ? (rem.title[language] || rem.title['en-IN']) : rem.title;
              return (
                <div
                  key={rem.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-md)',
                    background: rem.done ? '#F0FDF4' : 'var(--color-surface-warm, #FAF5EE)',
                    border: rem.done ? '1.5px solid #86EFAC' : '1.5px solid #DECBB1',
                    flexWrap: 'wrap',
                    gap: 12,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: rem.done ? '#DCFCE7' : 'var(--color-primary-light, #FFF2EB)',
                        border: rem.done ? '2px solid #10B981' : '2px solid var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'calc(1.3rem * var(--font-scale))'
                      }}
                    >
                      {rem.icon || '⏰'}
                    </div>

                    <div>
                      <div style={{ fontSize: 'calc(1.05rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text)' }}>
                        {remTitle}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-muted)' }}>
                        <span>🕒 {rem.time}</span>
                        {rem.date && <span>📅 {rem.date}</span>}
                        <span style={{ textTransform: 'capitalize', background: 'rgba(0,0,0,0.05)', padding: '2px 8px', borderRadius: 4 }}>
                          {rem.category || 'personal'}
                        </span>
                        {rem.done ? (
                          <span style={{ color: '#166534', fontWeight: 700 }}>✓ Completed</span>
                        ) : (
                          <span style={{ color: '#D97706', fontWeight: 700 }}>● Scheduled</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setReminderToDelete(rem)}
                    aria-label={`Delete ${remTitle}`}
                    title="Delete Reminder"
                    style={{
                      padding: '8px 14px',
                      borderRadius: 8,
                      background: 'transparent',
                      border: '1.5px solid #EF4444',
                      color: '#DC2626',
                      fontWeight: 700,
                      fontSize: 'calc(0.85rem * var(--font-scale))',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION: Emergency Language Override Control */}
      <EmergencyLanguageSwitch />

      {/* SECTION: Reminder Escalation Alerts Panel */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <h2 style={{ fontSize: 'calc(1.4rem * var(--font-scale))', color: 'var(--color-text)', margin: 0 }}>
            {t.activeAlerts || 'Reminder Escalation Alerts'}
          </h2>
          {alerts.length > 0 ? (
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
                fontSize: 'calc(0.85rem * var(--font-scale))'
              }}
            >
              <span className="alert-dot-pulse" />
              <span>{alerts.length} Overdue</span>
            </span>
          ) : (
            <span
              style={{
                background: '#ECFDF5',
                color: '#065F46',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                fontSize: 'calc(0.85rem * var(--font-scale))'
              }}
            >
              ✓ All Clear
            </span>
          )}
        </div>

        {alerts.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {alerts.map((alert, idx) => (
              <div
                key={alert.reminderId || alert.id || idx}
                className="card"
                style={{
                  border: '3px solid var(--color-alert)',
                  background: '#FFF5F5',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: '#FEE2E2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid var(--color-alert)'
                    }}
                  >
                    <AlertTriangle size={24} color="var(--color-alert)" />
                  </div>
                  <div>
                    <div style={{ fontSize: 'calc(1.15rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                      ⚠️ {patientName} has not completed: <span style={{ color: 'var(--color-alert)' }}>{alert.title || alert.reminderTitle || 'Prescribed Routine'}</span>
                    </div>
                    <div style={{ fontSize: 'calc(0.875rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      Scheduled at {alert.time || alert.scheduledTime || 'morning'}. Now <strong>{alert.overdueMinutes || 60} minutes overdue</strong>.
                    </div>
                  </div>
                </div>

                <TremorButton
                  variant="alert"
                  onClick={() => acknowledgeTier3Alert(alert.reminderId || alert.id)}
                  style={{ minHeight: '44px', padding: '8px 18px', fontSize: 'calc(0.95rem * var(--font-scale))' }}
                >
                  <CheckCircle2 size={16} />
                  <span>Acknowledge Alert</span>
                </TremorButton>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="card"
            style={{
              padding: '18px 22px',
              background: '#F0FDF4',
              borderColor: '#86EFAC',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: 'calc(1.05rem * var(--font-scale))',
              fontWeight: 700
            }}
          >
            <CheckCircle2 size={22} color="#166534" />
            <span>{t.noAlerts || 'All patient reminders are completed on schedule. No active escalations.'}</span>
          </div>
        )}
      </div>

      {/* SECTION: Weekly Game Score Chart & Adherence */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        {/* Weekly Adherence Chart */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <Activity size={24} color="var(--color-secondary)" />
            <h3 style={{ fontSize: 'calc(1.3rem * var(--font-scale))', color: 'var(--color-text)', margin: 0 }}>
              {t.weeklyAdherence || 'Weekly Routine & Adherence'}
            </h3>
          </div>

          <p style={{ fontSize: 'calc(0.9rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            Daily completion rate for {patientName}'s cognitive exercises and reminders over the past 7 days:
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '130px', paddingBottom: '8px', borderBottom: '2px solid #E5DEC9', marginBottom: '14px' }}>
            {weekDays.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
                <span style={{ fontSize: 'calc(0.75rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text-secondary)' }}>{item.pct}%</span>
                <div
                  style={{
                    width: '28px',
                    height: `${(item.pct / 100) * 85}px`,
                    background: item.pct >= 90 ? 'var(--color-secondary)' : 'var(--color-warning)',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.3s ease'
                  }}
                />
                <span style={{ fontSize: 'calc(0.8rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-secondary)', marginTop: '4px' }}>{item.day.slice(0, 3)}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 'calc(0.9rem * var(--font-scale))', color: 'var(--color-text-secondary)', background: 'var(--color-surface-warm)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
            <strong>Summary:</strong> Consistent 94% weekly adherence. Morning sessions show highest cognitive retention.
          </div>
        </div>

        {/* Cognitive Game Scores Over Time */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={24} color="var(--color-primary)" />
              <h3 style={{ fontSize: 'calc(1.3rem * var(--font-scale))', color: 'var(--color-text)', margin: 0 }}>
                {t.gameProgress || 'Cognitive Game Scores'}
              </h3>
            </div>
            <span style={{ fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-muted)', fontWeight: 600 }}>
              {scores.length} sessions logged
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #DECBB1', fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-muted)' }}>
                  <th style={{ padding: '8px 6px' }}>Date</th>
                  <th style={{ padding: '8px 6px' }}>Exercise</th>
                  <th style={{ padding: '8px 6px' }}>Score</th>
                  <th style={{ padding: '8px 6px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {scores.slice(0, 6).map((sc, idx) => (
                  <tr key={sc.id || idx} style={{ borderBottom: '1px solid #EBE4D5', fontSize: 'calc(0.9rem * var(--font-scale))' }}>
                    <td style={{ padding: '10px 6px', color: 'var(--color-text-secondary)' }}>{sc.date}</td>
                    <td style={{ padding: '10px 6px', fontWeight: 800, textTransform: 'capitalize' }}>
                      {sc.game === 'memory' ? 'Memory Match' : sc.game === 'daily' ? 'Daily Routine' : sc.game === 'number' ? 'Number Recall' : sc.game === 'faces' ? 'Faces & Family' : 'Story Recall'}
                    </td>
                    <td style={{ padding: '10px 6px', fontWeight: 800, color: 'var(--color-primary)' }}>
                      {sc.score} / {sc.maxScore || 100}
                    </td>
                    <td style={{ padding: '10px 6px' }}>
                      <span style={{ fontSize: 'calc(0.75rem * var(--font-scale))', fontWeight: 700, color: '#166534', background: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION: Patient Activity Log */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <FileText size={22} color="var(--color-text-secondary)" />
          <h3 style={{ fontSize: 'calc(1.3rem * var(--font-scale))', color: 'var(--color-text)', margin: 0 }}>
            Patient Activity Log & Time-Stamped Audit
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {history.slice(0, 6).map((item, idx) => (
            <div
              key={item.id || idx}
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
              <div style={{ fontSize: 'calc(0.95rem * var(--font-scale))', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {item.text}
              </div>
              <div style={{ fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-muted)', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: Memory Wall Section */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={22} color="var(--color-primary)" fill="currentColor" />
            <h3 style={{ fontSize: 'calc(1.3rem * var(--font-scale))', color: 'var(--color-text)', margin: 0 }}>
              {t.memoriesTitle || 'Memory Wall — Patient Photo Bank'}
            </h3>
          </div>
          <span style={{ fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-muted)', fontWeight: 600 }}>
            {memoryList.length} family memories stored
          </span>
        </div>

        <p style={{ fontSize: 'calc(0.9rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
          Grounding photos and cherished family moments active in {patientName}'s personalized memory gallery:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {memoryList.map((mem, idx) => (
            <div
              key={mem.id || idx}
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: 'var(--color-surface-warm)',
                border: '1.5px solid #DECBB1',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={mem.image || '/memories/tea-garden.jpg'}
                  alt={mem.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {mem.date && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      background: 'rgba(0,0,0,0.65)',
                      color: '#FFFFFF',
                      fontSize: 'calc(0.75rem * var(--font-scale))',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700
                    }}
                  >
                    {mem.date}
                  </span>
                )}
              </div>
              <div style={{ padding: '14px' }}>
                <h4 style={{ fontSize: 'calc(1.1rem * var(--font-scale))', color: 'var(--color-primary)', margin: '0 0 6px 0', fontWeight: 800 }}>
                  {mem.title}
                </h4>
                <p style={{ fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.4 }}>
                  {mem.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL 1: Add Caregiver Detail Modal (REQUIREMENT 2) */}
      {isAddCaregiverModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-caregiver-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 1400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
          }}
          onClick={() => setIsAddCaregiverModalOpen(false)}
        >
          <div
            className="card"
            style={{
              maxWidth: 520,
              width: '100%',
              background: '#FFFFFF',
              borderRadius: 20,
              border: '2px solid var(--color-primary)',
              padding: '28px 24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <User size={24} color="var(--color-primary)" />
                <h3 id="add-caregiver-title" style={{ fontSize: 'calc(1.35rem * var(--font-scale))', color: 'var(--color-primary)', margin: 0, fontWeight: 800 }}>
                  Add Caregiver Detail
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddCaregiverModalOpen(false)}
                aria-label="Close modal"
                style={{ background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--color-muted)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCaregiver}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 'calc(0.9rem * var(--font-scale))', fontWeight: 700, marginBottom: 6, color: 'var(--color-text)' }}>
                  Caregiver Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunita Roy"
                  value={newCaregiver.name}
                  onChange={(e) => setNewCaregiver(prev => ({ ...prev, name: e.target.value }))}
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: '1.5px solid #DECBB1',
                    fontSize: 'calc(0.95rem * var(--font-scale))',
                    fontFamily: 'inherit',
                    background: '#FFFFFF',
                    color: '#2C2C2C'
                  }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 'calc(0.9rem * var(--font-scale))', fontWeight: 700, marginBottom: 6, color: 'var(--color-text)' }}>
                  Relationship to Patient *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daughter, Visiting Nurse, Sitter"
                  value={newCaregiver.relationship}
                  onChange={(e) => setNewCaregiver(prev => ({ ...prev, relationship: e.target.value }))}
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: '1.5px solid #DECBB1',
                    fontSize: 'calc(0.95rem * var(--font-scale))',
                    fontFamily: 'inherit',
                    background: '#FFFFFF',
                    color: '#2C2C2C'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 'calc(0.9rem * var(--font-scale))', fontWeight: 700, marginBottom: 6, color: 'var(--color-text)' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98123 45678"
                    value={newCaregiver.phone}
                    onChange={(e) => setNewCaregiver(prev => ({ ...prev, phone: e.target.value }))}
                    style={{
                      width: '100%',
                      height: 48,
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: '1.5px solid #DECBB1',
                      fontSize: 'calc(0.95rem * var(--font-scale))',
                      fontFamily: 'inherit',
                      background: '#FFFFFF',
                      color: '#2C2C2C'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'calc(0.9rem * var(--font-scale))', fontWeight: 700, marginBottom: 6, color: 'var(--color-text)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. sunita@care.org"
                    value={newCaregiver.email}
                    onChange={(e) => setNewCaregiver(prev => ({ ...prev, email: e.target.value }))}
                    style={{
                      width: '100%',
                      height: 48,
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: '1.5px solid #DECBB1',
                      fontSize: 'calc(0.95rem * var(--font-scale))',
                      fontFamily: 'inherit',
                      background: '#FFFFFF',
                      color: '#2C2C2C'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label style={{ display: 'block', fontSize: 'calc(0.9rem * var(--font-scale))', fontWeight: 700, marginBottom: 6, color: 'var(--color-text)' }}>
                  Role or Responsibility *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Evening Vitals Check & Night Medication"
                  value={newCaregiver.role}
                  onChange={(e) => setNewCaregiver(prev => ({ ...prev, role: e.target.value }))}
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: '1.5px solid #DECBB1',
                    fontSize: 'calc(0.95rem * var(--font-scale))',
                    fontFamily: 'inherit',
                    background: '#FFFFFF',
                    color: '#2C2C2C'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsAddCaregiverModalOpen(false)}
                  style={{
                    flex: 1,
                    minHeight: 48,
                    padding: '10px 16px',
                    borderRadius: 10,
                    background: 'var(--color-surface, #F2EBE3)',
                    border: '2px solid #DECBB1',
                    color: 'var(--color-text)',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    flex: 1,
                    minHeight: 48,
                    padding: '10px 16px',
                    borderRadius: 10,
                    background: 'var(--color-primary)',
                    border: 'none',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Save Caregiver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Reminder Modal (REQUIREMENT 3) */}
      {isAddReminderModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-reminder-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 1400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
          }}
          onClick={() => setIsAddReminderModalOpen(false)}
        >
          <div
            className="card"
            style={{
              maxWidth: 540,
              width: '100%',
              background: '#FFFFFF',
              borderRadius: 20,
              border: '2px solid var(--color-primary)',
              padding: '28px 24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Bell size={24} color="var(--color-primary)" />
                <h3 id="add-reminder-title" style={{ fontSize: 'calc(1.35rem * var(--font-scale))', color: 'var(--color-primary)', margin: 0, fontWeight: 800 }}>
                  Add Patient Reminder
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddReminderModalOpen(false)}
                aria-label="Close modal"
                style={{ background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: 'var(--color-muted)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReminder}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 'calc(0.9rem * var(--font-scale))', fontWeight: 700, marginBottom: 6, color: 'var(--color-text)' }}>
                  Reminder Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Afternoon Water & Vitamin B12"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: '1.5px solid #DECBB1',
                    fontSize: 'calc(0.95rem * var(--font-scale))',
                    fontFamily: 'inherit',
                    background: '#FFFFFF',
                    color: '#2C2C2C'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 'calc(0.9rem * var(--font-scale))', fontWeight: 700, marginBottom: 6, color: 'var(--color-text)' }}>
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 02:30 PM"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                    style={{
                      width: '100%',
                      height: 48,
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: '1.5px solid #DECBB1',
                      fontSize: 'calc(0.95rem * var(--font-scale))',
                      fontFamily: 'inherit',
                      background: '#FFFFFF',
                      color: '#2C2C2C'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 'calc(0.9rem * var(--font-scale))', fontWeight: 700, marginBottom: 6, color: 'var(--color-text)' }}>
                    Date
                  </label>
                  <input
                    type="text"
                    placeholder="Today / Daily"
                    value={newReminder.date}
                    onChange={(e) => setNewReminder(prev => ({ ...prev, date: e.target.value }))}
                    style={{
                      width: '100%',
                      height: 48,
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: '1.5px solid #DECBB1',
                      fontSize: 'calc(0.95rem * var(--font-scale))',
                      fontFamily: 'inherit',
                      background: '#FFFFFF',
                      color: '#2C2C2C'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 'calc(0.9rem * var(--font-scale))', fontWeight: 700, marginBottom: 6, color: 'var(--color-text)' }}>
                  Category
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 8 }}>
                  {[
                    { id: 'medicine', label: 'Medicine', icon: '💊' },
                    { id: 'hydration', label: 'Hydration', icon: '💧' },
                    { id: 'activity', label: 'Activity', icon: '🌿' },
                    { id: 'nutrition', label: 'Nutrition', icon: '🍲' },
                    { id: 'personal', label: 'Personal', icon: '🌙' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setNewReminder(prev => ({ ...prev, category: cat.id }))}
                      style={{
                        padding: '8px 10px',
                        borderRadius: 8,
                        border: newReminder.category === cat.id ? '2px solid var(--color-primary)' : '1px solid #DECBB1',
                        background: newReminder.category === cat.id ? 'var(--color-primary-light, #FFF2EB)' : 'var(--color-surface, #F2EBE3)',
                        color: newReminder.category === cat.id ? 'var(--color-primary)' : 'var(--color-text)',
                        fontWeight: 700,
                        fontSize: 'calc(0.8rem * var(--font-scale))',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      <div>{cat.icon}</div>
                      <div>{cat.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label style={{ display: 'block', fontSize: 'calc(0.9rem * var(--font-scale))', fontWeight: 700, marginBottom: 6, color: 'var(--color-text)' }}>
                  Optional Description / Instruction
                </label>
                <input
                  type="text"
                  placeholder="e.g. Give with a full glass of lukewarm water"
                  value={newReminder.description}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: '1.5px solid #DECBB1',
                    fontSize: 'calc(0.95rem * var(--font-scale))',
                    fontFamily: 'inherit',
                    background: '#FFFFFF',
                    color: '#2C2C2C'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setIsAddReminderModalOpen(false)}
                  style={{
                    flex: 1,
                    minHeight: 48,
                    padding: '10px 16px',
                    borderRadius: 10,
                    background: 'var(--color-surface, #F2EBE3)',
                    border: '2px solid #DECBB1',
                    color: 'var(--color-text)',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    flex: 1,
                    minHeight: 48,
                    padding: '10px 16px',
                    borderRadius: 10,
                    background: 'var(--color-primary)',
                    border: 'none',
                    color: '#FFFFFF',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Delete Reminder Confirmation Dialog (REQUIREMENT 3) */}
      {reminderToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 1400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16
          }}
          onClick={() => setReminderToDelete(null)}
        >
          <div
            className="card"
            style={{
              maxWidth: 480,
              width: '100%',
              background: '#FFFFFF',
              borderRadius: 20,
              border: '3px solid #EF4444',
              padding: '28px 24px',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#FEE2E2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '2px solid #EF4444'
              }}
            >
              <Trash2 size={30} />
            </div>

            <h3 id="delete-dialog-title" style={{ fontSize: 'calc(1.3rem * var(--font-scale))', color: '#991B1B', margin: '0 0 10px 0', fontWeight: 800 }}>
              Remove Reminder?
            </h3>

            <p style={{ fontSize: 'calc(0.95rem * var(--font-scale))', color: 'var(--color-text-secondary)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
              Are you sure you want to permanently delete{' '}
              <strong>
                "{typeof reminderToDelete.title === 'object' ? (reminderToDelete.title['en-IN'] || 'Reminder') : reminderToDelete.title}"
              </strong>{' '}
              scheduled for {reminderToDelete.time}?
            </p>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                type="button"
                onClick={() => setReminderToDelete(null)}
                style={{
                  flex: 1,
                  minHeight: 48,
                  padding: '10px 16px',
                  borderRadius: 10,
                  background: 'var(--color-surface, #F2EBE3)',
                  border: '2px solid #DECBB1',
                  color: 'var(--color-text)',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDeleteReminder}
                style={{
                  flex: 1,
                  minHeight: 48,
                  padding: '10px 16px',
                  borderRadius: 10,
                  background: '#DC2626',
                  border: 'none',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
