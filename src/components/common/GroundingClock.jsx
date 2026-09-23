import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function GroundingClock() {
  const { language } = useApp();
  const lang = language || 'en-IN';

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format: "Monday, 21 September 2026 · 8:42 PM"
  const formatDateTime = (date, locale) => {
    try {
      const dayName = date.toLocaleDateString(locale, { weekday: 'long' });
      const dayNum = date.toLocaleDateString(locale, { day: 'numeric' });
      const monthName = date.toLocaleDateString(locale, { month: 'long' });
      const year = date.toLocaleDateString(locale, { year: 'numeric' });
      const timeStr = date.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit', hour12: true });

      return `${dayName}, ${dayNum} ${monthName} ${year} · ${timeStr}`;
    } catch (e) {
      // Fallback
      return date.toLocaleString();
    }
  };

  return (
    <div className="grounding-clock" role="timer" aria-live="off" title="Current Day, Date & Time">
      <Clock size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
      <span>{formatDateTime(currentTime, lang)}</span>
    </div>
  );
}
