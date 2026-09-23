import React from 'react';
import { Sparkles, Play, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import TremorButton from '../common/TremorButton';
import MemoryMatchGame from './MemoryMatchGame';
import DailyRecallGame from './DailyRecallGame';
import NumberRecallGame from './NumberRecallGame';
import FacesFamilyGame from './FacesFamilyGame';
import StoryRecallGame from './StoryRecallGame';
import PatientSosButton from '../common/PatientSosButton';
import ConfusionHelpButton from '../common/ConfusionHelpButton';

export default function GamesScreen() {
  const { activeGame, setActiveGame, gameScores = [], t = {} } = useApp();
  const safeScores = Array.isArray(gameScores) ? gameScores : [];

  // When a game card is clicked, open that specific game as its own full screen
  if (activeGame === 'memory') {
    return (
      <div style={{ paddingBottom: '80px' }}>
        <MemoryMatchGame onBack={() => setActiveGame(null)} />
        <PatientSosButton />
        <ConfusionHelpButton />
      </div>
    );
  }

  if (activeGame === 'daily') {
    return (
      <div style={{ paddingBottom: '80px' }}>
        <DailyRecallGame onBack={() => setActiveGame(null)} />
        <PatientSosButton />
        <ConfusionHelpButton />
      </div>
    );
  }

  if (activeGame === 'number') {
    return (
      <div style={{ paddingBottom: '80px' }}>
        <NumberRecallGame onBack={() => setActiveGame(null)} />
        <PatientSosButton />
        <ConfusionHelpButton />
      </div>
    );
  }

  if (activeGame === 'faces') {
    return (
      <div style={{ paddingBottom: '80px' }}>
        <FacesFamilyGame onBack={() => setActiveGame(null)} />
        <PatientSosButton />
        <ConfusionHelpButton />
      </div>
    );
  }

  if (activeGame === 'story') {
    return (
      <div style={{ paddingBottom: '80px' }}>
        <StoryRecallGame onBack={() => setActiveGame(null)} />
        <PatientSosButton />
        <ConfusionHelpButton />
      </div>
    );
  }

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
      title: t.gameDailyTitle || 'Daily Recall',
      desc: t.gameDailyDesc || 'Arrange morning routine in gentle sequence',
      icon: '🌅',
      color: '#2C6E49',
      badge: 'Sequence & Habits',
      plays: safeScores.filter(s => s.game === 'daily').length
    },
    {
      id: 'number',
      title: t.gameNumberTitle || 'Number Recall',
      desc: t.gameNumberDesc || 'Remember gentle numbers and tap with confidence',
      icon: '🔢',
      color: '#D97706',
      badge: 'Working Memory',
      plays: safeScores.filter(s => s.game === 'number').length
    },
    {
      id: 'faces',
      title: t.gameFacesTitle || 'Faces & Family',
      desc: t.gameFacesDesc || 'Identify loved ones, family relations and friends',
      icon: '👨‍👩‍👧',
      color: '#E07A5F',
      badge: 'Kin & Face Memory',
      plays: safeScores.filter(s => s.game === 'faces').length
    },
    {
      id: 'story',
      title: t.gameStoryTitle || 'Story Recall',
      desc: t.gameStoryDesc || 'Listen to folk tales with highlighted audio words',
      icon: '📖',
      color: '#7C2D12',
      badge: 'Audio-Visual Sync',
      plays: safeScores.filter(s => s.game === 'story').length
    }
  ];

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <div className="cultural-header-badge" style={{ marginBottom: '8px' }}>
          <Sparkles size={16} />
          <span>North East Cognitive Exercise Hub</span>
        </div>
        <h1 style={{ fontSize: 'calc(2rem * var(--font-scale))', color: 'var(--color-primary)', margin: '0 0 6px 0' }}>
          {t.gamesTitle || 'Cognitive Exercises'}
        </h1>
        <p style={{ fontSize: 'calc(1.05rem * var(--font-scale))', color: 'var(--color-text-secondary)', margin: 0 }}>
          {t.gamesSubtitle || 'Gentle brain games rooted in familiar heritage'}
        </p>
      </div>

      {/* The 5 Game Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '20px'
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
              borderTop: `6px solid ${game.color}`,
              padding: '22px 20px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div
                  style={{
                    fontSize: 'calc(2.5rem * var(--font-scale))',
                    lineHeight: 1,
                    background: 'var(--color-surface-warm)',
                    width: '64px',
                    height: '64px',
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
                    fontSize: 'calc(0.75rem * var(--font-scale))',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: game.color,
                    background: 'var(--color-surface-warm)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid #D6CEBE'
                  }}
                >
                  {game.badge}
                </span>
              </div>

              <h2 style={{ fontSize: 'calc(1.35rem * var(--font-scale))', margin: '0 0 8px 0', color: 'var(--color-text-primary)' }}>
                {game.title}
              </h2>

              <p style={{ fontSize: 'calc(0.95rem * var(--font-scale))', color: 'var(--color-text-secondary)', lineHeight: 1.45, margin: '0 0 16px 0' }}>
                {game.desc}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', paddingTop: '14px', borderTop: '1.5px solid #EBE4D5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'calc(0.85rem * var(--font-scale))', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                <Award size={16} color={game.color} />
                <span>{game.plays} sessions logged</span>
              </div>

              <TremorButton
                variant="primary"
                onClick={() => setActiveGame(game.id)}
                style={{ minHeight: '48px', padding: '8px 20px' }}
                ariaLabel={`Play ${game.title}`}
              >
                <span>{t.tapToPlay || 'Play'}</span>
                <Play size={16} fill="currentColor" />
              </TremorButton>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Helpers */}
      <PatientSosButton />
      <ConfusionHelpButton />
    </div>
  );
}
