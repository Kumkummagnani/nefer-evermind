import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const ReminderContext = createContext(null);

const STORAGE_KEY = 'cognicare_reminders_v1';
const ESCALATIONS_KEY = 'cognicare_escalations_v1';
const HISTORY_KEY = 'cognicare_activity_history_v1';

// Initial default daily reminders
const INITIAL_REMINDERS = [
  {
    id: 'med-morning',
    title: {
      'en-IN': 'Morning Blood Pressure & Memory Medicine',
      'as-IN': 'ৰাতিপুৱাৰ প্ৰেচাৰ আৰু স্মৃতিৰ ঔষধ',
      'bn-IN': 'সকালের প্রেশার ও স্মৃতির ওষুধ',
      'mni-IN': 'ꯑꯌꯨꯛꯀꯤ ꯍꯤꯗꯥꯛ (Blood Pressure & Memory)'
    },
    category: 'medicine',
    time: '08:00 AM',
    scheduledMinutesFromMidnight: 8 * 60, // 8:00 AM
    icon: '💊',
    done: false,
    doneTimestamp: null
  },
  {
    id: 'water-midday',
    title: {
      'en-IN': 'Hydration Break — Pure Spring Water',
      'as-IN': 'শৰীৰ জুৰোৱা পানী খোৱাৰ সময়',
      'bn-IN': 'পর্যাপ্ত জল পান করার সময়',
      'mni-IN': 'ꯏꯁꯤꯡ ꯊꯛꯄꯒꯤ ꯃꯇꯝ (Hydration)'
    },
    category: 'hydration',
    time: '11:30 AM',
    scheduledMinutesFromMidnight: 11 * 60 + 30,
    icon: '💧',
    done: false,
    doneTimestamp: null
  },
  {
    id: 'walk-evening',
    title: {
      'en-IN': 'Gentle Bamboo Garden Stroll',
      'as-IN': 'বাৰীত শান্ত খোজেৰে ফুৰা',
      'bn-IN': 'বাগানে শান্ত মনে পায়চারি',
      'mni-IN': 'ꯂꯩꯀꯣꯜꯗ ꯈꯣꯡꯅ ꯆꯠꯄ'
    },
    category: 'activity',
    time: '05:00 PM',
    scheduledMinutesFromMidnight: 17 * 60,
    icon: '🌿',
    done: false,
    doneTimestamp: null
  },
  {
    id: 'med-evening',
    title: {
      'en-IN': 'Evening Calming Medicine & Dinner',
      'as-IN': 'সন্ধিয়াৰ নৈশ ঔষধ আৰু আহাৰ',
      'bn-IN': 'সন্ধ্যার নিয়মিত ওষুধ ও রাতের খাবার',
      'mni-IN': 'ꯅꯨꯃꯤꯗꯥꯡꯒꯤ ꯍꯤꯗꯥꯛ ꯑꯃꯁꯨꯡ ꯆꯥꯛ'
    },
    category: 'medicine',
    time: '08:00 PM',
    scheduledMinutesFromMidnight: 20 * 60,
    icon: '🌙',
    done: false,
    doneTimestamp: null
  }
];

export function ReminderProvider({ children, currentLanguage = 'en-IN', patientName = 'Bhaben Phukan', onSpeakAlert }) {
  // Load persistent reminders
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load reminders from localStorage:', e);
    }
    return INITIAL_REMINDERS;
  });

  // Escalation tracking: { [reminderId]: { tier: 1|2|3, triggeredAt: number, overdueMinutes: number, acknowledged: boolean } }
  const [escalations, setEscalations] = useState(() => {
    try {
      const saved = localStorage.getItem(ESCALATIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load escalations:', e);
    }
    return {};
  });

  // Patient history log
  const [activityHistory, setActivityHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load history:', e);
    }
    return [
      { id: 'h1', text: 'Morning Routine completed on time', time: '08:15 AM', type: 'success' },
      { id: 'h2', text: 'Memory Match game completed (100% score)', time: '10:30 AM', type: 'game' }
    ];
  });

  // Demo speed accelerator toggle
  const [demoAcceleration, setDemoAcceleration] = useState(false);
  const [activeTierAlert, setActiveTierAlert] = useState(null); // active overlay for Tier 1 or Tier 2
  const [caregiverModalAlert, setCaregiverModalAlert] = useState(null); // active modal for Tier 3

  const lastSpokenRef = useRef({});

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    } catch (e) {
      // Ignored
    }
  }, [reminders]);

  useEffect(() => {
    try {
      localStorage.setItem(ESCALATIONS_KEY, JSON.stringify(escalations));
    } catch (e) {
      // Ignored
    }
  }, [escalations]);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(activityHistory));
    } catch (e) {
      // Ignored
    }
  }, [activityHistory]);

  // Mark reminder as done
  const markAsDone = useCallback((reminderId) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setReminders(prev => prev.map(r => {
      if (r.id === reminderId) {
        return { ...r, done: true, doneTimestamp: timeStr };
      }
      return r;
    }));

    // Cancel all pending escalations for this reminder immediately
    setEscalations(prev => {
      const updated = { ...prev };
      delete updated[reminderId];
      return updated;
    });

    // Close any active overlay or modal for this reminder
    setActiveTierAlert(prev => (prev && prev.reminderId === reminderId ? null : prev));
    setCaregiverModalAlert(prev => (prev && prev.reminderId === reminderId ? null : prev));

    // Log completion
    const reminder = reminders.find(r => r.id === reminderId);
    const remTitle = reminder ? (reminder.title[currentLanguage] || reminder.title['en-IN']) : 'Reminder';
    setActivityHistory(prev => [
      {
        id: 'done-' + Date.now(),
        text: `Completed: ${remTitle}`,
        time: timeStr,
        type: 'success',
        timestamp: Date.now()
      },
      ...prev
    ]);
  }, [reminders, currentLanguage]);

  // Reset all for a fresh day/test
  const resetReminders = useCallback(() => {
    setReminders(INITIAL_REMINDERS.map(r => ({ ...r, done: false, doneTimestamp: null })));
    setEscalations({});
    setActiveTierAlert(null);
    setCaregiverModalAlert(null);
  }, []);

  // Add new reminder
  const addReminder = useCallback((newRem) => {
    sounds.playSuccess();
    const id = 'rem-' + Date.now();

    // Calculate scheduledMinutesFromMidnight from time string e.g. "08:00 AM" or "14:30"
    let scheduledMinutes = 8 * 60;
    if (newRem.time) {
      const match = newRem.time.match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (match) {
        let h = parseInt(match[1], 10);
        const m = parseInt(match[2], 10);
        const ampm = match[3] ? match[3].toUpperCase() : null;
        if (ampm === 'PM' && h < 12) h += 12;
        if (ampm === 'AM' && h === 12) h = 0;
        scheduledMinutes = h * 60 + m;
      }
    }

    const categoryIcons = {
      medicine: '💊',
      hydration: '💧',
      activity: '🌿',
      nutrition: '🍲',
      personal: '🌙'
    };

    const icon = newRem.icon || categoryIcons[newRem.category] || '⏰';

    const item = {
      id,
      title: typeof newRem.title === 'object' ? newRem.title : {
        'en-IN': newRem.title || 'Personal Care Reminder',
        'as-IN': newRem.title || 'Personal Care Reminder',
        'bn-IN': newRem.title || 'Personal Care Reminder',
        'mni-IN': newRem.title || 'Personal Care Reminder'
      },
      category: newRem.category || 'personal',
      time: newRem.time || '09:00 AM',
      date: newRem.date || 'Today',
      description: newRem.description || '',
      scheduledMinutesFromMidnight: scheduledMinutes,
      icon,
      done: false,
      doneTimestamp: null
    };

    setReminders(prev => [...prev, item]);

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const remTitle = typeof newRem.title === 'object' ? (newRem.title['en-IN'] || 'Reminder') : (newRem.title || 'Reminder');
    setActivityHistory(prev => [
      {
        id: 'create-' + Date.now(),
        text: `New reminder added: ${remTitle}`,
        time: timeStr,
        type: 'success',
        timestamp: Date.now()
      },
      ...prev
    ]);

    return item;
  }, []);

  // Delete an existing reminder
  const deleteReminder = useCallback((reminderId) => {
    sounds.playTap();
    let deletedTitle = 'Reminder';

    setReminders(prev => {
      const target = prev.find(r => r.id === reminderId);
      if (target) {
        deletedTitle = typeof target.title === 'object' ? (target.title[currentLanguage] || target.title['en-IN']) : target.title;
      }
      return prev.filter(r => r.id !== reminderId);
    });

    setEscalations(prev => {
      const updated = { ...prev };
      delete updated[reminderId];
      return updated;
    });

    setActiveTierAlert(prev => (prev && prev.reminderId === reminderId ? null : prev));
    setCaregiverModalAlert(prev => (prev && prev.reminderId === reminderId ? null : prev));

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setActivityHistory(prev => [
      {
        id: 'del-' + Date.now(),
        text: `Reminder removed: ${deletedTitle}`,
        time: timeStr,
        type: 'alert',
        timestamp: Date.now()
      },
      ...prev
    ]);
  }, [currentLanguage]);

  // Main Background Escalation Engine (Runs continuously via setInterval and handles visibilitychange)
  const checkEscalations = useCallback(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const nowMs = Date.now();

    const newEscalations = { ...escalations };
    let overlayToSet = null;
    let modalToSet = null;

    reminders.forEach(reminder => {
      if (reminder.done) {
        if (newEscalations[reminder.id]) {
          delete newEscalations[reminder.id];
        }
        return;
      }

      // Calculate minutes past scheduled time
      let diffMinutes = currentMinutes - reminder.scheduledMinutesFromMidnight;
      
      // If demo acceleration is on, simulate overdue thresholds in seconds
      if (demoAcceleration) {
        // Find existing record or initialize
        const rec = newEscalations[reminder.id] || { startTime: nowMs, tier: 0 };
        const elapsedSecs = Math.floor((nowMs - (rec.startTime || nowMs)) / 1000);

        if (elapsedSecs >= 40) {
          diffMinutes = 65; // triggers Tier 3
        } else if (elapsedSecs >= 15) {
          diffMinutes = 35; // triggers Tier 2
        } else {
          diffMinutes = 5;  // triggers Tier 1
        }
      }

      // Tier Evaluation
      // Scheduled time or slightly past: Tier 1
      // >= 30 mins: Tier 2
      // >= 60 mins: Tier 3
      let tier = 0;
      if (diffMinutes >= 60) {
        tier = 3;
      } else if (diffMinutes >= 30) {
        tier = 2;
      } else if (diffMinutes >= 0) {
        tier = 1;
      }

      if (tier > 0) {
        const existing = newEscalations[reminder.id] || {};
        const previousTier = existing.tier || 0;

        newEscalations[reminder.id] = {
          ...existing,
          tier,
          overdueMinutes: Math.max(diffMinutes, 0),
          lastChecked: nowMs,
          startTime: existing.startTime || nowMs
        };

        const reminderTitle = reminder.title[currentLanguage] || reminder.title['en-IN'];

        // Tier 1: Patient Gentle Warning
        if (tier === 1) {
          if (!activeTierAlert || activeTierAlert.tier <= 1) {
            overlayToSet = {
              tier: 1,
              reminderId: reminder.id,
              title: reminderTitle,
              icon: reminder.icon,
              message: currentLanguage === 'en-IN'
                ? `Time for your ${reminderTitle.toLowerCase()} 🌸 — tap when done!`
                : currentLanguage === 'as-IN'
                ? `${reminderTitle} খোৱাৰ সময় হৈছে 🌸 — শেষ হ’লে টিপক!`
                : currentLanguage === 'bn-IN'
                ? `${reminderTitle} গ্রহণ করার সময় হয়েছে 🌸 — সম্পন্ন হলে চাপ দিন!`
                : `${reminderTitle} ꯒꯤ ꯃꯇꯝ ꯑꯣꯏꯔꯦ 🌸 — ꯂꯣꯏꯔꯕ ꯃꯇꯨꯡꯗ ꯅꯝꯕꯤꯌꯨ!`
            };
          }

          // Voice aloud once on entry to tier
          if (previousTier < 1 && onSpeakAlert && !lastSpokenRef.current[`${reminder.id}-t1`]) {
            lastSpokenRef.current[`${reminder.id}-t1`] = true;
            onSpeakAlert(overlayToSet ? overlayToSet.message : reminderTitle);
          }
        }

        // Tier 2: Escalated Patient Warning (30 mins past)
        if (tier === 2) {
          overlayToSet = {
            tier: 2,
            reminderId: reminder.id,
            title: reminderTitle,
            icon: reminder.icon,
            message: currentLanguage === 'en-IN'
              ? `You haven't completed your ${reminderTitle.toLowerCase()} yet. Please tap done when you're ready 🙏`
              : currentLanguage === 'as-IN'
              ? `আপুনি এতিয়াও ${reminderTitle} সম্পূৰ্ণ কৰা নাই। অনুগ্ৰহ কৰি এতিয়াই সম্পন্ন কৰক 🙏`
              : currentLanguage === 'bn-IN'
              ? `আপনি এখনও ${reminderTitle} গ্রহণ করেননি। অনুগ্রহ করে সম্পন্ন হলে চাপ দিন 🙏`
              : `${reminderTitle} ꯍꯧꯖꯤꯛ ꯐꯥꯎꯕ ꯆꯥꯗ꯭ꯔꯤꫫ ꯆꯥꯅꯕꯤꯗꯨꯅ ꯂꯣꯏꯁꯤꯟꯕꯤꯌꯨ 🙏`
          };

          if (previousTier < 2 && onSpeakAlert && !lastSpokenRef.current[`${reminder.id}-t2`]) {
            lastSpokenRef.current[`${reminder.id}-t2`] = true;
            onSpeakAlert(overlayToSet.message);
          }
        }

        // Tier 3: Caregiver Alert (1 hour past)
        if (tier === 3) {
          if (!existing.acknowledged) {
            modalToSet = {
              tier: 3,
              reminderId: reminder.id,
              reminderTitle,
              patientName,
              overdueMinutes: Math.max(diffMinutes, 60),
              scheduledTime: reminder.time
            };
          }

          // Log in activity history if just reached Tier 3
          if (previousTier < 3) {
            setActivityHistory(prev => [
              {
                id: 't3-' + Date.now(),
                text: `⚠️ Tier 3 Alert: ${patientName} missed ${reminderTitle} (${Math.max(diffMinutes, 60)} min overdue)`,
                time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'alert',
                timestamp: Date.now()
              },
              ...prev
            ]);
          }
        }
      }
    });

    setEscalations(newEscalations);
    if (overlayToSet) setActiveTierAlert(overlayToSet);
    if (modalToSet) setCaregiverModalAlert(modalToSet);
  }, [reminders, escalations, demoAcceleration, currentLanguage, patientName, onSpeakAlert, activeTierAlert]);

  // Interval timer for continuous monitoring
  useEffect(() => {
    const intervalMs = demoAcceleration ? 3000 : 15000;
    const timer = setInterval(() => {
      checkEscalations();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [checkEscalations, demoAcceleration]);

  // Handle visibility change: when user switches back to the tab, check immediately
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkEscalations();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [checkEscalations]);

  // Acknowledge Caregiver Tier 3 modal
  const acknowledgeTier3Alert = useCallback((reminderId) => {
    setEscalations(prev => {
      if (!prev[reminderId]) return prev;
      return {
        ...prev,
        [reminderId]: {
          ...prev[reminderId],
          acknowledged: true
        }
      };
    });
    setCaregiverModalAlert(null);
  }, []);

  // Compute active caregiver alerts count (Tier 3)
  const tier3ActiveAlerts = Object.entries(escalations)
    .filter(([id, data]) => data.tier === 3)
    .map(([id, data]) => {
      const rem = reminders.find(r => r.id === id);
      return {
        reminderId: id,
        title: rem ? (rem.title[currentLanguage] || rem.title['en-IN']) : 'Reminder',
        time: rem ? rem.time : '',
        overdueMinutes: data.overdueMinutes,
        acknowledged: data.acknowledged
      };
    });

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        escalations,
        activityHistory,
        markAsDone,
        resetReminders,
        addReminder,
        deleteReminder,
        activeTierAlert,
        setActiveTierAlert,
        caregiverModalAlert,
        setCaregiverModalAlert,
        acknowledgeTier3Alert,
        tier3ActiveAlerts,
        demoAcceleration,
        setDemoAcceleration,
        triggerDemoCheck: checkEscalations
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export function useReminders() {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error('useReminders must be used within ReminderProvider');
  }
  return context;
}
