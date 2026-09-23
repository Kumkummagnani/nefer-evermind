import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Mic, MicOff, Volume2, Key, Sparkles, Music,
  Play, Pause, Square, AlertCircle, Heart, RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useSpeechContext } from '../../context/SpeechContext';
import { sendMessageToClaude, detectEmotionalDistress } from '../../services/claudeApi';
import { translations, REMI_SONGS } from '../../locales/translations';
import TremorButton from '../common/TremorButton';
import { sounds } from '../../services/soundEffects';

// Quick conversational prompts tailored for unhurried, 1-tap engagement
const QUICK_PROMPTS = {
  'hi-IN': [
    { id: 'song', icon: '🎵', text: 'गाना सुनाओ रेमी' },
    { id: 'tea', icon: '🍵', text: 'चाय पी ली क्या?' },
    { id: 'how', icon: '🌸', text: 'कैसी हो रेमी?' },
    { id: 'story', icon: '📖', text: 'एक अच्छी कहानी सुनाओ' },
    { id: 'pain', icon: '🌿', text: 'मुझे थोड़ा दर्द हो रहा है' },
    { id: 'joke', icon: '😄', text: 'एक हँसी की बात बताओ' },
    { id: 'calm', icon: '✨', text: 'मन थोड़ा शांत करो' }
  ],
  'en-IN': [
    { id: 'song', icon: '🎵', text: 'Sing me a song, Remi' },
    { id: 'tea', icon: '🍵', text: 'Did you have tea today?' },
    { id: 'how', icon: '🌸', text: 'How are you feeling, Remi?' },
    { id: 'story', icon: '📖', text: 'Tell me a gentle story' },
    { id: 'pain', icon: '🌿', text: "I'm having a little pain" },
    { id: 'joke', icon: '😄', text: 'Tell me something funny' },
    { id: 'calm', icon: '✨', text: 'Help me feel calm' }
  ],
  'as-IN': [
    { id: 'song', icon: '🎵', text: 'এটি গান গোৱাচোন' },
    { id: 'tea', icon: '🍵', text: 'চাহ খালেনে?' },
    { id: 'how', icon: '🌸', text: 'ৰেমি, কেনে আছা?' },
    { id: 'story', icon: '📖', text: 'এটি সাধু শুনাওক' },
    { id: 'pain', icon: '🌿', text: 'মোৰ গাটো অলপ বিষাইছে' },
    { id: 'joke', icon: '😄', text: 'এটি হাঁহি উঠা কথা কোৱা' }
  ],
  'bn-IN': [
    { id: 'song', icon: '🎵', text: 'একটি গান শোনাও রেমি' },
    { id: 'tea', icon: '🍵', text: 'চা খেয়েছেন আজ?' },
    { id: 'how', icon: '🌸', text: 'কেমন আছো রেমি?' },
    { id: 'story', icon: '📖', text: 'একটি গল্প বলো' },
    { id: 'pain', icon: '🌿', text: 'আমার একটু কষ্ট হচ্ছে' },
    { id: 'joke', icon: '😄', text: 'একটি হাসির কথা বলো' }
  ],
  'mni-IN': [
    { id: 'song', icon: '🎵', text: 'ꯏꯁꯩ ꯑꯃ ꯁꯛꯄꯤꯌꯨ ꯔꯦꯃꯤ' },
    { id: 'how', icon: '🌸', text: 'ꯀꯔꯝꯇꯧꯔꯤ ꯔꯦꯃꯤ?' },
    { id: 'story', icon: '📖', text: 'ꯋꯥꯔꯤ ꯑꯃ ꯂꯤꯕꯤꯌꯨ' }
  ]
};

// Subtle Typewriter Component: makes Remi feel alive, like someone actually typing
function TypewriterMessage({ text, isLatest, isAssistant, onFinish }) {
  const [displayedText, setDisplayedText] = useState(isLatest && isAssistant ? '' : text);
  const [isTyping, setIsTyping] = useState(isLatest && isAssistant);

  useEffect(() => {
    if (!isLatest || !isAssistant) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    let currentIdx = 0;
    setDisplayedText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      currentIdx += 2; // Smooth 2-character increments
      if (currentIdx >= text.length) {
        setDisplayedText(text);
        setIsTyping(false);
        clearInterval(interval);
        if (onFinish) onFinish();
      } else {
        setDisplayedText(text.slice(0, currentIdx));
      }
    }, 24);

    return () => clearInterval(interval);
  }, [text, isLatest, isAssistant]);

  return (
    <span>
      {displayedText}
      {isTyping && <span className="typewriter-cursor" />}
    </span>
  );
}

export default function AICompanion() {
  const { currentUser, apiKey, saveApiKey, voiceSpeed, changeVoiceSpeed } = useApp();
  const lang = currentUser.language || 'hi-IN';
  const t = translations[lang] || translations['hi-IN'] || translations['en-IN'];

  const {
    speak,
    isSpeaking,
    stopSpeaking,
    startListening,
    stopListening,
    isListening,
    setVoiceRate
  } = useSpeechContext();

  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'assistant',
      text: lang === 'hi-IN'
        ? `नमस्ते ${currentUser.name}! मैं बिल्कुल अभी आपके बारे में ही सोच रही थी। आज आप कैसा महसूस कर रही हैं? 🌸`
        : lang === 'as-IN'
        ? `নমস্কাৰ ${currentUser.name}! মই আপোনাৰ কথাই ভাবি আছিলোঁ। আজি আপোনাৰ মনটো কেনে লাগিছে? 🌸`
        : lang === 'bn-IN'
        ? `নমস্কার ${currentUser.name}! আমি আপনার কথাই ভাবছিলাম। আজ আপনার মন কেমন আছে? 🌸`
        : lang === 'mni-IN'
        ? `ꯈꯨꯔꯨꯝꯖꯔꯤ ${currentUser.name}! ꯑꯩ ꯅꯍꯥꯛꯀꯤ ꯋꯥꯈꯜ ꯈꯟꯗꯨꯅ ꯂꯩꯔꯝꯃꯤꫫ ꯉꯁꯤ ꯀꯔꯝꯇꯧꯔꯤ? 🌸`
        : `Warm hello ${currentUser.name}! I was just thinking about you. How are you feeling in your heart today? 🌸`,
      time: 'Just now'
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [micNotice, setMicNotice] = useState(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [hasDistressComfort, setHasDistressComfort] = useState(false);

  // Active Musical Singing State
  const [activeSingingSong, setActiveSingingSong] = useState(null);
  const [currentSingingLine, setCurrentSingingLine] = useState(0);
  const [isSongPlaying, setIsSongPlaying] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking, isSongPlaying]);

  // Handle voice speed toggle
  const handleSpeedToggle = (speed) => {
    sounds.playTap();
    changeVoiceSpeed(speed);
    if (setVoiceRate) setVoiceRate(speed);
  };

  // Robust Voice recognition input without intimidating error banners
  const toggleVoiceInput = async () => {
    if (isListening) {
      sounds.playTap();
      stopListening();
      setMicNotice(null);
    } else {
      sounds.playTap();
      setMicNotice({ type: 'listening', text: '🎤 Listening gently... Please speak.' });

      await startListening(
        (spokenText, isFinal) => {
          setInputVal(spokenText);
          if (isFinal && spokenText.trim().length > 1) {
            setMicNotice(null);
          }
        },
        (errorMsg) => {
          console.warn('Mic note:', errorMsg);
          // Friendly gentle hint instead of scary error
          setMicNotice({
            type: 'info',
            text: 'Voice network is quiet right now. You can easily tap any quick topic below or type!'
          });
          setTimeout(() => setMicNotice(null), 5000);
        }
      );
    }
  };

  // Dedicated Remi Singing Function: Warm human intro + melodic Web Audio arrangement
  const singSongForElder = (songObj) => {
    sounds.playTap();
    stopSpeaking();
    sounds.stopSongMelody();

    const song = songObj || (REMI_SONGS[lang] || REMI_SONGS['hi-IN'])[0];
    setActiveSingingSong(song);
    setIsSongPlaying(true);
    setCurrentSingingLine(0);

    // Warm, gentle human intro spoken by Remi
    const introSpeech = lang === 'hi-IN'
      ? `अरे, मुझे आपके लिए गाना बहुत अच्छा लगता है। चलिए, अपनी आँखें बंद कर लीजिए और आराम से बैठिए।`
      : `Oh, I would love to sing for you. Close your eyes and sit back comfortably.`;

    speak(introSpeech, { rate: voiceSpeed === 0.75 ? 0.78 : 0.9 });

    // Split song into musical lines
    const lines = song.lyrics.split(/[.,!?\n]+/).map(s => s.trim()).filter(Boolean);

    // Play musical arrangement with harmonic chords and vocal-melody chimes
    sounds.playSongArrangement(
      song.id,
      (lineIdx) => {
        setCurrentSingingLine(lineIdx % lines.length);
      },
      () => {
        setIsSongPlaying(false);
      }
    );

    // Add record to chat history
    const songChatMsg = {
      id: 'ast-' + Date.now(),
      sender: 'assistant',
      isSongPlayer: true,
      songData: song,
      text: `🎵 [Remi is singing "${song.title}"]\n\n${song.lyrics}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, songChatMsg]);
  };

  const stopSingingSong = () => {
    sounds.stopSongMelody();
    stopSpeaking();
    setIsSongPlaying(false);
  };

  // Send message to Remi
  const handleSend = async (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    sounds.playTap();
    setMicNotice(null);

    // Check if user expressed emotional distress: activate subtle comfort background
    if (detectEmotionalDistress(text)) {
      setHasDistressComfort(true);
    }

    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputVal('');

    // Detect if user asked to sing
    const lower = text.toLowerCase();
    const isSongPrompt =
      lower.includes('sing') ||
      lower.includes('song') ||
      lower.includes('गाना') ||
      lower.includes('गीत') ||
      lower.includes('গান') ||
      lower.includes('গাও') ||
      lower.includes('ꯏꯁꯩ') ||
      lower.includes('lullaby');

    if (isSongPrompt) {
      const songList = REMI_SONGS[lang] || REMI_SONGS['hi-IN'] || REMI_SONGS['en-IN'];
      const chosen = songList[Math.floor(Math.random() * songList.length)];
      singSongForElder(chosen);
      return;
    }

    // Remi is "thinking" — avatar gently breathes
    setIsThinking(true);

    try {
      const replyText = await sendMessageToClaude(updated, lang, apiKey, currentUser.name);
      const assistantMsg = {
        id: 'ast-' + Date.now(),
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...updated, assistantMsg]);

      // Speak gently with Remi's strictly female voice
      speak(replyText, { rate: voiceSpeed });
    } catch (e) {
      console.warn('Remi conversation error:', e);
    } finally {
      setIsThinking(false);
    }
  };

  const promptList = QUICK_PROMPTS[lang] || QUICK_PROMPTS['hi-IN'] || QUICK_PROMPTS['en-IN'];
  const availableSongs = REMI_SONGS[lang] || REMI_SONGS['hi-IN'] || REMI_SONGS['en-IN'];

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      {/* Header Bar with Remi Soft Illustrated Avatar & Breathing Animation */}
      <div
        className="card"
        style={{
          padding: '16px 22px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          borderLeft: '6px solid var(--color-primary)',
          background: 'var(--color-surface)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Remi Illustrated Avatar with gentle breathing pulse when thinking */}
          <div className={`remi-avatar-wrapper ${isThinking ? 'remi-avatar-breathing' : ''}`}>
            <img
              src="/remi-avatar.jpg"
              alt="Remi - Warm Companion"
              className="remi-avatar-img"
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-primary)', lineHeight: 1.2, margin: 0 }}>
                {t.companionTitle || 'Remi — Your Loving Companion'}
              </h2>
              {isSongPlaying && (
                <div className="music-wave-container" title="Remi is playing a melody...">
                  <div className="music-wave-bar" />
                  <div className="music-wave-bar" />
                  <div className="music-wave-bar" />
                  <div className="music-wave-bar" />
                </div>
              )}
            </div>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', marginTop: '4px', margin: 0 }}>
              {isThinking
                ? '🌸 Remi is listening gently and staying present...'
                : (lang === 'hi-IN' ? 'स्नेही साथी • हमेशा आपके साथ' : 'Kind, patient, unhurried companion')}
            </p>
          </div>
        </div>

        {/* Speed Controls and API Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-surface-warm)', borderRadius: 'var(--radius-md)', padding: '4px', border: '1.5px solid #DECBB1' }}>
            <button
              type="button"
              onClick={() => handleSpeedToggle(0.75)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: voiceSpeed === 0.75 ? 'var(--color-primary)' : 'transparent',
                color: voiceSpeed === 0.75 ? '#FFFFFF' : 'var(--color-text-primary)',
                fontWeight: 800,
                fontSize: 'var(--font-size-base)',
                cursor: 'pointer'
              }}
            >
              0.75x Gentle
            </button>
            <button
              type="button"
              onClick={() => handleSpeedToggle(1.0)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: voiceSpeed === 1.0 ? 'var(--color-primary)' : 'transparent',
                color: voiceSpeed === 1.0 ? '#FFFFFF' : 'var(--color-text-primary)',
                fontWeight: 800,
                fontSize: 'var(--font-size-base)',
                cursor: 'pointer'
              }}
            >
              1.0x Normal
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowKeyModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid #DECBB1',
              background: apiKey ? '#ECFDF5' : 'var(--color-surface)',
              color: apiKey ? '#065F46' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-base)',
              fontWeight: 700
            }}
          >
            <Key size={15} />
            <span>{apiKey ? 'Claude Active' : 'API Key'}</span>
          </button>
        </div>
      </div>

      {/* Musical Singing Stage Card (Interactive, real melodies, line-by-line highlight) */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, var(--color-surface-warm) 0%, var(--color-surface) 100%)',
          border: '2px solid var(--color-accent)',
          padding: '16px 20px',
          marginBottom: '16px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Music size={22} color="var(--color-primary)" />
            <span style={{ fontSize: 'var(--font-size-large)', fontWeight: 800, color: 'var(--color-primary)' }}>
              {lang === 'hi-IN' ? 'मधुर संगीत और गीत 🎵' : 'Gentle Songs & Melodies 🎵'}
            </span>
          </div>
          {isSongPlaying && (
            <button
              type="button"
              onClick={stopSingingSong}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-alert)',
                background: '#FEE2E2',
                color: 'var(--color-alert)',
                fontWeight: 700,
                fontSize: 'calc(0.875rem * var(--font-scale))',
                cursor: 'pointer'
              }}
            >
              <Square size={14} fill="currentColor" />
              <span>Stop Melody</span>
            </button>
          )}
        </div>

        <p style={{ fontSize: 'calc(0.9375rem * var(--font-scale))', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
          {lang === 'hi-IN'
            ? 'किसी भी गीत पर टैप करें। रेमी शांत धुन और मधुर लय के साथ आपके लिए गाएगी:'
            : 'Tap any song below. Remi will play gentle acoustic melodies to keep you company:'}
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {availableSongs.map((song) => (
            <button
              key={song.id}
              type="button"
              onClick={() => singSongForElder(song)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: 'var(--radius-full)',
                border: activeSingingSong?.id === song.id && isSongPlaying ? '3px solid var(--color-primary)' : '2px solid #DECBB1',
                background: activeSingingSong?.id === song.id && isSongPlaying ? 'var(--color-primary-light)' : '#FFFDF9',
                color: 'var(--color-primary)',
                fontWeight: 800,
                fontSize: 'calc(0.9375rem * var(--font-scale))',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Play size={15} fill="currentColor" />
              <span>{song.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Microphone Status Notice (Non-blocking, gentle helper) */}
      {micNotice && (
        <div
          style={{
            padding: '12px 18px',
            marginBottom: '14px',
            borderRadius: 'var(--radius-md)',
            background: micNotice.type === 'listening' ? '#EFF6FF' : '#FEF3C7',
            border: `2px solid ${micNotice.type === 'listening' ? '#3B82F6' : '#F59E0B'}`,
            color: micNotice.type === 'listening' ? '#1E40AF' : '#92400E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 'calc(1rem * var(--font-scale))',
            fontWeight: 700
          }}
          role="status"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {micNotice.type === 'listening' ? (
              <span className="alert-dot-pulse" style={{ background: '#2563EB' }} />
            ) : (
              <AlertCircle size={20} color="#D97706" />
            )}
            <span>{micNotice.text}</span>
          </div>
          {micNotice.type === 'listening' && (
            <button
              type="button"
              onClick={toggleVoiceInput}
              style={{
                background: '#1E40AF',
                color: '#FFF',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 10px',
                cursor: 'pointer',
                fontSize: 'calc(0.8125rem * var(--font-scale))',
                fontWeight: 700
              }}
            >
              Finish
            </button>
          )}
        </div>
      )}

      {/* Chat Messages Log with Subliminal Comfort Warmth Color Shift */}
      <div
        className={`card remi-chat-container ${hasDistressComfort ? 'comfort-warmth' : ''}`}
        style={{
          minHeight: '360px',
          maxHeight: '460px',
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '16px',
          border: '2px solid #EFE4D2'
        }}
        role="log"
        aria-label="Conversation with Remi"
      >
        {messages.map((msg, index) => {
          const isMe = msg.sender === 'user';
          const isLatest = index === messages.length - 1;

          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMe ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                className={isMe ? 'remi-bubble-user' : 'remi-bubble-assistant'}
                style={{
                  maxWidth: '85%',
                  padding: '16px 20px',
                  borderRadius: isMe ? '22px 22px 4px 22px' : '22px 22px 22px 4px',
                  fontSize: 'var(--font-size-large)',
                  lineHeight: 1.55,
                  whiteSpace: 'pre-line'
                }}
              >
                <div>
                  <TypewriterMessage
                    text={msg.text}
                    isLatest={isLatest}
                    isAssistant={!isMe}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '8px',
                    fontSize: 'var(--font-size-base)',
                    opacity: 0.8
                  }}
                >
                  <span>{msg.time}</span>
                  {!isMe && (
                    <button
                      type="button"
                      onClick={() => speak(msg.text, { rate: voiceSpeed })}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-primary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '2px 6px',
                        fontWeight: 800,
                        fontSize: 'var(--font-size-base)'
                      }}
                      aria-label="Read this message aloud"
                    >
                      <Volume2 size={15} />
                      <span>{t.readAloud}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Breathing Indicator while Remi is thinking (Calm, not a spinner!) */}
        {isThinking && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-primary)', fontSize: 'var(--font-size-large)', fontStyle: 'italic' }}>
            <span className="alert-dot-pulse" style={{ background: 'var(--color-primary)' }} />
            <span>Remi is right here, taking all the time with you...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* 1-Tap Quick Conversational Voice Bubbles (Never stuck, effortless touch interaction) */}
      <div style={{ marginBottom: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap' }}>
          {promptList.map((p) => (
            <button
              key={p.id}
              type="button"
              className="voice-topic-chip"
              onClick={() => handleSend(p.text)}
              title={p.text}
            >
              <span>{p.icon}</span>
              <span>{p.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Box with Voice Mic & Large Send Button */}
      <div
        className="card"
        style={{
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: isListening ? '3px solid #3B82F6' : '3px solid #DECBB1',
          background: isListening ? '#EFF6FF' : 'var(--color-surface)'
        }}
      >
        <button
          type="button"
          onClick={toggleVoiceInput}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: isListening ? '#DC2626' : 'var(--color-surface-warm)',
            border: isListening ? '3px solid #B91C1C' : '2px solid #DECBB1',
            color: isListening ? '#FFFFFF' : 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: isListening ? '0 0 12px rgba(220, 38, 38, 0.5)' : 'none',
            transition: 'all 0.15s ease'
          }}
          title={isListening ? 'Stop recording' : 'Speak into microphone'}
          aria-label={isListening ? 'Stop recording' : 'Start microphone speech input'}
        >
          {isListening ? <MicOff size={28} /> : <Mic size={28} />}
        </button>

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          placeholder={isListening ? '🔴 Listening gently... Speak now' : (lang === 'hi-IN' ? 'रेमी से बात करें या ऊपर किसी विषय पर टैप करें...' : 'Speak or type gently (or tap a topic above)...')}
          style={{
            flex: 1,
            height: '52px',
            border: 'none',
            outline: 'none',
            fontSize: 'var(--font-size-large)',
            background: 'transparent',
            fontFamily: 'inherit',
            color: 'var(--color-text-primary)'
          }}
        />

        <TremorButton
          variant="primary"
          onClick={() => handleSend()}
          disabled={!inputVal.trim() || isThinking}
          style={{ minHeight: '52px', padding: '10px 24px' }}
        >
          <Send size={20} />
          <span>{t.send}</span>
        </TremorButton>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="escalation-overlay" style={{ zIndex: 1100 }}>
          <div className="card" style={{ maxWidth: '520px', width: '100%', padding: '30px' }}>
            <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '10px', color: 'var(--color-primary)' }}>
              Anthropic Claude API Key
            </h3>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', marginBottom: '18px' }}>
              EverMind connects to <code>claude-sonnet-4-6</code> with Remi's empathetic presence guidelines. Remi also works offline with built-in melodies and gentle memory care.
            </p>

            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              style={{
                width: '100%',
                height: '50px',
                padding: '10px 16px',
                fontSize: 'var(--font-size-base)',
                borderRadius: 'var(--radius-md)',
                border: '2px solid #DECBB1',
                marginBottom: '20px',
                fontFamily: 'inherit'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <TremorButton variant="outline" onClick={() => setShowKeyModal(false)}>
                Cancel
              </TremorButton>
              <TremorButton
                variant="primary"
                onClick={() => {
                  saveApiKey(tempKey);
                  setShowKeyModal(false);
                }}
              >
                {t.saveKey}
              </TremorButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
