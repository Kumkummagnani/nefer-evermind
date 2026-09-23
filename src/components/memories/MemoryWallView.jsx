import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useSpeechContext } from '../../context/SpeechContext';
import { sounds } from '../../services/soundEffects';

export default function MemoryWallView() {
  const { memories, addMemory, currentUser, t } = useApp();
  const { speak, isSpeaking, stopSpeaking } = useSpeechContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const currentMem = memories[currentIndex] || memories[0];

  const handleNext = () => {
    sounds.playTap();
    stopSpeaking();
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrev = () => {
    sounds.playTap();
    stopSpeaking();
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleReadAloud = (mem) => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    sounds.playTap();
    const narration = `${mem.title}. ${mem.caption}. Remi remembers this sweet moment with you.`;
    speak(narration);
  };

  const handleSaveMemory = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addMemory({
      title: newTitle.trim(),
      caption: newCaption.trim() || 'A cherished family memory filled with warmth and love.',
      image: '/memories/tea-garden.jpg'
    });

    setNewTitle('');
    setNewCaption('');
    setShowAddModal(false);
    sounds.playSuccess();
  };

  // Get image src with robust fallbacks
  const getImageSrc = (mem, idx) => {
    if (mem.image && (mem.image.startsWith('/memories/') || mem.image.startsWith('/hero-banner.jpg'))) {
      return mem.image;
    }
    if (idx % 2 === 0) return '/memories/tea-garden.jpg';
    return '/memories/bihu-dance.jpg';
  };

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
              <span style={{ fontSize: 'calc(2rem * var(--font-scale))' }}>🖼️</span>
              <h1 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, color: 'var(--color-primary-dark, #5C2415)', margin: 0 }}>
                {t.memoriesTitle || 'My Family Memories'}
              </h1>
            </div>
            <p style={{ fontSize: 'calc(1.1875rem * var(--font-scale))', color: '#6A564A', margin: 0 }}>
              {t.memoriesSubtitle || 'Look at cherished photos and listen as Remi reads each story aloud.'}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setShowAddModal(true)}
            style={{
              minHeight: '52px',
              padding: '10px 20px',
              fontSize: 'calc(1.125rem * var(--font-scale))',
              fontWeight: 700,
              borderRadius: '16px',
              borderColor: 'var(--color-primary)'
            }}
          >
            <span>{t.addMemoryBtn || '➕ Add a Memory'}</span>
          </button>
        </div>
      </div>

      {/* Featured Slide Card */}
      {currentMem && (
        <div className="memory-wall-card">
          <div style={{ position: 'relative', width: '100%', maxHeight: '440px', overflow: 'hidden', background: '#2D1B13' }}>
            <img
              src={getImageSrc(currentMem, currentIndex)}
              alt={currentMem.title}
              style={{
                width: '100%',
                height: '420px',
                objectFit: 'cover',
                display: 'block'
              }}
              onError={(e) => {
                e.target.src = '/hero-banner.jpg';
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(23, 20, 18, 0.75)',
                color: '#FFF9F0',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: 'calc(1rem * var(--font-scale))',
                fontWeight: 700,
                backdropFilter: 'blur(4px)'
              }}
            >
              Photo {currentIndex + 1} of {memories.length}
            </div>
          </div>

          <div style={{ padding: '28px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 800, color: 'var(--color-primary-dark, #5C2415)', margin: 0 }}>
                  {currentMem.title}
                </h2>
                {currentMem.date && (
                  <span style={{ fontSize: 'calc(1.0625rem * var(--font-scale))', color: '#8C7769', fontWeight: 600 }}>
                    📅 {currentMem.date}
                  </span>
                )}
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleReadAloud(currentMem)}
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
                <span>{isSpeaking ? '⏹️ Stop Voice' : (t.memoriesReadAloud || '🎙️ Remi Read Aloud')}</span>
              </button>
            </div>

            <p style={{ fontSize: 'clamp(20px, 2.4vw, 24px)', lineHeight: 1.6, color: '#33241C', marginBottom: '24px' }}>
              {currentMem.caption}
            </p>

            {/* Previous and Next Big Navigation Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', borderTop: '2px solid #F0E6D8', paddingTop: '20px' }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handlePrev}
                style={{
                  flex: 1,
                  minHeight: '60px',
                  fontSize: 'calc(1.25rem * var(--font-scale))',
                  fontWeight: 800,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <span>{t.prevMemory || '⬅️ Previous Memory'}</span>
              </button>

              <button
                type="button"
                className="btn btn-outline"
                onClick={handleNext}
                style={{
                  flex: 1,
                  minHeight: '60px',
                  fontSize: 'calc(1.25rem * var(--font-scale))',
                  fontWeight: 800,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                <span>{t.nextMemory || 'Next Memory ➡️'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnail Gallery */}
      <h3 style={{ fontSize: 'calc(1.375rem * var(--font-scale))', fontWeight: 800, color: '#4A3B32', marginTop: '36px', marginBottom: '16px' }}>
        All Photo Memories ({memories.length})
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '18px' }}>
        {memories.map((mem, idx) => (
          <div
            key={mem.id || idx}
            onClick={() => {
              sounds.playTap();
              stopSpeaking();
              setCurrentIndex(idx);
            }}
            style={{
              borderRadius: '18px',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: currentIndex === idx ? '3px solid var(--color-primary)' : '2px solid #DECBB1',
              boxShadow: currentIndex === idx ? '0 8px 24px rgba(224, 122, 95, 0.25)' : 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'all 0.18s ease'
            }}
          >
            <img
              src={getImageSrc(mem, idx)}
              alt={mem.title}
              style={{ width: '100%', height: '160px', objectFit: 'cover' }}
              onError={(e) => { e.target.src = '/hero-banner.jpg'; }}
            />
            <div style={{ padding: '12px 14px' }}>
              <h4 style={{ fontSize: 'calc(1.0625rem * var(--font-scale))', fontWeight: 800, color: '#2D1B13', margin: '0 0 4px 0' }}>
                {mem.title}
              </h4>
              <p style={{ fontSize: 'calc(0.875rem * var(--font-scale))', color: '#6A564A', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {mem.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Memory Modal */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-memory-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 20, 18, 0.72)',
            backdropFilter: 'blur(6px)',
            zIndex: 1400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="card"
            style={{
              maxWidth: '540px',
              width: '100%',
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid #DECBB1',
              padding: '28px',
              animation: 'slideDown 0.25s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="add-memory-title" style={{ fontSize: 'calc(1.5rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
              Add a New Family Memory
            </h2>

            <form onSubmit={handleSaveMemory}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: 'calc(1.0625rem * var(--font-scale))', fontWeight: 700, marginBottom: '6px' }}>
                  Memory Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Picnic in Shillong with Children"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 'calc(1.125rem * var(--font-scale))',
                    borderRadius: '12px',
                    border: '2px solid #DECBB1',
                    background: '#FAF6F0'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: 'calc(1.0625rem * var(--font-scale))', fontWeight: 700, marginBottom: '6px' }}>
                  What Happened? (Warm Caption)
                </label>
                <textarea
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Describe the sweet moment so Remi can read it to your loved one..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: 'calc(1.0625rem * var(--font-scale))',
                    borderRadius: '12px',
                    border: '2px solid #DECBB1',
                    background: '#FAF6F0',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAddModal(false)}
                  style={{ minHeight: '50px', padding: '10px 20px', fontSize: 'calc(1.0625rem * var(--font-scale))' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ minHeight: '50px', padding: '10px 24px', fontSize: 'calc(1.0625rem * var(--font-scale))', fontWeight: 800 }}
                >
                  Save to Memories
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
