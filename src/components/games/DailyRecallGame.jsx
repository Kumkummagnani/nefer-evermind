import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RotateCcw, ArrowUp, ArrowDown, Check, GripVertical } from 'lucide-react';
import { DAILY_ROUTINE_STEPS } from '../../assets/culturalData';
import { useApp } from '../../context/AppContext';
import { translations } from '../../locales/translations';
import TremorButton from '../common/TremorButton';
import CelebrationOverlay from '../common/CelebrationOverlay';
import { sounds } from '../../services/soundEffects';

export default function DailyRecallGame({ onBack }) {
  const { currentUser, recordGameScore } = useApp();
  const lang = currentUser.language || 'en-IN';
  const t = translations[lang] || translations['en-IN'];

  const [items, setItems] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [moves, setMoves] = useState(0);

  // Drag state
  const dragItemRef = useRef(null);
  const dragOverItemRef = useRef(null);
  const lastTapTimeRef = useRef(0);

  // Shuffle initial routine items
  const initGame = () => {
    // Clone and shuffle
    const shuffled = [...DAILY_ROUTINE_STEPS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setItems(shuffled);
    setSelectedIdx(null);
    setIsChecked(false);
    setIsWon(false);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Swap two items
  const swapItems = (fromIdx, toIdx) => {
    if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || fromIdx >= items.length || toIdx >= items.length) {
      return;
    }
    sounds.playTap();
    const updated = [...items];
    const temp = updated[fromIdx];
    updated[fromIdx] = updated[toIdx];
    updated[toIdx] = temp;
    setItems(updated);
    setSelectedIdx(null);
    setMoves((m) => m + 1);
  };

  // Tremor-Tolerant Item Selection & Swap (ADD-ON 4)
  const handleItemTap = (index) => {
    const now = Date.now();
    if (now - lastTapTimeRef.current < 180) return;
    lastTapTimeRef.current = now;

    if (selectedIdx === null) {
      sounds.playTap();
      setSelectedIdx(index);
    } else if (selectedIdx === index) {
      setSelectedIdx(null);
    } else {
      swapItems(selectedIdx, index);
    }
  };

  // Move up/down buttons for tremors
  const moveItem = (index, direction) => {
    const now = Date.now();
    if (now - lastTapTimeRef.current < 180) return;
    lastTapTimeRef.current = now;

    const targetIdx = index + direction;
    swapItems(index, targetIdx);
  };

  // HTML5 Drag & Drop handlers with debounce
  const handleDragStart = (e, index) => {
    dragItemRef.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e, index) => {
    dragOverItemRef.current = index;
  };

  const handleDragEnd = () => {
    if (dragItemRef.current !== null && dragOverItemRef.current !== null) {
      swapItems(dragItemRef.current, dragOverItemRef.current);
    }
    dragItemRef.current = null;
    dragOverItemRef.current = null;
  };

  // Check user arrangement
  const verifyOrder = () => {
    setIsChecked(true);
    let correctCount = 0;
    items.forEach((item, idx) => {
      if (item.order === idx + 1) {
        correctCount++;
      }
    });

    if (correctCount === items.length) {
      sounds.playSuccess();
      recordGameScore({
        game: 'daily',
        score: 100,
        maxScore: 100,
        moves,
        timeSecs: 30
      });
      setIsWon(true);
    } else {
      sounds.playGentleTryAgain();
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <TremorButton variant="outline" onClick={onBack} style={{ minHeight: '48px', padding: '8px 18px' }}>
          <ArrowLeft size={20} />
          <span>{t.backToGames}</span>
        </TremorButton>

        <div style={{ fontSize: 'calc(1.125rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-secondary)' }}>
          {t.moves}: <strong style={{ color: 'var(--color-primary)', fontSize: 'calc(1.375rem * var(--font-scale))' }}>{moves}</strong>
        </div>

        <TremorButton variant="outline" onClick={initGame} style={{ minHeight: '48px', padding: '8px 18px' }}>
          <RotateCcw size={18} />
          <span>{t.playAgain}</span>
        </TremorButton>
      </div>

      {/* Instructions Card */}
      <div className="card" style={{ marginBottom: '24px', textAlign: 'center', padding: '24px' }}>
        <h2 style={{ fontSize: 'calc(1.625rem * var(--font-scale))', color: 'var(--color-primary)', marginBottom: '8px' }}>
          {t.gameDailyTitle}
        </h2>
        <p style={{ fontSize: 'calc(1.1875rem * var(--font-scale))', color: 'var(--color-text-secondary)' }}>
          {t.gameDailyDesc} — Drag items or tap one, then tap another to swap places!
        </p>
      </div>

      {/* Routine Ordering List */}
      <div className="routine-list" role="list" aria-label="Morning Routine Order">
        {items.map((item, idx) => {
          const isSelected = selectedIdx === idx;
          const isCorrect = isChecked && item.order === idx + 1;
          const isWrong = isChecked && item.order !== idx + 1;

          return (
            <div
              key={item.id}
              role="listitem"
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragEnter={(e) => handleDragEnter(e, idx)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`routine-item ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''}`}
              style={{
                borderColor: isCorrect ? '#10B981' : isWrong ? '#F59E0B' : isSelected ? 'var(--color-primary)' : '#DECBB1',
                background: isCorrect ? '#ECFDF5' : isSelected ? 'var(--color-primary-light)' : 'var(--color-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)'
              }}
              onClick={() => handleItemTap(idx)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <div style={{ cursor: 'grab', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center' }}>
                  <GripVertical size={24} />
                </div>

                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--color-surface-warm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 'calc(1.25rem * var(--font-scale))',
                    border: '2px solid #DECBB1',
                    color: 'var(--color-primary)'
                  }}
                >
                  {idx + 1}
                </div>

                <div style={{ fontSize: 'calc(2.25rem * var(--font-scale))', lineHeight: 1 }}>{item.icon}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'calc(1.25rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                    {item.title[lang] || item.title['en-IN']}
                  </div>
                  <div style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {item.tip[lang] || item.tip['en-IN']}
                  </div>
                </div>
              </div>

              {/* Accessible Movement Buttons for Tremor Users */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); moveItem(idx, -1); }}
                    aria-label={`Move ${item.title[lang] || item.title['en-IN']} up`}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-sm)',
                      border: '2px solid #D6CEBE',
                      background: 'var(--color-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ArrowUp size={22} color="var(--color-text-primary)" />
                  </button>
                )}

                {idx < items.length - 1 && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); moveItem(idx, 1); }}
                    aria-label={`Move ${item.title[lang] || item.title['en-IN']} down`}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-sm)',
                      border: '2px solid #D6CEBE',
                      background: 'var(--color-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ArrowDown size={22} color="var(--color-text-primary)" />
                  </button>
                )}

                {isCorrect && <Check size={26} color="#10B981" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Verify Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <TremorButton
          variant="secondary"
          size="large"
          onClick={verifyOrder}
          style={{ minWidth: '280px' }}
        >
          <Check size={26} />
          <span>Check Routine Order</span>
        </TremorButton>
      </div>

      {/* Victory Overlay */}
      {isWon && (
        <CelebrationOverlay
          title={t.wellDone}
          score={100}
          details="You have perfectly ordered your morning peaceful routine!"
          language={lang}
          onPlayAgain={initGame}
          onBackToGames={onBack}
        />
      )}
    </div>
  );
}
