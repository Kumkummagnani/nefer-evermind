import { useState, useEffect } from 'react';

const FEMALE = /female|woman|girl|zira|hazel|susan|veena|samantha|karen|moira|tessa|fiona|victoria|aria/i;
const MALE   = /male|man|david|mark|rishi|daniel|alex|fred|jorge|thomas|xander|lee/i;

const LOCALE_FALLBACKS = {
  'en-IN':  ['en-IN', 'en-GB', 'en-AU', 'en-US'],
  'bn-IN':  ['bn-IN', 'bn-BD', 'en-IN', 'en-GB'],
  'as-IN':  ['as-IN', 'en-IN', 'en-GB'],
  'mni-IN': ['mni-IN', 'en-IN', 'en-GB'],
  'hi-IN':  ['hi-IN', 'en-IN', 'en-GB'],
};

export const pickFemaleVoice = (locale) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  for (const lang of (LOCALE_FALLBACKS[locale] || [locale, 'en-IN'])) {
    const byName = voices.find(v => v.lang.startsWith(lang.split('-')[0]) && FEMALE.test(v.name));
    if (byName) { console.log('[Remi] ✓', byName.name); return byName; }

    const notMale = voices.find(v => v.lang.startsWith(lang.split('-')[0]) && !MALE.test(v.name));
    if (notMale) { console.log('[Remi] ~ non-male:', notMale.name); return notMale; }
  }

  const anyNotMale = voices.find(v => !MALE.test(v.name));
  if (anyNotMale) { console.warn('[Remi] fallback:', anyNotMale.name); return anyNotMale; }

  console.error('[Remi] ✗ No female voice — using visual TTS');
  return null;
};

export const selectFemaleVoice = pickFemaleVoice;

export const useFemaleVoice = (locale) => {
  const [voice, setVoice] = useState(null);
  const [needsVisualFallback, setNeedsVisualFallback] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVoice(null);
      setNeedsVisualFallback(true);
      return;
    }

    const load = () => {
      const v = pickFemaleVoice(locale);
      setVoice(v);
      setNeedsVisualFallback(!v);
    };

    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load);
  }, [locale]);

  const speak = (text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    if (needsVisualFallback || !voice) return false;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice;
    u.lang  = locale;
    u.rate  = 0.88;
    u.pitch = 1.1;
    window.speechSynthesis.speak(u);
    return true;
  };

  return { voice, needsVisualFallback, speak };
};

export default useFemaleVoice;
