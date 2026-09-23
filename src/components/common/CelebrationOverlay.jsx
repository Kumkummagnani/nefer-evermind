import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, ArrowRight, RotateCcw } from 'lucide-react';
import TremorButton from './TremorButton';
import { sounds } from '../../services/soundEffects';
import { translations } from '../../locales/translations';

export default function CelebrationOverlay({
  title,
  score,
  maxScore = 100,
  details,
  language = 'en-IN',
  onPlayAgain,
  onBackToGames
}) {
  const t = translations[language] || translations['en-IN'];

  useEffect(() => {
    sounds.playSuccess();
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9C4124', '#2C6E49', '#E07A5F', '#D97706', '#10B981']
      });
    } catch (e) {
      // Ignored
    }
  }, []);

  return (
    <div className="escalation-overlay" style={{ zIndex: 1100 }}>
      <div
        className="card"
        style={{
          maxWidth: '560px',
          width: '100%',
          textAlign: 'center',
          padding: '40px 32px',
          border: '4px solid var(--color-secondary)'
        }}
      >
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'var(--color-secondary-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}
        >
          <Award size={54} color="var(--color-secondary)" />
        </div>

        <h2 style={{ fontSize: 'calc(2rem * var(--font-scale))', marginBottom: '8px', color: 'var(--color-secondary)' }}>
          {title || t.wellDone}
        </h2>

        <p style={{ fontSize: 'calc(1.25rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
          {details || 'You have strengthened your focus and memory today!'}
        </p>

        {score !== undefined && (
          <div
            style={{
              background: 'var(--color-surface-warm)',
              padding: '16px 28px',
              borderRadius: 'var(--radius-md)',
              display: 'inline-block',
              marginBottom: '28px',
              border: '2px solid #D6CEBE'
            }}
          >
            <span style={{ fontSize: 'calc(1.125rem * var(--font-scale))', color: 'var(--color-text-secondary)' }}>
              {t.score}:{' '}
            </span>
            <strong style={{ fontSize: 'calc(1.875rem * var(--font-scale))', color: 'var(--color-primary)' }}>
              {score} / {maxScore}
            </strong>
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {onPlayAgain && (
            <TremorButton variant="outline" onClick={onPlayAgain}>
              <RotateCcw size={22} />
              <span>{t.playAgain}</span>
            </TremorButton>
          )}

          {onBackToGames && (
            <TremorButton variant="primary" onClick={onBackToGames}>
              <span>{t.backToGames}</span>
              <ArrowRight size={22} />
            </TremorButton>
          )}
        </div>
      </div>
    </div>
  );
}
