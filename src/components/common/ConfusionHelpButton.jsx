import React from 'react';
import { useApp } from '../../context/AppContext';
import { useSpeechContext } from '../../context/SpeechContext';
import { sounds } from '../../services/soundEffects';

export default function ConfusionHelpButton() {
  const {
    currentUser,
    activeScreen,
    setActiveScreen,
    setActiveGame,
    isConfusionModalOpen,
    openConfusionHelp,
    closeConfusionHelp,
    t,
    language
  } = useApp();

  const { speak, stopSpeaking } = useSpeechContext();

  // Only show for patient role
  if (currentUser?.role !== 'patient') return null;

  const SCREEN_NAMES = {
    games: t.navGames || 'Activities & Games',
    companion: t.navCompanion || 'Chat with Remi',
    schedule: t.navSchedule || 'Daily Schedule',
    memories: t.navMemories || 'Family Memories',
    breathing: t.navBreathing || 'Calm Breath & Relaxation',
    reminders: t.navReminders || 'Daily Reminders'
  };

  const currentScreenName = SCREEN_NAMES[activeScreen] || 'Evermind';
  const patientName = currentUser?.name || 'Friend';

  // Grounding message spoken warmly by Remi in active language
  const groundingText = language === 'hi-IN'
    ? `सब कुछ ठीक है, ${patientName}। आप बिल्कुल सुरक्षित हैं। अभी आप ${currentScreenName} पर हैं। क्या आप मुख्य पृष्ठ पर जाना चाहते हैं?`
    : language === 'as-IN'
    ? `সকলো ঠিকে আছে, ${patientName}। আপুনি সম্পূৰ্ণ সুৰক্ষিত। এতিয়া আপুনি ${currentScreenName}ত আছে। মূল পৃষ্ঠালৈ যাব বিচাৰে নেকি?`
    : language === 'bn-IN'
    ? `সব ঠিক আছে, ${patientName}। আপনি সম্পূর্ণ নিরাপদ। এখন আপনি ${currentScreenName}-এ আছেন। মূল পাতায় ফিরে যেতে চান?`
    : language === 'mni-IN'
    ? `ꯄꯨꯝꯅꯃꯛ ꯐꯩ, ${patientName}ꫫ ꯅꯍꯥꯛ ꯆꯦꯛꯁꯤꯟꯅ ꯂꯩꯔꯤꫫ ꯍꯧꯖꯤꯛ ꯅꯍꯥꯛ ${currentScreenName}ꯗ ꯂꯩꯔꯤꫫ`
    : `That's completely okay, ${patientName}. You are safe. Right now you are on the ${currentScreenName} screen. Would you like to go back to the home screen?`;

  const handleOpen = () => {
    openConfusionHelp();
    sounds.playTap();
    speak(groundingText);
  };

  const handleGoHome = () => {
    stopSpeaking();
    sounds.playSuccess();
    setActiveScreen('games');
    setActiveGame(null);
    closeConfusionHelp();
    const homeMsg = language === 'hi-IN'
      ? `हम वापस मुख्य पृष्ठ पर आ गए हैं, ${patientName}। सब कुछ शांत और सुखद है।`
      : `We are back home now, ${patientName}. Everything is calm and peaceful.`;
    speak(homeMsg);
  };

  const handleStay = () => {
    stopSpeaking();
    sounds.playTap();
    closeConfusionHelp();
    const stayMsg = language === 'hi-IN'
      ? `बहुत अच्छा, ${patientName}। मैं हमेशा आपके साथ हूँ।`
      : `You are doing wonderfully, ${patientName}. I am right here with you.`;
    speak(stayMsg);
  };

  return (
    <>
      <button
        type="button"
        className="confusion-help-btn"
        onClick={handleOpen}
        aria-label="I feel confused or lost, please help me"
        title="I feel confused — tap for gentle help"
      >
        <span style={{ fontSize: 'calc(1.5rem * var(--font-scale))' }} role="img" aria-hidden="true">💙</span>
        <span>{t.confusionBtn || 'I’m Confused'}</span>
      </button>

      {isConfusionModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confusion-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(23, 20, 18, 0.72)',
            backdropFilter: 'blur(6px)',
            zIndex: 1400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={handleStay}
        >
          <div
            className="card"
            style={{
              maxWidth: '560px',
              width: '100%',
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '3px solid #60A5FA',
              boxShadow: '0 20px 50px rgba(30, 64, 175, 0.25)',
              padding: '36px 28px',
              textAlign: 'center',
              animation: 'slideDown 0.25s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: '#EFF6FF',
                border: '3px solid #93C5FD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'calc(2.625rem * var(--font-scale))',
                margin: '0 auto 20px'
              }}
            >
              🌸
            </div>

            <h2
              id="confusion-modal-title"
              style={{
                fontSize: 'clamp(24px, 3.8vw, 32px)',
                fontWeight: 800,
                color: '#1E3A8A',
                marginBottom: '14px',
                lineHeight: 1.25
              }}
            >
              {t.confusionTitle || 'You are safe'}, {patientName}.
            </h2>

            <div
              style={{
                fontSize: 'clamp(19px, 2.5vw, 23px)',
                lineHeight: 1.6,
                color: '#334155',
                marginBottom: '28px',
                background: '#F8FAFC',
                padding: '16px 20px',
                borderRadius: '16px',
                border: '1.5px solid #E2E8F0'
              }}
            >
              <div>{currentScreenName}</div>
              <div style={{ marginTop: '8px', color: '#475569', fontSize: '0.9em' }}>
                {t.confusionSafe || 'Take a slow, gentle breath. There is no rush at all.'}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleGoHome}
                style={{
                  minHeight: '64px',
                  fontSize: 'calc(1.375rem * var(--font-scale))',
                  fontWeight: 800,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                <span>{t.goHome || '🏠 Go to Home Screen'}</span>
              </button>

              <button
                type="button"
                className="btn btn-outline"
                onClick={handleStay}
                style={{
                  minHeight: '58px',
                  fontSize: 'calc(1.1875rem * var(--font-scale))',
                  fontWeight: 700,
                  borderRadius: '16px',
                  border: '2px solid #CBD5E1',
                  color: '#475569'
                }}
              >
                <span>{t.stayHere || 'Stay Right Here 🌸'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
