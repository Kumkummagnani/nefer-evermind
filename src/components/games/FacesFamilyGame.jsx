import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Heart, Check, X } from 'lucide-react';
import { FAMILY_MEMBERS_DATA } from '../../assets/culturalData';
import { useApp } from '../../context/AppContext';
import { translations } from '../../locales/translations';
import TremorButton from '../common/TremorButton';
import CelebrationOverlay from '../common/CelebrationOverlay';
import { sounds } from '../../services/soundEffects';

export default function FacesFamilyGame({ onBack }) {
  const { currentUser, recordGameScore } = useApp();
  const lang = currentUser.language || 'en-IN';
  const t = translations[lang] || translations['en-IN'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentPerson = FAMILY_MEMBERS_DATA[currentIndex];

  // Prepare 4 options (1 correct + 3 distractors)
  const setupQuestion = (person) => {
    setSelectedOption(null);
    setIsAnswered(false);

    const correctName = (person.nativeNames && person.nativeNames[lang]) || person.name;
    const all = [correctName, ...person.distractors];

    // Shuffle options
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }

    setShuffledOptions(all);
  };

  useEffect(() => {
    if (currentPerson) {
      setupQuestion(currentPerson);
    }
  }, [currentIndex, lang]);

  const handleSelect = (chosenName) => {
    if (isAnswered) return;
    sounds.playTap();

    setSelectedOption(chosenName);
    setIsAnswered(true);

    const correctName = (currentPerson.nativeNames && currentPerson.nativeNames[lang]) || currentPerson.name;
    const isCorrect = chosenName === correctName;

    if (isCorrect) {
      sounds.playSuccess();
      setScore((s) => s + 25);
    } else {
      sounds.playGentleTryAgain();
    }

    // Advance to next family member after 1.8s
    setTimeout(() => {
      if (currentIndex < FAMILY_MEMBERS_DATA.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        const finalScore = score + (isCorrect ? 25 : 0);
        recordGameScore({
          game: 'faces',
          score: finalScore,
          maxScore: 100,
          moves: FAMILY_MEMBERS_DATA.length,
          timeSecs: 35
        });
        setIsComplete(true);
      }
    }, 1800);
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
    setupQuestion(FAMILY_MEMBERS_DATA[0]);
  };

  const correctName = currentPerson ? ((currentPerson.nativeNames && currentPerson.nativeNames[lang]) || currentPerson.name) : '';

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TremorButton variant="outline" onClick={onBack} style={{ minHeight: '48px', padding: '8px 18px' }}>
          <ArrowLeft size={20} />
          <span>{t.backToGames}</span>
        </TremorButton>

        <div style={{ fontSize: 'calc(1.125rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
          Person: <strong style={{ color: 'var(--color-primary)', fontSize: 'calc(1.375rem * var(--font-scale))' }}>{currentIndex + 1} / {FAMILY_MEMBERS_DATA.length}</strong>
        </div>

        <TremorButton variant="outline" onClick={restartGame} style={{ minHeight: '48px', padding: '8px 18px' }}>
          <RotateCcw size={18} />
          <span>{t.playAgain}</span>
        </TremorButton>
      </div>

      {/* Main Face Card */}
      {currentPerson && (
        <div className="card muga-border" style={{ textAlign: 'center', padding: '32px 24px', marginBottom: '28px' }}>
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: currentPerson.avatarBg || '#FDE68A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'calc(4rem * var(--font-scale))',
              margin: '0 auto 16px auto',
              border: '4px solid #DECBB1',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            {currentPerson.avatarEmoji}
          </div>

          <div className="cultural-header-badge" style={{ marginBottom: '10px' }}>
            <Heart size={16} fill="currentColor" />
            <span>{currentPerson.relation[lang] || currentPerson.relation['en-IN']}</span>
          </div>

          <p style={{ fontSize: 'calc(1.25rem * var(--font-scale))', color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '8px auto 0 auto' }}>
            {currentPerson.clue[lang] || currentPerson.clue['en-IN']}
          </p>

          <h3 style={{ fontSize: 'calc(1.5rem * var(--font-scale))', marginTop: '20px', color: 'var(--color-text-primary)' }}>
            Who is this loving person?
          </h3>
        </div>
      )}

      {/* 4 Large High-Contrast Options (Tremor Debounced) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {shuffledOptions.map((nameOption) => {
          const isSelected = selectedOption === nameOption;
          const isThisCorrect = nameOption === correctName;

          let btnBg = 'var(--color-surface)';
          let btnBorder = '3px solid #DECBB1';
          let textColor = 'var(--color-text-primary)';

          if (isAnswered) {
            if (isThisCorrect) {
              btnBg = '#ECFDF5';
              btnBorder = '3px solid #10B981';
              textColor = '#065F46';
            } else if (isSelected && !isThisCorrect) {
              btnBg = '#FEE2E2';
              btnBorder = '3px solid #EF4444';
              textColor = '#991B1B';
            }
          }

          return (
            <button
              key={nameOption}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(nameOption)}
              style={{
                background: btnBg,
                border: btnBorder,
                color: textColor,
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                minHeight: '74px',
                fontSize: 'calc(1.375rem * var(--font-scale))',
                fontWeight: 800,
                cursor: isAnswered ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{nameOption}</span>
              {isAnswered && isThisCorrect && <Check size={26} color="#10B981" />}
              {isAnswered && isSelected && !isThisCorrect && <X size={26} color="#EF4444" />}
            </button>
          );
        })}
      </div>

      {/* Victory Overlay */}
      {isComplete && (
        <CelebrationOverlay
          title={t.wellDone}
          score={score}
          maxScore={100}
          details="You have recognized your cherished family and caregivers!"
          language={lang}
          onPlayAgain={restartGame}
          onBackToGames={onBack}
        />
      )}
    </div>
  );
}
