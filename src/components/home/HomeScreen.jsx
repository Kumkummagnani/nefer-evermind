import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import GroundingClock from '../common/GroundingClock';
import RemindersView from '../reminders/RemindersView';
import TodayScheduleView from '../schedule/TodayScheduleView';
import AICompanion from '../companion/AICompanion';
import DailyMoodModal from '../companion/DailyMoodModal';
import PatientSosButton from '../common/PatientSosButton';
import ConfusionHelpButton from '../common/ConfusionHelpButton';
import InactivityWatcher from '../common/InactivityWatcher';

export default function HomeScreen() {
  const { t = {}, dailyMood = 'peaceful', openMoodModal, showMoodModal, closeMoodModal } = useApp();

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* 1. Grounding Clock + Date grounding */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--color-surface-warm)',
            border: '2px solid #DECBB1',
            borderRadius: 'var(--radius-full)',
            padding: '8px 24px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <GroundingClock />
        </div>
      </div>

      {/* 2. Mood check-in banner */}
      <div
        onClick={openMoodModal}
        style={{
          margin: '0 auto 28px auto',
          background: 'linear-gradient(135deg, #FFF9F0 0%, #FEF3C7 100%)',
          border: '2.5px solid #F59E0B',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(245, 158, 11, 0.15)',
          textAlign: 'left'
        }}
        role="button"
        tabIndex={0}
        aria-label="Daily mood check-in"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: 'calc(2rem * var(--font-scale))', lineHeight: 1 }}>🌸</span>
          <div>
            <div style={{ fontSize: 'calc(1.1rem * var(--font-scale))', fontWeight: 800, color: '#92400E' }}>
              {t.moodBannerPrompt || 'How are you feeling today? Tap to share with Remi 🌸'}
            </div>
            <div style={{ fontSize: 'calc(0.85rem * var(--font-scale))', color: '#78350F' }}>
              {t.moodSubtitle || 'Tap the face that feels closest to you'}
            </div>
          </div>
        </div>
        <span style={{ fontSize: 'calc(1.3rem * var(--font-scale))', color: '#B45309', fontWeight: 900 }}>➔</span>
      </div>

      {/* 3. Today's Reminders Section */}
      <section style={{ marginBottom: '36px' }} aria-label="Daily Care Reminders">
        <RemindersView />
      </section>

      {/* 4. Dainik Dincharya (Daily schedule) Section */}
      <section style={{ marginBottom: '36px' }} aria-label="Dainik Dincharya Daily Schedule">
        <TodayScheduleView />
      </section>

      {/* Soft warm divider line separating Dainik Dincharya from Remi */}
      <div
        className="remi-warm-divider"
        style={{
          height: '2.5px',
          background: 'linear-gradient(to right, transparent, #DECBB1 15%, #C4A482 50%, #DECBB1 85%, transparent)',
          margin: '36px 0 28px 0',
          borderRadius: '2px'
        }}
        role="separator"
        aria-hidden="true"
      />

      {/* 5. Remi AI Companion — at the very bottom */}
      <section id="remi-bottom-section" aria-label="Remi Companion Section">
        <AICompanion />
      </section>

      {/* Floating Helpers */}
      <PatientSosButton />
      <ConfusionHelpButton />
      <InactivityWatcher />
      {showMoodModal && <DailyMoodModal onClose={closeMoodModal} />}
    </div>
  );
}
