import React from 'react';
import { useApp } from '../../context/AppContext';
import { useSpeechContext } from '../../context/SpeechContext';

export default function DailyMoodModal() {
  const { currentUser, showMoodModal, closeMoodModal, recordDailyMood, t, language } = useApp();
  const { speak } = useSpeechContext();

  // Only show for patients
  if (!showMoodModal || currentUser?.role !== 'patient') return null;

  const patientName = currentUser?.name || 'Friend';

  const MOOD_OPTIONS = [
    {
      score: 1,
      emoji: '😢',
      label: t.mood1 || 'Tired or Sad',
      color: '#64748B',
      remiMsg: language === 'hi-IN'
        ? 'मैं हमेशा आपके साथ हूँ। आज हम सब कुछ बहुत आराम से करेंगे।'
        : language === 'as-IN'
        ? 'মই আপোনাৰ লগতেই আছোঁ। আজি আমি সকলো কাম লাহে লাহে কৰিম।'
        : language === 'bn-IN'
        ? 'আমি সবসময় আপনার সাথে আছি। আজ আমরা সব কাজ খুব শান্তভাবে করব।'
        : language === 'mni-IN'
        ? 'ꯑꯩ ꯅꯍꯥꯛꯀ ꯂꯣꯏꯅꯅ ꯂꯩꯔꯤꫫ ꯉꯁꯤ ꯇꯞꯅ ꯄꯨꯝꯅꯃꯛ ꯇꯧꯁꯤꫫ'
        : "I'm right here with you. Today we will take everything very gently, one soft breath at a time."
    },
    {
      score: 2,
      emoji: '🙁',
      label: t.mood2 || 'A Little Low',
      color: '#0284C7',
      remiMsg: language === 'hi-IN'
        ? 'बताने के लिए शुक्रिया। चलिए साथ मिलकर कोई मीठा गीत सुनते हैं।'
        : language === 'as-IN'
        ? 'ধন্যবাদ মোক কোৱাৰ বাবে। আহক আমি এটা মিঠা গান শুনোঁ।'
        : language === 'bn-IN'
        ? 'বলার জন্য ধন্যবাদ। আসুন একসাথে একটি সুন্দর গান শুনি।'
        : language === 'mni-IN'
        ? 'ꯍꯥꯏꯕꯤꯔꯛꯄꯒꯤꯗꯃꯛ ꯊꯥꯒꯠꯆꯔꯤꫫ ꯏꯁꯩ ꯑꯃ ꯇꯥꯃꯤꯟꯅꯁꯤꫫ'
        : "Thank you for telling me. Let's listen to some gentle music or look at family photos together."
    },
    {
      score: 3,
      emoji: '😐',
      label: t.mood3 || 'Peaceful & Okay',
      color: '#0D9488',
      remiMsg: language === 'hi-IN'
        ? 'एक शांत और सुखद दिन होना बहुत अच्छी बात है।'
        : language === 'as-IN'
        ? 'আজিৰ শান্ত দিনটো বৰ সুন্দৰ। মই সদায় আপোনাৰ লগত আছোঁ।'
        : language === 'bn-IN'
        ? 'আজকের শান্ত দিনটি খুব সুন্দর। আমি সর্বদা আপনার সাথে আছি।'
        : language === 'mni-IN'
        ? 'ꯏꯡ-ꯆꯤꯛꯄ ꯅꯨꯃꯤꯠ ꯑꯃ ꯑꯣꯏꯕꯁꯤ ꯌꯥꯝꯅ ꯐꯩꫫ'
        : "It is wonderful to have a quiet, peaceful day. I am always happy to be by your side."
    },
    {
      score: 4,
      emoji: '🙂',
      label: t.mood4 || 'Good & Calm',
      color: '#16A34A',
      remiMsg: language === 'hi-IN'
        ? 'यह सुनकर मेरा मन खुश हो गया। चलिए आज के खेल खेलते हैं।'
        : language === 'as-IN'
        ? 'আপোনাৰ ভাল লগা শুনি মোৰ বৰ আনন্দ লাগিল। আহক খেল খেলোঁ।'
        : language === 'bn-IN'
        ? 'আপনার ভালো লাগা শুনে খুব আনন্দ হচ্ছে। আসুন খেলা শুরু করি।'
        : language === 'mni-IN'
        ? 'ꯅꯍꯥꯛ ꯐꯅ ꯂꯩꯕ ꯇꯥꯕꯗ ꯑꯩ ꯌꯥꯝꯅ ꯅꯨꯡꯉꯥꯏꫫ'
        : "It warms my heart to hear that. Let's enjoy today's morning breeze and fun games."
    },
    {
      score: 5,
      emoji: '😊',
      label: t.mood5 || 'Joyful & Bright',
      color: '#E11D48',
      remiMsg: language === 'hi-IN'
        ? 'कितनी सुंदर मुस्कान है आपकी! आपकी खुशी से सब कुछ खिल उठता है।'
        : language === 'as-IN'
        ? 'আপোনাৰ হাঁহিটো বৰ ধুনীয়া! আপোনাৰ আনন্দে সকলোকে উজ্জ্বল কৰি তোলে।'
        : language === 'bn-IN'
        ? 'কি মিষ্টি হাসি আপনার! আপনার আনন্দে চারপাশ উজ্জ্বল হয়ে ওঠে।'
        : language === 'mni-IN'
        ? 'ꯅꯍꯥꯛꯀꯤ ꯃꯤꯅꯣꯛ ꯑꯁꯤ ꯌꯥꯝꯅ ꯐꯖꯩ! ꯅꯨꯡꯉꯥꯏꯕꯅ ꯊꯜꯂꯦꫫ'
        : "What a beautiful smile! Your happiness brings so much sunshine to all of us."
    }
  ];

  const handleSelectMood = (option) => {
    recordDailyMood({
      score: option.score,
      emoji: option.emoji,
      label: option.label
    });
    speak(option.remiMsg);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mood-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(23, 20, 18, 0.72)',
        backdropFilter: 'blur(6px)',
        zIndex: 1450,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '620px',
          width: '100%',
          background: '#FFFFFF',
          borderRadius: '28px',
          border: '3px solid #DECBB1',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.28)',
          padding: '36px 28px',
          textAlign: 'center',
          animation: 'slideDown 0.25s ease'
        }}
      >
        <span style={{ fontSize: 'calc(3rem * var(--font-scale))', display: 'block', marginBottom: '8px' }}>🌸</span>

        <h2
          id="mood-modal-title"
          style={{
            fontSize: 'clamp(24px, 3.8vw, 32px)',
            fontWeight: 800,
            color: 'var(--color-primary-dark, #5C2415)',
            marginBottom: '10px'
          }}
        >
          {t.moodGreeting || 'Good morning'}, {patientName}
        </h2>

        <p
          style={{
            fontSize: 'clamp(19px, 2.4vw, 22px)',
            color: '#4A3B32',
            lineHeight: 1.55,
            marginBottom: '28px'
          }}
        >
          {t.moodSubtitle || 'Tap the face that feels closest to you right now:'}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '12px',
            marginBottom: '28px'
          }}
        >
          {MOOD_OPTIONS.map((opt) => (
            <button
              key={opt.score}
              type="button"
              onClick={() => handleSelectMood(opt)}
              style={{
                minHeight: '110px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 8px',
                borderRadius: '18px',
                border: '2.5px solid #DECBB1',
                background: '#FAF6F0',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.06)';
                e.currentTarget.style.borderColor = opt.color;
                e.currentTarget.style.background = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#DECBB1';
                e.currentTarget.style.background = '#FAF6F0';
              }}
              aria-label={opt.label}
            >
              <span style={{ fontSize: 'calc(2.625rem * var(--font-scale))', lineHeight: 1 }}>{opt.emoji}</span>
              <span
                style={{
                  fontSize: 'calc(0.9375rem * var(--font-scale))',
                  fontWeight: 800,
                  color: opt.color,
                  lineHeight: 1.2
                }}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={closeMoodModal}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 'calc(1.125rem * var(--font-scale))',
            color: '#78716C',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: '12px 20px',
            minHeight: '48px',
            fontWeight: 700
          }}
        >
          {t.askLater || 'Ask me later'}
        </button>
      </div>
    </div>
  );
}
