import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { MEMORY_CARDS_DATA } from '../../assets/culturalData';
import { useApp } from '../../context/AppContext';
import { translations } from '../../locales/translations';
import TremorButton from '../common/TremorButton';
import CelebrationOverlay from '../common/CelebrationOverlay';
import { sounds } from '../../services/soundEffects';

export default function MemoryMatchGame({ onBack }) {
  const { currentUser, recordGameScore } = useApp();
  const lang = currentUser.language || 'en-IN';
  const t = translations[lang] || translations['en-IN'];

  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  // Tremor debouncing timestamp tracker
  const lastFlipTimestampRef = useRef(0);
  const isLockedRef = useRef(false);

  // Initialize and shuffle card deck
  const initGame = () => {
    // 6 pairs = 12 cards
    const deck = [];
    MEMORY_CARDS_DATA.slice(0, 6).forEach((item) => {
      deck.push({ ...item, uniqueKey: `${item.id}-a` });
      deck.push({ ...item, uniqueKey: `${item.id}-b` });
    });

    // Gentle shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedIndices([]);
    setMatchedIds([]);
    setMoves(0);
    setIsWon(false);
    isLockedRef.current = false;
    setStartTime(Date.now());
  };

  useEffect(() => {
    initGame();
  }, []);

  // Card Flip with 180ms Tremor Tolerance (ADD-ON 4)
  const handleCardClick = (index) => {
    const now = Date.now();
    // Shaky tremors: ignore taps within 180ms
    if (now - lastFlipTimestampRef.current < 180) {
      return;
    }
    lastFlipTimestampRef.current = now;

    if (isLockedRef.current) return;
    if (flippedIndices.includes(index)) return;
    if (matchedIds.includes(cards[index].id)) return;

    sounds.playTap();

    if (flippedIndices.length === 0) {
      setFlippedIndices([index]);
    } else if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const secondIndex = index;
      const newFlipped = [firstIndex, secondIndex];
      setFlippedIndices(newFlipped);
      setMoves((m) => m + 1);

      // Check for match
      if (cards[firstIndex].id === cards[secondIndex].id) {
        isLockedRef.current = true;
        setTimeout(() => {
          sounds.playSuccess();
          const newMatched = [...matchedIds, cards[firstIndex].id];
          setMatchedIds(newMatched);
          setFlippedIndices([]);
          isLockedRef.current = false;

          // Check for full victory
          if (newMatched.length === 6) {
            const timeTaken = Math.round((Date.now() - startTime) / 1000);
            const finalScore = Math.max(70, 100 - (moves - 6) * 3);
            recordGameScore({
              game: 'memory',
              score: finalScore,
              maxScore: 100,
              moves: moves + 1,
              timeSecs: timeTaken
            });
            setIsWon(true);
          }
        }, 550);
      } else {
        // Mismatch: flip back gently
        isLockedRef.current = true;
        setTimeout(() => {
          sounds.playGentleTryAgain();
          setFlippedIndices([]);
          isLockedRef.current = false;
        }, 1200);
      }
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      {/* Top Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <TremorButton variant="outline" onClick={onBack} style={{ minHeight: '48px', padding: '8px 18px' }}>
          <ArrowLeft size={20} />
          <span>{t.backToGames}</span>
        </TremorButton>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ fontSize: 'calc(1.125rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
            {t.moves}: <strong style={{ color: 'var(--color-primary)', fontSize: 'calc(1.375rem * var(--font-scale))' }}>{moves}</strong>
          </div>
          <div style={{ fontSize: 'calc(1.125rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
            {t.matched}: <strong style={{ color: 'var(--color-secondary)', fontSize: 'calc(1.375rem * var(--font-scale))' }}>{matchedIds.length} / 6</strong>
          </div>
        </div>

        <TremorButton variant="outline" onClick={initGame} style={{ minHeight: '48px', padding: '8px 18px' }}>
          <RotateCcw size={18} />
          <span>{t.playAgain}</span>
        </TremorButton>
      </div>

      {/* Game Title & Instructions */}
      <div className="card" style={{ marginBottom: '20px', padding: '20px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'calc(1.625rem * var(--font-scale))', color: 'var(--color-primary)', marginBottom: '6px' }}>
          {t.gameMemoryTitle}
        </h2>
        <p style={{ fontSize: 'calc(1.125rem * var(--font-scale))', color: 'var(--color-text-secondary)' }}>
          {t.gameMemoryDesc} — Tap any two cards to reveal and pair them.
        </p>
      </div>

      {/* Memory Grid with 150-200ms Tremor Protection */}
      <div className="memory-grid" role="grid" aria-label="Memory Match Cards">
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx);
          const isMatched = matchedIds.includes(card.id);

          return (
            <div
              key={card.uniqueKey}
              className={`memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
              onClick={() => handleCardClick(idx)}
              onPointerDown={(e) => {
                // Prevent rapid shaky duplicate events
                if (Date.now() - lastFlipTimestampRef.current < 180) {
                  e.preventDefault();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Card ${idx + 1}: ${isFlipped || isMatched ? card.title[lang] || card.title['en-IN'] : 'Hidden'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(idx);
                }
              }}
            >
              <div className="memory-card-inner">
                {/* Back side of card (facing user initially) */}
                <div className="memory-card-front">
                  <div style={{ fontSize: 'calc(2rem * var(--font-scale))', marginBottom: '4px' }}>🌿</div>
                  <div style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', fontWeight: 800, letterSpacing: '0.04em' }}>EVERMIND</div>
                  <div style={{ fontSize: 'calc(0.75rem * var(--font-scale))', opacity: 0.9 }}>TAP TO FLIP</div>
                </div>

                {/* Face side with North East cultural illustration */}
                <div className="memory-card-back">
                  <div style={{ fontSize: 'calc(2.875rem * var(--font-scale))', lineHeight: 1, marginBottom: '6px' }}>
                    {card.icon}
                  </div>
                  <div style={{ fontSize: 'calc(1.0625rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
                    {card.title[lang] || card.title['en-IN']}
                  </div>
                  <div style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {card.detail[lang] || card.detail['en-IN']}
                  </div>
                  {isMatched && (
                    <div style={{ marginTop: '4px', fontSize: 'calc(0.75rem * var(--font-scale))', fontWeight: 700, color: '#059669' }}>
                      ✓ Matched
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Victory Overlay */}
      {isWon && (
        <CelebrationOverlay
          title={t.wellDone}
          score={Math.max(75, 100 - (moves - 6) * 3)}
          details={`You matched all North East cultural symbols in ${moves} moves!`}
          language={lang}
          onPlayAgain={initGame}
          onBackToGames={onBack}
        />
      )}
    </div>
  );
}
