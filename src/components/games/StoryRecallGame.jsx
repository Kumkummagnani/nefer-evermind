import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2, RotateCcw, Play, Pause, Check, X, Sparkles, BookOpen } from 'lucide-react';
import { CULTURAL_STORIES } from '../../assets/culturalData';
import { useApp } from '../../context/AppContext';
import { useSpeechContext } from '../../context/SpeechContext';
import { translations } from '../../locales/translations';
import TremorButton from '../common/TremorButton';
import CelebrationOverlay from '../common/CelebrationOverlay';
import { sounds } from '../../services/soundEffects';

export default function StoryRecallGame({ onBack }) {
  const { currentUser, recordGameScore } = useApp();
  const lang = currentUser.language || 'en-IN';
  const t = translations[lang] || translations['en-IN'];
  const { speak, stopSpeaking, isSpeaking } = useSpeechContext();

  const storyData = CULTURAL_STORIES[lang] || CULTURAL_STORIES['en-IN'];

  const [activeWordIdx, setActiveWordIdx] = useState(-1);
  const [phase, setPhase] = useState('reading'); // 'reading' | 'comprehension' | 'complete'
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);

  const wordSpanRefs = useRef([]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  // ADD-ON 2: Real-time audio-visual word sync via onboundary event
  const startStoryNarration = () => {
    setActiveWordIdx(0);
    sounds.playTap();

    const fullText = storyData.text;
    const words = storyData.words;

    // Precalculate character offsets of words for exact boundary matching
    const wordOffsets = [];
    let curOffset = 0;
    words.forEach((w) => {
      const idx = fullText.indexOf(w.replace(/[.,!?]/g, ''), curOffset);
      const start = idx >= 0 ? idx : curOffset;
      wordOffsets.push(start);
      curOffset = start + w.length;
    });

    speak(fullText, {
      rate: 0.84, // Gentle calm reading pace for dementia care
      onBoundary: (event) => {
        // SpeechSynthesisUtterance boundary event provides charIndex
        if (event.charIndex !== undefined) {
          // Find matching word
          let matchedIndex = 0;
          for (let i = 0; i < wordOffsets.length; i++) {
            if (event.charIndex >= wordOffsets[i]) {
              matchedIndex = i;
            } else {
              break;
            }
          }
          setActiveWordIdx(matchedIndex);

          // Gently scroll highlighted word into view if needed
          if (wordSpanRefs.current[matchedIndex]) {
            wordSpanRefs.current[matchedIndex].scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      },
      onEnd: () => {
        setActiveWordIdx(-1);
        // Transition smoothly to comprehension question phase
        setTimeout(() => {
          setPhase('comprehension');
          sounds.playSuccess();
        }, 1200);
      }
    });
  };

  const handlePauseResume = () => {
    if (isSpeaking) {
      stopSpeaking();
      setActiveWordIdx(-1);
    } else {
      startStoryNarration();
    }
  };

  // Answer a comprehension question
  const handleAnswerSelect = (optionIdx) => {
    if (isAnswerChecked) return;
    sounds.playTap();

    setSelectedAnswer(optionIdx);
    setIsAnswerChecked(true);

    const curQ = storyData.questions[questionIdx];
    const isCorrect = optionIdx === curQ.correctIndex;

    if (isCorrect) {
      sounds.playSuccess();
      setScore((s) => s + 35);
    } else {
      sounds.playGentleTryAgain();
    }

    setTimeout(() => {
      if (questionIdx < storyData.questions.length - 1) {
        setQuestionIdx((q) => q + 1);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
      } else {
        const finalScore = Math.min(100, score + (isCorrect ? 35 : 0));
        recordGameScore({
          game: 'story',
          score: finalScore,
          maxScore: 100,
          moves: storyData.questions.length,
          timeSecs: 60
        });
        setPhase('complete');
      }
    }, 2200);
  };

  const currentQ = storyData.questions && storyData.questions[questionIdx];

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TremorButton variant="outline" onClick={onBack} style={{ minHeight: '48px', padding: '8px 18px' }}>
          <ArrowLeft size={20} />
          <span>{t.backToGames}</span>
        </TremorButton>

        <div className="cultural-header-badge">
          <BookOpen size={16} />
          <span>{storyData.region}</span>
        </div>

        <TremorButton
          variant="outline"
          onClick={() => { stopSpeaking(); setPhase('reading'); setActiveWordIdx(-1); setQuestionIdx(0); setScore(0); }}
          style={{ minHeight: '48px', padding: '8px 18px' }}
        >
          <RotateCcw size={18} />
          <span>Reset</span>
        </TremorButton>
      </div>

      {phase === 'reading' && (
        <div className="card muga-border" style={{ padding: '36px 30px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: 'calc(1.875rem * var(--font-scale))', color: 'var(--color-primary)', marginBottom: '8px' }}>
              {storyData.title}
            </h2>
            <p style={{ fontSize: 'calc(1.1875rem * var(--font-scale))', color: 'var(--color-text-secondary)' }}>
              Listen carefully as each word is spoken and highlighted in soft amber.
            </p>
          </div>

          {/* Synchronized Word Highlighting Container (ADD-ON 2) */}
          <div
            style={{
              fontSize: 'calc(1.5625rem * var(--font-scale))',
              lineHeight: 1.8,
              padding: '28px 24px',
              background: 'var(--color-surface-warm)',
              borderRadius: 'var(--radius-md)',
              border: '2px solid #DECBB1',
              marginBottom: '28px',
              minHeight: '180px'
            }}
          >
            {storyData.words.map((word, idx) => {
              const isHighlight = activeWordIdx === idx;
              return (
                <span
                  key={idx}
                  ref={(el) => (wordSpanRefs.current[idx] = el)}
                  className={`story-word ${isHighlight ? 'highlighted' : ''}`}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* Audio Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <TremorButton
              variant="primary"
              size="large"
              onClick={handlePauseResume}
              style={{ minWidth: '260px' }}
            >
              {isSpeaking ? (
                <>
                  <Pause size={24} />
                  <span>Pause Reading</span>
                </>
              ) : (
                <>
                  <Volume2 size={24} />
                  <span>{activeWordIdx >= 0 ? 'Resume Narration' : 'Read Aloud with Highlighting'}</span>
                </>
              )}
            </TremorButton>

            <TremorButton
              variant="outline"
              size="large"
              onClick={() => { stopSpeaking(); setPhase('comprehension'); }}
            >
              <span>Skip to Questions</span>
            </TremorButton>
          </div>
        </div>
      )}

      {/* Comprehension Question Phase */}
      {phase === 'comprehension' && currentQ && (
        <div className="card" style={{ padding: '36px 28px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span
              style={{
                fontSize: 'calc(0.9375rem * var(--font-scale))',
                fontWeight: 800,
                color: 'var(--color-secondary)',
                background: 'var(--color-secondary-light)',
                padding: '4px 14px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              Question {questionIdx + 1} of {storyData.questions.length}
            </span>
            <h2 style={{ fontSize: 'calc(1.625rem * var(--font-scale))', marginTop: '14px', color: 'var(--color-text-primary)' }}>
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswer === oIdx;
              const isCorrect = oIdx === currentQ.correctIndex;

              let border = '2px solid #DECBB1';
              let bg = 'var(--color-surface)';
              let color = 'var(--color-text-primary)';

              if (isAnswerChecked) {
                if (isCorrect) {
                  bg = '#ECFDF5';
                  border = '3px solid #10B981';
                  color = '#065F46';
                } else if (isSelected && !isCorrect) {
                  bg = '#FEE2E2';
                  border = '3px solid #EF4444';
                  color = '#991B1B';
                }
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  disabled={isAnswerChecked}
                  onClick={() => handleAnswerSelect(oIdx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 24px',
                    borderRadius: 'var(--radius-md)',
                    border,
                    background: bg,
                    color,
                    fontSize: 'calc(1.375rem * var(--font-scale))',
                    fontWeight: 700,
                    cursor: isAnswerChecked ? 'default' : 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <span>{opt}</span>
                  {isAnswerChecked && isCorrect && <Check size={26} color="#10B981" />}
                  {isAnswerChecked && isSelected && !isCorrect && <X size={26} color="#EF4444" />}
                </button>
              );
            })}
          </div>

          {isAnswerChecked && (
            <div
              style={{
                background: 'var(--color-surface-warm)',
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                fontSize: 'calc(1.125rem * var(--font-scale))',
                color: 'var(--color-text-secondary)',
                border: '1.5px solid #DECBB1'
              }}
            >
              💡 {currentQ.explanation}
            </div>
          )}
        </div>
      )}

      {/* Victory Overlay */}
      {phase === 'complete' && (
        <CelebrationOverlay
          title={t.wellDone}
          score={score}
          maxScore={100}
          details="You have engaged with folklore and retained every detail!"
          language={lang}
          onPlayAgain={() => { setPhase('reading'); setQuestionIdx(0); setScore(0); }}
          onBackToGames={onBack}
        />
      )}
    </div>
  );
}
