const SCALES = { A: 1, AA: 1.3, AAA: 1.65 };
const KEY = 'evermind-font-scale';

export const applyFontScale = (size) => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--font-scale', SCALES[size] ?? 1);
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEY, size);
  }
};

export const restoreFontScale = () => {
  const saved = (typeof localStorage !== 'undefined' ? localStorage.getItem(KEY) : null) || 'A';
  applyFontScale(saved);
  return saved;
};
