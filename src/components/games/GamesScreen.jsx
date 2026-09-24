import React from 'react';
import { Play, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import MemoryMatchGame from './MemoryMatchGame';
import DailyRecallGame from './DailyRecallGame';
import NumberRecallGame from './NumberRecallGame';
import FacesFamilyGame from './FacesFamilyGame';
import StoryRecallGame from './StoryRecallGame';
import PatientSosButton from '../common/PatientSosButton';
import ConfusionHelpButton from '../common/ConfusionHelpButton';
import { sounds } from '../../services/soundEffects';

const GAMES = [
  {
    id: 'memory',
    emoji: '🦏',
    color: '#9C4124',
    bgColor: '#FBEEE9',
    titleKey: 'gameMemoryTitle',
    defaultTitle: 'Memory Match',
    taglineKey: 'gameMemoryTagline',
    defaultTagline: 'Find pairs of matching pictures',
    descKey: 'gameMemoryDesc',
    defaultDesc: 'Flip cards and find the matching pairs. Go at your own pace — no rush!',
  },
  {
    id: 'daily',
    emoji: '🌅',
    color: '#2C6E49',
    bgColor: '#EBF5EE',
    titleKey: 'gameDailyTitle',
    defaultTitle: 'Daily Routine',
    taglineKey: 'gameDailyTagline',
    defaultTagline: 'Put morning activities in order',
    descKey: 'gameDailyDesc',
    defaultDesc: 'Arrange everyday activities in the right sequence — like your morning routine.',
  },
  {
    id: 'number',
    emoji: '🔢',
    color: '#D97706',
    bgColor: '#FEF3C7',
    titleKey: 'gameNumberTitle',
    defaultTitle: 'Number Memory',
    taglineKey: 'gameNumberTagline',
    defaultTagline: 'Remember and type back a number',
    descKey: 'gameNumberDesc',
    defaultDesc: 'Look at the number, then type it back after it disappears. Take your time!',
  },
  {
    id: 'faces',
    emoji: '👨‍👩‍👧',
    color: '#E07A5F',
    bgColor: '#FBF0EB',
    titleKey: 'gameFacesTitle',
    defaultTitle: 'Faces & Family',
    taglineKey: 'gameFacesTagline',
    defaultTagline: 'Name the people in the pictures',
    descKey: 'gameFacesDesc',
    defaultDesc: 'Look at the photographs and remember who each person is. A warm exercise!',
  },
  {
    id: 'story',
    emoji: '📖',
    color: '#7C2D12',
    bgColor: '#FEF2E8',
    titleKey: 'gameStoryTitle',
    defaultTitle: 'Story Time',
    taglineKey: 'gameStoryTagline',
    defaultTagline: 'Listen and recall the story',
    descKey: 'gameStoryDesc',
    defaultDesc: 'Listen to a gentle folk tale and answer a few simple questions about it.',
  },
];

function GameView({ gameId, onBack }) {
  const props = { onBack };
  return (
    <div style={{ paddingBottom: '80px' }}>
      {gameId === 'memory'  && <MemoryMatchGame  {...props} />}
      {gameId === 'daily'   && <DailyRecallGame  {...props} />}
      {gameId === 'number'  && <NumberRecallGame {...props} />}
      {gameId === 'faces'   && <FacesFamilyGame  {...props} />}
      {gameId === 'story'   && <StoryRecallGame  {...props} />}
      <PatientSosButton />
      <ConfusionHelpButton />
    </div>
  );
}

export default function GamesScreen() {
  const { activeGame, setActiveGame, gameScores = [], t = {} } = useApp();
  const safeScores = Array.isArray(gameScores) ? gameScores : [];

  if (activeGame) {
    return <GameView gameId={activeGame} onBack={() => setActiveGame(null)} />;
  }

  const handlePlay = (gameId) => {
    sounds.playTap();
    setActiveGame(gameId);
  };

  return (
    <div style={{ paddingBottom: '90px' }}>

      {/* ── Header ───────────────────────────────────────── */}
      <div style={{ marginBottom: '24px' }}>
        <div className="section-pill">
          <span>🧠</span>
          <span>{t.gamesScreenPill || 'Mind Exercises'}</span>
        </div>
        <h1 style={{
          fontSize: 'calc(1.75rem * var(--font-scale))',
          fontWeight: 900,
          color: 'var(--color-text-primary)',
          margin: '0 0 6px 0',
          lineHeight: 1.2,
        }}>
          {t.gamesTitle || 'Today\'s Games'}
        </h1>
        <p style={{
          fontSize: 'calc(1rem * var(--font-scale))',
          color: 'var(--color-text-secondary)',
          margin: 0,
          lineHeight: 1.55,
        }}>
          {t.gamesSubtitle || 'Gentle exercises to keep your mind active and bright. Choose any game to begin.'}
        </p>
      </div>

      {/* ── Game Cards ───────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} role="list">
        {GAMES.map(game => {
          const playCount = safeScores.filter(s => s.game === game.id).length;
          const title    = t[game.titleKey]    || game.defaultTitle;
          const tagline  = t[game.taglineKey]  || game.defaultTagline;
          const desc     = t[game.descKey]     || game.defaultDesc;

          return (
            <div
              key={game.id}
              className="game-card"
              style={{ borderLeftColor: game.color }}
              role="listitem"
            >
              {/* Icon */}
              <div
                className="game-card-icon"
                style={{ background: game.bgColor, borderColor: `${game.color}25` }}
                aria-hidden="true"
              >
                {game.emoji}
              </div>

              {/* Body */}
              <div className="game-card-body">
                <div style={{
                  fontSize: 'calc(0.75rem * var(--font-scale))',
                  fontWeight: 700,
                  color: game.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '3px',
                }}>
                  {tagline}
                </div>
                <div className="game-card-title">{title}</div>
                <div className="game-card-desc">{desc}</div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  {/* Play count */}
                  {playCount > 0 && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: 'calc(0.8125rem * var(--font-scale))',
                      color: 'var(--color-text-muted)',
                      fontWeight: 600,
                    }}>
                      <Award size={14} color={game.color} aria-hidden="true" />
                      <span>{playCount} {playCount === 1 ? 'session' : 'sessions'} played</span>
                    </div>
                  )}

                  {/* Play button */}
                  <button
                    type="button"
                    className="game-card-play-btn"
                    onClick={() => handlePlay(game.id)}
                    aria-label={`Play ${title}`}
                    style={{ background: game.color, marginLeft: playCount > 0 ? 'auto' : 0 }}
                  >
                    <Play size={16} fill="currentColor" aria-hidden="true" />
                    <span>{t.tapToPlay || 'Play'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Encouragement footer */}
      <div style={{
        marginTop: '28px',
        padding: '18px 20px',
        background: 'var(--color-surface-warm)',
        borderRadius: 'var(--radius-lg)',
        border: '1.5px solid var(--color-border)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '6px' }} aria-hidden="true">🌸</div>
        <p style={{
          fontSize: 'calc(0.9375rem * var(--font-scale))',
          color: 'var(--color-text-secondary)',
          margin: 0,
          lineHeight: 1.55,
        }}>
          {t.gamesEncouragement || 'Every game you play keeps your mind active. You\'re doing wonderfully!'}
        </p>
      </div>

      <PatientSosButton />
      <ConfusionHelpButton />
    </div>
  );
}
