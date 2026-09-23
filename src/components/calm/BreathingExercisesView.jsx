import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useSpeechContext } from '../../context/SpeechContext';
import { sounds } from '../../services/soundEffects';

const EXERCISES = [
  {
    id: 'box',
    title: 'Box Breathing (4-4-4-4)',
    icon: '📦',
    desc: 'Equal breath to soothe agitation, clear confusion, and restore peaceful focus.',
    phases: [
      { name: 'Breathe In Slowly', duration: 4, isInhale: true },
      { name: 'Hold the Peace', duration: 4, isHold: true },
      { name: 'Breathe Out Gently', duration: 4, isInhale: false },
      { name: 'Rest and Wait', duration: 4, isRest: true }
    ],
    remiGuide: "Let's breathe together in a gentle square. Breathe in for four... hold peacefully... breathe out smoothly... and rest. You are doing so well."
  },
  {
    id: '478',
    title: '4-7-8 Deep Relaxation Breath',
    icon: '🌊',
    desc: 'A deeply comforting rhythm that releases worry and prepares the mind for restorative sleep.',
    phases: [
      { name: 'Inhale Softly', duration: 4, isInhale: true },
      { name: 'Gently Hold', duration: 7, isHold: true },
      { name: 'Slow Sigh Exhale', duration: 8, isInhale: false }
    ],
    remiGuide: "Take a soft breath in through your nose... hold gently like a warm blanket... and let it all melt out with a long, slow sigh. Feel the tension leaving your shoulders."
  },
  {
    id: 'hand_stretch',
    title: 'Gentle Hand & Finger Stretch',
    icon: '🤲',
    desc: 'Soft hand movements to relieve stiffness, tremors, and bring peaceful tactile sensation.',
    phases: [
      { name: 'Open Palms Wide & Spread Fingers', duration: 6, isInhale: true },
      { name: 'Softly Curl into a Gentle Fist', duration: 6, isHold: true },
      { name: 'Slowly Roll Wrists in Circles', duration: 6, isInhale: false }
    ],
    remiGuide: "Hold both hands in front of you. Open your palms wide like a lotus flower... now gently curl your fingers into soft warm fists... and roll your wrists softly. Wonderful and loose."
  }
];

export default function BreathingExercisesView() {
  const { currentUser, t } = useApp();
  const { speak, isSpeaking, stopSpeaking } = useSpeechContext();

  const [activeExercise, setActiveExercise] = useState(EXERCISES[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(EXERCISES[0].phases[0].duration);

  // Switch exercise
  const handleSelectExercise = (ex) => {
    sounds.playTap();
    stopSpeaking();
    setActiveExercise(ex);
    setIsRunning(false);
    setPhaseIndex(0);
    setSecondsLeft(ex.phases[0].duration);
  };

  const handleToggleRun = () => {
    sounds.playTap();
    if (isRunning) {
      setIsRunning(false);
      stopSpeaking();
    } else {
      setIsRunning(true);
      setPhaseIndex(0);
      setSecondsLeft(activeExercise.phases[0].duration);
      if (activeExercise.phases[0].isInhale !== undefined) {
        sounds.playBreathingChime(activeExercise.phases[0].isInhale);
      }
    }
  };

  const handleRemiGuide = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    sounds.playTap();
    speak(activeExercise.remiGuide);
  };

  // Timer loop when running
  useEffect(() => {
    if (!isRunning) return;

    const curPhase = activeExercise.phases[phaseIndex];
    if (curPhase?.isInhale !== undefined) {
      sounds.playBreathingChime(curPhase.isInhale);
    }

    setSecondsLeft(curPhase.duration);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhaseIndex((p) => {
            const nextP = (p + 1) % activeExercise.phases.length;
            return nextP;
          });
          return activeExercise.phases[(phaseIndex + 1) % activeExercise.phases.length].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, phaseIndex, activeExercise]);

  const curPhase = activeExercise.phases[phaseIndex];
  const patientName = currentUser?.name || 'Friend';

  return (
    <div className="container" style={{ paddingBottom: '90px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FFF9F0 0%, #F5ECE0 100%)',
          borderRadius: '24px',
          border: '2px solid #DECBB1',
          padding: '28px 24px',
          marginBottom: '28px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: 'calc(2rem * var(--font-scale))' }}>🌬️</span>
              <h1 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: 'var(--color-primary-dark, #5C2415)', margin: 0 }}>
                {t.breathingTitle || 'Calm Breath & Relaxation'}
              </h1>
            </div>
            <p style={{ fontSize: 'calc(1.1875rem * var(--font-scale))', color: '#6A564A', margin: 0 }}>
              {t.breathingSubtitle || 'Gentle breathing rhythms and hand stretches to bring comfort to your body and mind.'}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRemiGuide}
            style={{
              minHeight: '56px',
              padding: '12px 24px',
              fontSize: 'calc(1.1875rem * var(--font-scale))',
              fontWeight: 800,
              borderRadius: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>{isSpeaking ? '⏹️ Stop Voice' : `🎙️ ${t.remiVoiceGuide || 'Remi Voice Guide'}`}</span>
          </button>
        </div>
      </div>

      {/* Exercise Selector Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {EXERCISES.map((ex) => {
          const isSelected = activeExercise.id === ex.id;
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => handleSelectExercise(ex)}
              style={{
                minHeight: '80px',
                padding: '16px 20px',
                borderRadius: '20px',
                background: isSelected ? 'var(--color-surface-warm, #FAF6F0)' : '#FFFFFF',
                border: isSelected ? '3px solid var(--color-primary, #E07A5F)' : '2px solid #DECBB1',
                boxShadow: isSelected ? '0 8px 24px rgba(224, 122, 95, 0.2)' : 'var(--shadow-sm)',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'all 0.18s ease'
              }}
            >
              <span style={{ fontSize: 'calc(2.25rem * var(--font-scale))', lineHeight: 1 }}>{ex.icon}</span>
              <div>
                <h3 style={{ fontSize: 'calc(1.125rem * var(--font-scale))', fontWeight: 800, color: '#2D1B13', margin: '0 0 4px 0' }}>
                  {ex.title}
                </h3>
                <p style={{ fontSize: 'calc(0.875rem * var(--font-scale))', color: '#6A564A', margin: 0, lineHeight: 1.3 }}>
                  {ex.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Pacing Display Card */}
      <div
        className="card"
        style={{
          background: '#FFFFFF',
          borderRadius: '28px',
          border: '3px solid #DECBB1',
          padding: '40px 24px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <h2 style={{ fontSize: 'clamp(24px, 3.8vw, 32px)', fontWeight: 800, color: 'var(--color-primary-dark, #5C2415)', marginBottom: '8px' }}>
          {activeExercise.title}
        </h2>
        <p style={{ fontSize: 'calc(1.25rem * var(--font-scale))', color: '#6A564A', maxWidth: '560px', margin: '0 auto 32px' }}>
          {activeExercise.desc}
        </p>

        {/* Dynamic Breathing Visual Circle */}
        <div
          style={{
            width: '230px',
            height: '230px',
            borderRadius: '50%',
            margin: '0 auto 36px',
            background: isRunning
              ? 'radial-gradient(circle, rgba(224, 122, 95, 0.35) 0%, rgba(244, 241, 238, 0.1) 70%)'
              : '#FAF6F0',
            border: isRunning ? '4px solid var(--color-primary, #E07A5F)' : '3px dashed #DECBB1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isRunning && curPhase?.isInhale
              ? 'scale(1.25)'
              : isRunning && curPhase?.isInhale === false
              ? 'scale(0.85)'
              : 'scale(1)',
            transition: isRunning ? `transform ${curPhase?.duration || 4}s ease-in-out` : 'none',
            boxShadow: isRunning ? '0 0 40px rgba(224, 122, 95, 0.35)' : 'none'
          }}
        >
          {isRunning ? (
            <>
              <span style={{ fontSize: 'calc(3.5rem * var(--font-scale))', fontWeight: 900, color: 'var(--color-primary-dark, #5C2415)', lineHeight: 1 }}>
                {secondsLeft}
              </span>
              <span style={{ fontSize: 'calc(1.125rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-primary)', marginTop: '4px' }}>
                SECONDS
              </span>
            </>
          ) : (
            <span style={{ fontSize: 'calc(3rem * var(--font-scale))' }}>🌸</span>
          )}
        </div>

        {/* Phase Instruction Text */}
        <div style={{ minHeight: '80px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: 'clamp(26px, 4vw, 34px)', fontWeight: 800, color: 'var(--color-primary-dark, #5C2415)', marginBottom: '6px' }}>
            {isRunning ? curPhase?.name : 'Ready when you are'}
          </h3>
          <p style={{ fontSize: 'calc(1.25rem * var(--font-scale))', color: '#57483E' }}>
            {isRunning ? `Step ${phaseIndex + 1} of ${activeExercise.phases.length}` : 'Tap Start to begin your soothing pacing.'}
          </p>
        </div>

        {/* Start / Pause Button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleToggleRun}
            style={{
              minHeight: '64px',
              padding: '14px 44px',
              fontSize: 'calc(1.375rem * var(--font-scale))',
              fontWeight: 800,
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(224, 122, 95, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span>{isRunning ? (t.pauseRhythm || '⏸️ Pause') : (t.startRhythm || '▶️ Start Calming Rhythm')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
