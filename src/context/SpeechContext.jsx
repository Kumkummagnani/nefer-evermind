import React, { createContext, useContext } from 'react';
import { useSpeech } from '../hooks/useSpeech';
import VoiceBanner from '../components/common/VoiceBanner';
import MeiteiVisualFallback from '../components/common/MeiteiVisualFallback';

const SpeechContext = createContext(null);

export function SpeechProvider({ children, currentLanguage = 'en-IN', voiceRate = 0.85 }) {
  const speech = useSpeech(currentLanguage, voiceRate);

  return (
    <SpeechContext.Provider value={{ ...speech, currentLanguage }}>
      {children}

      {/* Graceful Speech Offline/Reconnection Banner */}
      {speech.speechError === 'reconnecting' && (
        <div style={{ position: 'fixed', top: '76px', right: '20px', zIndex: 1200, maxWidth: '420px' }}>
          <VoiceBanner currentLanguage={currentLanguage} onDismiss={() => speech.setSpeechError(null)} />
        </div>
      )}

      {/* Meitei Visual Animated Fallback (ADD-ON 1) */}
      {speech.meiteiFallbackActive && (
        <MeiteiVisualFallback
          text={speech.meiteiFallbackText}
          onClose={() => speech.setMeiteiFallbackActive(false)}
        />
      )}
    </SpeechContext.Provider>
  );
}

export function useSpeechContext() {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error('useSpeechContext must be used within SpeechProvider');
  }
  return context;
}
