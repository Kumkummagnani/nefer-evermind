import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { LANGUAGES, translations } from '../locales/translations';
import { sounds } from '../services/soundEffects';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Foundation Rule 4: Profile role isolation
  const [activeRole, setActiveRole] = useState(() => {
    try {
      return localStorage.getItem('evermind-role') || null;
    } catch (e) {
      return null;
    }
  });

  const [patientData, setPatientData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('evermind-patient') || 'null');
      if (saved) return saved;
    } catch (e) {}
    return {
      name: 'Shanti Devi',
      age: 74,
      language: 'en-IN',
      role: 'patient',
      isLoggedIn: true
    };
  });

  const [caregiverData, setCaregiverData] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('evermind-caregiver') || 'null');
      if (saved) return saved;
    } catch (e) {}
    return {
      name: 'Debojit Sharma',
      age: 46,
      language: 'en-IN',
      role: 'caregiver',
      isLoggedIn: true
    };
  });

  const [previousRole, setPreviousRole] = useState(null);

  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('evermind-language') || 'en-IN';
    } catch (e) {
      return 'en-IN';
    }
  });

  const t = useMemo(() => {
    return translations[language] || translations['en-IN'];
  }, [language]);

  const changeLanguage = useCallback((lang) => {
    if (!lang) return;
    sounds.playTap();
    setLanguage(lang);
    try {
      localStorage.setItem('evermind-language', lang);
      document.documentElement.lang = lang;
    } catch (e) {}
  }, []);

  const goToRoleSelect = useCallback(() => {
    sounds.playTap();
    setPreviousRole(activeRole);
    setActiveRole(null);
  }, [activeRole]);

  const confirmRole = useCallback((role, profileOverrides = {}) => {
    sounds.playSuccess();
    try {
      localStorage.setItem('evermind-role', role);
    } catch (e) {}

    if (role === 'caregiver') {
      const updated = { ...caregiverData, ...profileOverrides, role: 'caregiver', isLoggedIn: true };
      setCaregiverData(updated);
      try { localStorage.setItem('evermind-caregiver', JSON.stringify(updated)); } catch (e) {}
    } else {
      const updated = { ...patientData, ...profileOverrides, role: 'patient', isLoggedIn: true };
      setPatientData(updated);
      try { localStorage.setItem('evermind-patient', JSON.stringify(updated)); } catch (e) {}
    }

    setActiveRole(role);
    setPreviousRole(null);
  }, [caregiverData, patientData]);

  const cancelRoleSwitch = useCallback(() => {
    sounds.playTap();
    setActiveRole(previousRole);
    setPreviousRole(null);
  }, [previousRole]);

  const savePatientProgress = useCallback((data) => {
    setPatientData(prev => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem('evermind-patient', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  const currentUser = useMemo(() => {
    if (activeRole === 'caregiver') return caregiverData;
    if (activeRole === 'patient') return patientData;
    return null;
  }, [activeRole, caregiverData, patientData]);

  const [activeScreen, setActiveScreen] = useState('games');
  const [activeGame, setActiveGame] = useState(null);

  // Cognitive Game Scores
  const [gameScores, setGameScores] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('evermind-game-scores') || 'null');
      if (Array.isArray(saved) && saved.length > 0) return saved;
    } catch (e) {}
    return [
      { id: 's1', game: 'memory', date: 'Today, 10:15 AM', score: 92, level: 'Level 2' },
      { id: 's2', game: 'daily', date: 'Yesterday, 3:30 PM', score: 85, level: 'Level 1' },
      { id: 's3', game: 'number', date: 'Yesterday, 11:00 AM', score: 88, level: 'Level 1' },
      { id: 's4', game: 'memory', date: '2 days ago', score: 90, level: 'Level 2' },
      { id: 's5', game: 'faces', date: '3 days ago', score: 95, level: 'Level 1' }
    ];
  });

  const recordGameScore = useCallback((game, score, level = 'Level 1') => {
    const newEntry = {
      id: 'gs-' + Date.now(),
      game,
      score,
      level,
      date: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    setGameScores(prev => {
      const updated = [newEntry, ...prev];
      try { localStorage.setItem('evermind-game-scores', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  }, []);

  // Clinical Profile
  const clinicalProfile = useMemo(() => ({
    diagnosis: 'Mild Cognitive Impairment (Early Stage)',
    mmseScore: 24,
    lastAssessment: '2026-08-15',
    doctorName: 'Dr. Anita Sen, Neurologist',
    doctorPhone: '+91 98301 23456',
    emergencyContact: 'Debojit Sharma (Son) • +91 98765 43210',
    caregiverNotes: 'Alert and engaged mornings; slight fatigue around 5 PM.',
    prescriptions: [
      { name: 'Donepezil 5mg', timing: '8:00 AM — Morning (With breakfast)' },
      { name: 'Memantine 10mg', timing: '8:00 PM — Night (After dinner)' },
      { name: 'Vitamin B12 + Multivitamin', timing: '1:00 PM — Afternoon (With lunch)' }
    ]
  }), []);

  // Mood Tracker
  const [dailyMood, setDailyMood] = useState(() => {
    try {
      return localStorage.getItem('evermind-daily-mood') || 'peaceful';
    } catch (e) {
      return 'peaceful';
    }
  });
  const [showMoodModal, setShowMoodModal] = useState(false);
  const openMoodModal = useCallback(() => setShowMoodModal(true), []);
  const closeMoodModal = useCallback(() => setShowMoodModal(false), []);
  const recordDailyMood = useCallback((mood) => {
    setDailyMood(mood);
    try { localStorage.setItem('evermind-daily-mood', typeof mood === 'object' ? mood.label : mood); } catch (e) {}
    setShowMoodModal(false);
  }, []);

  // Daily Schedule Tasks
  const [scheduleTasks, setScheduleTasks] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('evermind-schedule') || 'null');
      if (Array.isArray(saved) && saved.length > 0) return saved;
    } catch (e) {}
    return [
      { id: 't1', time: '08:00 AM', title: 'Morning Chai & Sunlight Walk', desc: 'Sip warm tea on the veranda and enjoy gentle sunshine.', icon: '☕', done: true },
      { id: 't2', time: '09:00 AM', title: 'Morning Medicine (Donepezil)', desc: 'Donepezil 5mg with a full glass of water.', icon: '💊', done: true },
      { id: 't3', time: '11:00 AM', title: 'Evermind Brain Games', desc: 'Assam & Manipur memory match and number recall.', icon: '🦏', done: false },
      { id: 't4', time: '01:00 PM', title: 'Nutritious Lunch & Rest', desc: 'Warm rice, dal, and fresh vegetables followed by a restful nap.', icon: '🍲', done: false },
      { id: 't5', time: '05:00 PM', title: 'Chat & Sing with Remi', desc: 'Sing a familiar Bihu song or listen to a gentle folk tale.', icon: '🎶', done: false },
      { id: 't6', time: '08:00 PM', title: 'Night Medicine (Memantine)', desc: 'Memantine 10mg and soothing chamomile breathing.', icon: '🌙', done: false }
    ];
  });

  const toggleTaskDone = useCallback((id) => {
    sounds.playTap();
    setScheduleTasks(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, done: !t.done } : t);
      try { localStorage.setItem('evermind-schedule', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  }, []);

  // Family Memories
  const [memories, setMemories] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('evermind-memories') || 'null');
      if (Array.isArray(saved) && saved.length > 0) return saved;
    } catch (e) {}
    return [
      {
        id: 'm1',
        title: 'Jorhat Tea Garden Harvest',
        caption: 'Visiting the lush green tea garden with family in the refreshing morning mist.',
        image: '/memories/tea-garden.jpg',
        date: 'Family Holiday'
      },
      {
        id: 'm2',
        title: 'Rongali Bihu Spring Celebration',
        caption: 'Dancing with the dhol and pepa under the blooming trees with joyous laughter.',
        image: '/memories/bihu-dance.jpg',
        date: 'Spring Festival'
      }
    ];
  });

  const addMemory = useCallback((mem) => {
    sounds.playSuccess();
    setMemories(prev => {
      const updated = [{ ...mem, id: 'mem-' + Date.now() }, ...prev];
      try { localStorage.setItem('evermind-memories', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  }, []);

  // Calm Mode
  const [isCalmModeActive, setIsCalmModeActive] = useState(false);
  const toggleCalmMode = useCallback(() => {
    sounds.playTap();
    setIsCalmModeActive(prev => !prev);
  }, []);

  // Theme
  const [theme, setTheme] = useState('terracotta');
  const changeTheme = useCallback((newTheme) => {
    setTheme(newTheme);
    try { localStorage.setItem('evermind-theme', newTheme); } catch (e) {}
  }, []);

  // API Key & Speech Speed
  const [apiKey, setApiKey] = useState(() => {
    try { return localStorage.getItem('evermind-gemini-key') || ''; } catch { return ''; }
  });
  const saveApiKey = useCallback((key) => {
    setApiKey(key);
    try { localStorage.setItem('evermind-gemini-key', key); } catch {}
  }, []);

  const [voiceSpeed, setVoiceSpeed] = useState(0.88);
  const changeVoiceSpeed = useCallback((speed) => setVoiceSpeed(speed), []);

  const emergencyContact = useMemo(() => ({
    name: 'Debojit Sharma',
    relation: 'Son & Primary Caregiver',
    phone: '+91 98765 43210'
  }), []);

  const emergencySwitchLanguage = useCallback((lang) => {
    changeLanguage(lang);
  }, [changeLanguage]);

  // Modals (SOS & Confusion Help)
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const openSosModal = useCallback(() => setIsSosModalOpen(true), []);
  const closeSosModal = useCallback(() => setIsSosModalOpen(false), []);
  const triggerSosEmergency = useCallback(() => {
    sounds.playAlert();
    setIsSosModalOpen(false);
    alert('Emergency alert sent to Debojit Sharma (+91 98765 43210). Help is on the way.');
  }, []);

  const [isConfusionModalOpen, setIsConfusionModalOpen] = useState(false);
  const openConfusionHelp = useCallback(() => setIsConfusionModalOpen(true), []);
  const closeConfusionHelp = useCallback(() => setIsConfusionModalOpen(false), []);

  return (
    <AppContext.Provider value={{
      activeRole,
      setActiveRole,
      patientData,
      setPatientData,
      caregiverData,
      setCaregiverData,
      previousRole,
      goToRoleSelect,
      confirmRole,
      cancelRoleSwitch,
      savePatientProgress,
      language,
      changeLanguage,
      t,
      currentUser,
      activeScreen,
      setActiveScreen,
      activeGame,
      setActiveGame,

      // Game state & clinical profile
      gameScores,
      recordGameScore,
      clinicalProfile,

      // Mood & Schedule & Memories
      dailyMood,
      setDailyMood,
      showMoodModal,
      openMoodModal,
      closeMoodModal,
      recordDailyMood,
      scheduleTasks,
      toggleTaskDone,
      memories,
      addMemory,

      // Calm mode & Settings
      isCalmModeActive,
      toggleCalmMode,
      setIsCalmModeActive,
      theme,
      changeTheme,
      apiKey,
      saveApiKey,
      voiceSpeed,
      changeVoiceSpeed,
      emergencyContact,
      emergencySwitchLanguage,

      // SOS & Confusion modals
      isSosModalOpen,
      openSosModal,
      closeSosModal,
      triggerSosEmergency,
      isConfusionModalOpen,
      openConfusionHelp,
      closeConfusionHelp
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export default AppContext;
