import { useState, useEffect, useRef, useCallback } from 'react';
import { useFemaleVoice, selectFemaleVoice } from './useFemaleVoice';

/**
 * useSpeech Hook & Speech Service
 * Maps to BCP 47 locales:
 * Hindi: hi-IN
 * English: en-IN
 * Assamese: as-IN
 * Bengali: bn-IN
 * Meitei: mni-IN
 *
 * Filtered strictly for FEMALE voices with 0.75x/1.0x rate control
 * and robust microphone permission handling.
 */
export function useSpeech(currentLanguage = 'en-IN', defaultRate = 0.88) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const [micStatus, setMicStatus] = useState('idle'); // 'idle' | 'listening' | 'blocked' | 'unsupported'
  const [meiteiFallbackActive, setMeiteiFallbackActive] = useState(false);
  const [meiteiFallbackText, setMeiteiFallbackText] = useState('');
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [transcript, setTranscript] = useState('');
  const [voiceRate, setVoiceRate] = useState(defaultRate);

  const recognitionRef = useRef(null);
  const utteranceRef = useRef(null);
  const fallbackTimerRef = useRef(null);

  // Hook into strict female-only voice selection with voiceschanged listener
  const { voice, visualFallback } = useFemaleVoice(currentLanguage);

  useEffect(() => {
    setVoiceRate(defaultRate);
  }, [defaultRate]);

  // Visual TTS fallback for when no female voice exists — NEVER use male voice
  const triggerVisualTTS = useCallback((text = '', options = {}) => {
    setMeiteiFallbackActive(true);
    setMeiteiFallbackText(text);

    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);

    const { onBoundary, onEnd } = options;
    const wordCount = text.split(/\s+/).length;
    const displayDurationMs = Math.max(3500, wordCount * 420);

    if (onBoundary) {
      const words = text.split(/\s+/);
      words.forEach((word, idx) => {
        setTimeout(() => {
          setActiveWordIndex(idx);
          onBoundary({ charIndex: idx, name: 'word', wordIndex: idx });
        }, idx * 420);
      });
    }

    fallbackTimerRef.current = setTimeout(() => {
      setMeiteiFallbackActive(false);
      setMeiteiFallbackText('');
      setActiveWordIndex(-1);
      if (onEnd) onEnd();
    }, displayDurationMs);
  }, []);

  // Text-To-Speech (TTS) — strictly female voice or visual fallback
  const speak = useCallback((text, options = {}) => {
    if (!text || typeof window === 'undefined') return;

    const { onBoundary, onEnd, rate = voiceRate || 0.88, pitch = 1.1 } = options;

    if (visualFallback || !voice) {
      triggerVisualTTS(text, options);
      return;
    }

    if (!('speechSynthesis' in window)) {
      triggerVisualTTS(text, options);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = currentLanguage;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeechError(null);
    };

    utterance.onboundary = (event) => {
      if (onBoundary) onBoundary(event);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveWordIndex(-1);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis event:', e);
      setIsSpeaking(false);
      if (e.error === 'network' || e.error === 'audio-busy') {
        setSpeechError('reconnecting');
        setTimeout(() => setSpeechError(null), 3000);
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [currentLanguage, voice, visualFallback, voiceRate, triggerVisualTTS]);

  // Stop current speech
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }
    setMeiteiFallbackActive(false);
    setIsSpeaking(false);
    setActiveWordIndex(-1);
  }, []);

  // Robust Speech-To-Text (STT) with proactive mic permission request
  const startListening = useCallback(async (onResult, onError) => {
    if (typeof window === 'undefined') return;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRec) {
      console.warn('Speech Recognition not supported in this browser');
      setMicStatus('unsupported');
      if (onError) onError('Speech recognition is not supported in this browser. Please type or use quick prompts.');
      return;
    }

    // Proactively request browser microphone permission to unblock audio stream
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
      } catch (micErr) {
        console.warn('Microphone permission request error:', micErr);
        setMicStatus('blocked');
        setIsListening(false);
        if (onError) {
          onError('Microphone blocked! Please click the lock or camera icon in your browser address bar and choose "Allow Microphone".');
        }
        return;
      }
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }

      const recognition = new SpeechRec();
      recognition.lang = currentLanguage;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setMicStatus('listening');
        setSpeechError(null);
        setTranscript('');
      };

      recognition.onresult = (event) => {
        let currentText = '';
        let isFinal = false;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentText += event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            isFinal = true;
          }
        }
        setTranscript(currentText);
        if (onResult) onResult(currentText, isFinal);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition status:', event.error);
        setIsListening(false);

        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicStatus('blocked');
          if (onError) {
            onError('Microphone access blocked. Please allow microphone permissions in your browser.');
          }
        } else if (event.error === 'no-speech') {
          setMicStatus('idle');
        } else if (event.error === 'network') {
          setMicStatus('network-unavailable');
          if (onError) {
            onError('Speech network is temporarily unreachable. You can tap any quick topic or speak again.');
          }
        } else if (onError) {
          onError(`Microphone note: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setMicStatus('idle');
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('STT start exception:', err);
      setIsListening(false);
      setMicStatus('idle');
      if (onError) onError('Could not start microphone. Please check browser permissions.');
    }
  }, [currentLanguage]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // Ignored
      }
    }
    setIsListening(false);
    setMicStatus('idle');
  }, []);

  return {
    isSpeaking,
    isListening,
    micStatus,
    speechError,
    setSpeechError,
    meiteiFallbackActive,
    meiteiFallbackText,
    setMeiteiFallbackActive,
    activeWordIndex,
    setActiveWordIndex,
    transcript,
    voiceRate,
    setVoiceRate,
    speak,
    stopSpeaking,
    startListening,
    stopListening,
    hasNativeVoice: !visualFallback && !!voice,
    voice,
    selectFemaleVoice
  };
}
