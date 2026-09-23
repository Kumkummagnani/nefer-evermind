import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../services/soundEffects';

const PHASES = [
  { name: 'Breathe In...', subtext: 'Gently through your nose', duration: 4, isInhale: true },
  { name: 'Hold Gently', subtext: 'Keep the calm inside', duration: 4, isHold: true },
  { name: 'Breathe Out...', subtext: 'Slowly through your mouth', duration: 4, isInhale: false },
  { name: 'Rest & Peace', subtext: 'Feel the softness around you', duration: 2, isRest: true }
];

export default function CalmModeOverlay() {
  const { isCalmModeActive, toggleCalmMode, currentUser } = useApp();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].duration);

  useEffect(() => {
    if (!isCalmModeActive) return;

    // Start nature sound if not already started
    sounds.startCalmNatureSound();

    return () => {
      sounds.stopCalmNatureSound();
    };
  }, [isCalmModeActive]);

  useEffect(() => {
    if (!isCalmModeActive) return;

    // Play chime on phase transition
    const curPhase = PHASES[phaseIndex];
    if (curPhase.isInhale !== undefined) {
      sounds.playBreathingChime(curPhase.isInhale);
    }

    setSecondsLeft(curPhase.duration);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhaseIndex((p) => (p + 1) % PHASES.length);
          return PHASES[(phaseIndex + 1) % PHASES.length].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phaseIndex, isCalmModeActive]);

  if (!isCalmModeActive) return null;

  const currentPhase = PHASES[phaseIndex];
  const patientName = currentUser?.name || 'Friend';

  return (
    <div
      className="calm-mode-screen"
      role="dialog"
      aria-modal="true"
      aria-label="Calm breathing sanctuary"
    >
      <div style={{ maxWidth: '520px', width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: 'calc(1.75rem * var(--font-scale))' }}>🌿</span>
          <span style={{ fontSize: 'calc(1.25rem * var(--font-scale))', color: '#D6D3D1', letterSpacing: '0.05em', fontWeight: 600 }}>
            CALM SANCTUARY
          </span>
          <span style={{ fontSize: 'calc(1.75rem * var(--font-scale))' }}>🌿</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(24px, 4vw, 34px)',
            color: '#FEF3C7',
            fontWeight: 800,
            marginBottom: '8px'
          }}
        >
          Peaceful Breathing, {patientName}
        </h1>

        <p style={{ fontSize: 'calc(1.125rem * var(--font-scale))', color: '#A8A29E', marginBottom: '24px' }}>
          Listen to the gentle rainfall and follow the warm glowing light.
        </p>

        {/* Breathing Circle with dynamic scale */}
        <div
          className="calm-breathing-circle"
          style={{
            transform: currentPhase.isInhale
              ? 'scale(1.3)'
              : currentPhase.isHold
              ? 'scale(1.3)'
              : currentPhase.isInhale === false
              ? 'scale(0.85)'
              : 'scale(0.85)',
            transition: `transform ${currentPhase.duration}s ease-in-out`
          }}
        >
          <div style={{ textAlign: 'center', color: '#FFFFFF' }}>
            <span
              style={{
                display: 'block',
                fontSize: 'calc(3.25rem * var(--font-scale))',
                fontWeight: 900,
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {secondsLeft}
            </span>
            <span style={{ fontSize: 'calc(1rem * var(--font-scale))', opacity: 0.9, letterSpacing: '0.05em' }}>
              SECONDS
            </span>
          </div>
        </div>

        <div style={{ minHeight: '80px', marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 800,
              color: '#FDE68A',
              marginBottom: '6px'
            }}
          >
            {currentPhase.name}
          </h2>
          <p style={{ fontSize: 'calc(1.25rem * var(--font-scale))', color: '#E7E5E4' }}>
            {currentPhase.subtext}
          </p>
        </div>

        <button
          type="button"
          onClick={() => toggleCalmMode(false)}
          style={{
            minHeight: '62px',
            padding: '14px 36px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '2px solid rgba(254, 243, 199, 0.5)',
            color: '#FFFFFF',
            fontSize: 'calc(1.25rem * var(--font-scale))',
            fontWeight: 800,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'scale(1.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span>🌸</span>
          <span>Exit Calm Mode</span>
        </button>
      </div>
    </div>
  );
}
