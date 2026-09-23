import React from 'react';
import { Sparkles, Calendar, Hash, Users, BookOpen, Play, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../locales/translations';
import TremorButton from '../common/TremorButton';
import GroundingClock from '../common/GroundingClock';
import RemindersView from '../reminders/RemindersView';
import TodayScheduleView from '../schedule/TodayScheduleView';
import AICompanion from '../companion/AICompanion';

export default function GamesHome({ onSelectGame }) {
  const { currentUser = {}, gameScores = [], t = {}, openMoodModal = () => {}, dailyMood = 'peaceful' } = useApp();
  const safeScores = Array.isArray(gameScores) ? gameScores : [];

  const games = [
    {
      id: 'memory',
      title: t.gameMemoryTitle || 'Memory Match',
      desc: t.gameMemoryDesc || 'Match pairs of traditional cultural cards',
      icon: '🦏',
      color: '#9C4124',
      badge: 'Assam & Manipur Symbols',
      plays: safeScores.filter(s => s.game === 'memory').length
    },
    {
      id: 'daily',
      title: t.gameDailyTitle,
      desc: t.gameDailyDesc,
      icon: '🌅',
      color: '#2C6E49',
      badge: 'Sequence & Habits',
      plays: safeScores.filter(s => s.game === 'daily').length
    },
    {
      id: 'number',
      title: t.gameNumberTitle,
      desc: t.gameNumberDesc,
      icon: '🔢',
      color: '#D97706',
      badge: 'Working Memory',
      plays: safeScores.filter(s => s.game === 'number').length
    },
    {
      id: 'faces',
      title: t.gameFacesTitle,
      desc: t.gameFacesDesc,
      icon: '👨‍👩‍👧',
      color: '#E07A5F',
      badge: 'Kin & Face Memory',
      plays: safeScores.filter(s => s.game === 'faces').length
    },
    {
      id: 'story',
      title: t.gameStoryTitle,
      desc: t.gameStoryDesc,
      icon: '📖',
      color: '#7C2D12',
      badge: 'Audio-Visual Sync',
      plays: safeScores.filter(s => s.game === 'story').length
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* 1. Clock + date */}
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

      {/* 2. Mood check-in (if not done yet today) */}
      {!dailyMood && (
        <div
          onClick={openMoodModal}
          style={{
            maxWidth: '780px',
            margin: '0 auto 28px auto',
            background: 'linear-gradient(135deg, #FFF9F0 0%, #FEF3C7 100%)',
            border: '2.5px solid #F59E0B',
            borderRadius: 'var(--radius-md)',
            padding: '16px 22px',
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
            <span style={{ fontSize: 'var(--font-size-xxl)', lineHeight: 1 }}>🌸</span>
            <div>
              <div style={{ fontSize: 'var(--font-size-large)', fontWeight: 800, color: '#92400E' }}>
                {t.moodBannerPrompt || 'How are you feeling today? Tap to share with Remi 🌸'}
              </div>
              <div style={{ fontSize: 'var(--font-size-base)', color: '#78350F' }}>
                {t.moodSubtitle || 'Tap the face that feels closest to you'}
              </div>
            </div>
          </div>
          <span style={{ fontSize: 'var(--font-size-xl)', color: '#B45309', fontWeight: 900 }}>➔</span>
        </div>
      )}

      {/* 3. Today's games / activities */}
      <section aria-label="Today's Games and Activities">
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div className="cultural-header-badge" style={{ marginBottom: '10px' }}>
            <Sparkles size={16} />
            <span>North East Cognitive Exercise Hub</span>
          </div>
          <h1 style={{ fontSize: 'var(--font-size-xxl)', color: 'var(--color-primary)', marginBottom: '8px' }}>
            {t.gamesTitle}
          </h1>
          <p style={{ fontSize: 'var(--font-size-large)', color: 'var(--color-text-secondary)', maxWidth: '650px', margin: '0 auto 20px auto' }}>
            {t.gamesSubtitle}
          </p>

          <div style={{ maxWidth: '780px', margin: '0 auto', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '2px solid #DECBB1', boxShadow: 'var(--shadow-sm)' }}>
            <img
              src="/hero-banner.jpg"
              alt="Elders enjoying tea amidst green tea gardens"
              style={{ width: '100%', height: '170px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>

      {/* Grid of Mini-Games */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}
      >
        {games.map((game) => (
          <div
            key={game.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              borderTop: `6px solid ${game.color}`
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div
                  style={{
                    fontSize: 'calc(2.75rem * var(--font-scale))',
                    lineHeight: 1,
                    background: 'var(--color-surface-warm)',
                    width: '68px',
                    height: '68px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #DECBB1'
                  }}
                >
                  {game.icon}
                </div>
                <span
                  style={{
                    fontSize: 'calc(0.8125rem * var(--font-scale))',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: game.color,
                    background: 'var(--color-surface-warm)',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid #D6CEBE'
                  }}
                >
                  {game.badge}
                </span>
              </div>

                <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '10px', color: 'var(--color-text-primary)' }}>
                  {game.title}
                </h2>

                <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                  {game.desc}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1.5px solid #EBE4D5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  <Award size={18} color={game.color} />
                  <span>{game.plays} sessions logged</span>
                </div>

                <TremorButton
                  variant="primary"
                  onClick={() => onSelectGame(game.id)}
                  style={{ minHeight: '52px', padding: '10px 22px' }}
                  ariaLabel={`Play ${game.title}`}
                >
                  <span>{t.tapToPlay}</span>
                  <Play size={18} fill="currentColor" />
                </TremorButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Reminders */}
      <section style={{ marginTop: '54px', paddingTop: '36px', borderTop: '2px dashed #E2D9C8' }} aria-label="Daily Care Reminders">
        <RemindersView />
      </section>

      {/* 5. Dainik Dincharya (daily schedule) */}
      <section style={{ marginTop: '54px', paddingTop: '36px', borderTop: '2px dashed #E2D9C8' }} aria-label="Dainik Dincharya Daily Schedule">
        <TodayScheduleView />
      </section>

      {/* Soft warm divider line separating Dainik Dincharya from Remi */}
      <div
        className="remi-warm-divider"
        style={{
          height: '2.5px',
          background: 'linear-gradient(to right, transparent, #DECBB1 15%, #C4A482 50%, #DECBB1 85%, transparent)',
          margin: '54px 0 40px 0',
          borderRadius: '2px'
        }}
        role="separator"
        aria-hidden="true"
      />

      {/* 6. Remi — at the very bottom */}
      <section id="remi-bottom-section" style={{ marginTop: '16px' }} aria-label="Remi Companion Section">
        <AICompanion />
      </section>
    </div>
  );
}
