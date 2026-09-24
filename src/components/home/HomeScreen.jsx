import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import HomeHero from './HomeHero';
import RemindersView from '../reminders/RemindersView';
import TodayScheduleView from '../schedule/TodayScheduleView';
import AICompanion from '../companion/AICompanion';
import DailyMoodModal from '../companion/DailyMoodModal';
import PatientSosButton from '../common/PatientSosButton';
import ConfusionHelpButton from '../common/ConfusionHelpButton';
import InactivityWatcher from '../common/InactivityWatcher';

export default function HomeScreen() {
  const { t = {}, openMoodModal, showMoodModal, closeMoodModal } = useApp();

  return (
    <div style={{ paddingBottom: '90px' }}>

      {/* 1. Personalized hero: greeting, next task, quick actions */}
      <HomeHero />

      {/* 2. Mood check-in banner — proper <button> for accessibility */}
      <button
        type="button"
        onClick={openMoodModal}
        className="mood-banner"
        aria-label="Tap to share how you're feeling today"
        style={{ width: '100%', textAlign: 'left', marginBottom: '28px' }}
      >
        <span style={{ fontSize: 'calc(2rem * var(--font-scale))', lineHeight: 1 }} aria-hidden="true">🌸</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 'calc(1.0625rem * var(--font-scale))',
            fontWeight: 800,
            color: 'var(--color-warning)',
          }}>
            {t.moodBannerPrompt || 'How are you feeling today?'}
          </div>
          <div style={{
            fontSize: 'calc(0.875rem * var(--font-scale))',
            color: 'var(--color-text-secondary)',
            marginTop: '2px',
          }}>
            {t.moodSubtitle || 'Tap to share your mood with Remi'}
          </div>
        </div>
        <ArrowRight size={20} color="var(--color-warning)" aria-hidden="true" />
      </button>

      {/* 3. Today's Reminders */}
      <section aria-label="Daily Care Reminders" style={{ marginBottom: '36px' }}>
        <RemindersView showDemoControls={false} />
      </section>

      {/* 4. Daily Schedule */}
      <section aria-label="Today's Schedule" style={{ marginBottom: '36px' }}>
        <TodayScheduleView />
      </section>

      {/* Warm divider */}
      <div
        className="warm-divider"
        role="separator"
        aria-hidden="true"
      />

      {/* 5. Remi AI Companion */}
      <section id="remi-bottom-section" aria-label="Remi — your companion">
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
