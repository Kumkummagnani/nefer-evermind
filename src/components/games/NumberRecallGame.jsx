import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RotateCcw, Delete, Eye, EyeOff, Check, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../locales/translations';
import TremorButton from '../common/TremorButton';
import CelebrationOverlay from '../common/CelebrationOverlay';
import { sounds } from '../../services/soundEffects';

export default function NumberRecallGame({ onBack }) {
  const { currentUser, recordGameScore } = useApp();
  const lang = currentUser.language || 'en-IN';
  const t = translations[lang] || translations['en-IN'];

  const [level, setLevel] = useState(1); // 1 = 3 digits, 2 = 4 digits, 3 = 5 digits, 4 = 6 digits
  const [targetNumber, setTargetNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [phase, setPhase] = useState('memorize'); // 'memorize' | 'recall' | 'result'
  const [countdown, setCountdown] = useState(4);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const timerRef = useRef(null);

  // Generate random digits based on level (3 to 6 digits)
  const generateNumber = (digitCount) => {
    let num = '';
    for (let i = 0; i < digitCount; i++) {
      num += Math.floor(Math.random() * 9 + 1); // 1-9 to avoid leading zeros
    }
    return num;
  };

  // Start a round
  const startRound = (roundLevel) => {
    const digits = 2 + roundLevel; // level 1: 3 digits, level 2: 4 digits, etc.
    const newNum = generateNumber(digits);
    setTargetNumber(newNum);
    setUserInput('');
    setIsSuccess(null);
    setPhase('memorize');

    // Display time proportional to digits (e.g. 4s for 3 digits, 5s for 4 digits)
    const displaySeconds = 3 + roundLevel;
    setCountdown(displaySeconds);

    if (timerRef.current) clearInterval(timerRef.current);

    let remaining = displaySeconds;
    timerRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        setPhase('recall');
      }
    }, 1000);
  };

  useEffect(() => {
    startRound(level);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [level]);

  // Keypad click handler with audio tap
  const handleKeypadPress = (val) => {
    if (phase !== 'recall') return;
    sounds.playTap();

    if (val === 'DEL') {
      setUserInput((prev) => prev.slice(0, -1));
    } else if (userInput.length < targetNumber.length) {
      setUserInput((prev) => prev + val);
    }
  };

  // Check answer
  const submitAnswer = () => {
    if (userInput.length === 0) return;

    if (userInput === targetNumber) {
      sounds.playSuccess();
      setIsSuccess(true);
      const roundPoints = 25;
      const newTotal = totalScore + roundPoints;
      setTotalScore(newTotal);

      setTimeout(() => {
        if (level < 4) {
          setLevel((l) => l + 1);
        } else {
          // Finished all 4 levels
          recordGameScore({
            game: 'number',
            score: newTotal,
            maxScore: 100,
            moves: 4,
            timeSecs: 45
          });
          setIsGameComplete(true);
        }
      }, 1500);
    } else {
      sounds.playGentleTryAgain();
      setIsSuccess(false);
      // Give patient a gentle second try
      setTimeout(() => {
        setUserInput('');
        setIsSuccess(null);
        startRound(level);
      }, 2000);
    }
  };

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TremorButton variant="outline" onClick={onBack} style={{ minHeight: '48px', padding: '8px 18px' }}>
          <ArrowLeft size={20} />
          <span>{t.backToGames}</span>
        </TremorButton>

        <div style={{ fontSize: 'calc(1.125rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
          {t.level}: <strong style={{ color: 'var(--color-primary)', fontSize: 'calc(1.375rem * var(--font-scale))' }}>{level} / 4</strong>
        </div>

        <TremorButton variant="outline" onClick={() => { setLevel(1); startRound(1); }} style={{ minHeight: '48px', padding: '8px 18px' }}>
          <RotateCcw size={18} />
          <span>Reset</span>
        </TremorButton>
      </div>

      {/* Instructions Card */}
      <div className="card" style={{ marginBottom: '24px', textAlign: 'center', padding: '24px' }}>
        <h2 style={{ fontSize: 'calc(1.625rem * var(--font-scale))', color: 'var(--color-primary)', marginBottom: '6px' }}>
          {t.gameNumberTitle}
        </h2>
        <p style={{ fontSize: 'calc(1.1875rem * var(--font-scale))', color: 'var(--color-text-secondary)' }}>
          {phase === 'memorize'
            ? 'Look at the numbers below and remember them in your mind.'
            : 'Type the numbers you just saw using the big keypad.'}
        </p>
      </div>

      {/* Number Display Screen */}
      <div
        className="card"
        style={{
          minHeight: '160px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '28px',
          background: phase === 'memorize' ? 'var(--color-surface-warm)' : 'var(--color-surface)',
          border: '3px solid #DECBB1'
        }}
      >
        {phase === 'memorize' ? (
          <div>
            <div style={{ fontSize: 'calc(3.5rem * var(--font-scale))', fontWeight: 800, letterSpacing: '0.25em', color: 'var(--color-primary)' }}>
              {targetNumber}
            </div>
            <div style={{ marginTop: '10px', fontSize: 'calc(1rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
              Hiding in {countdown} seconds...
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 'calc(3.25rem * var(--font-scale))', fontWeight: 800, letterSpacing: '0.25em', minHeight: '68px', color: 'var(--color-text-primary)' }}>
              {userInput || '— — —'}
            </div>
            {isSuccess === true && (
              <div style={{ color: '#10B981', fontWeight: 800, fontSize: 'calc(1.25rem * var(--font-scale))', marginTop: '6px' }}>
                ✓ Correct! Moving to next level...
              </div>
            )}
            {isSuccess === false && (
              <div style={{ color: '#D97706', fontWeight: 700, fontSize: 'calc(1.1875rem * var(--font-scale))', marginTop: '6px' }}>
                Let us try this level again together.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Big Accessible Keypad (For Elderly Hand Tremors) */}
      <div className="keypad-grid" role="group" aria-label="Numeric Keypad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <button
            key={digit}
            type="button"
            className="keypad-key"
            disabled={phase === 'memorize'}
            onClick={() => handleKeypadPress(String(digit))}
            aria-label={`Digit ${digit}`}
          >
            {digit}
          </button>
        ))}

        {/* Delete */}
        <button
          type="button"
          className="keypad-key"
          disabled={phase === 'memorize'}
          onClick={() => handleKeypadPress('DEL')}
          style={{ background: '#FEE2E2', borderColor: '#FCA5A5', color: '#991B1B' }}
          aria-label="Delete digit"
        >
          <Delete size={28} />
        </button>

        {/* Zero */}
        <button
          type="button"
          className="keypad-key"
          disabled={phase === 'memorize'}
          onClick={() => handleKeypadPress('0')}
          aria-label="Digit 0"
        >
          0
        </button>

        {/* Submit */}
        <button
          type="button"
          className="keypad-key"
          disabled={phase === 'memorize' || userInput.length === 0}
          onClick={submitAnswer}
          style={{ background: '#ECFDF5', borderColor: '#6EE7B7', color: '#065F46' }}
          aria-label="Submit Answer"
        >
          <Check size={32} />
        </button>
      </div>

      {/* Victory Overlay */}
      {isGameComplete && (
        <CelebrationOverlay
          title={t.wellDone}
          score={totalScore}
          maxScore={100}
          details="Your working memory retention is sharp and agile!"
          language={lang}
          onPlayAgain={() => { setLevel(1); startRound(1); setIsGameComplete(false); }}
          onBackToGames={onBack}
        />
      )}
    </div>
  );
}
