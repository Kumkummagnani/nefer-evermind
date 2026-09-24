import React, { useState } from 'react';
import { restoreFontScale } from './fontScale';
restoreFontScale(); // Runs immediately, before first paint

import { AppProvider, useApp } from './context/AppContext';
import { SpeechProvider, useSpeechContext } from './context/SpeechContext';
import { ReminderProvider } from './context/ReminderContext';

import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import RoleSelectScreen from './components/RoleSelectScreen';
import CaregiverDashboard from './components/caregiver/CaregiverDashboard';
import HomeScreen from './components/home/HomeScreen';
import GamesScreen from './components/games/GamesScreen';
import RemindersScreen from './components/reminders/RemindersScreen';
import ProfileScreen from './components/profile/ProfileScreen';
import BottomNav from './components/common/BottomNav';
import Footer from './components/common/Footer';
import CalmModeOverlay from './components/common/CalmModeOverlay';
import AICompanion from './components/companion/AICompanion';
import TodayScheduleView from './components/schedule/TodayScheduleView';
import MemoryWallView from './components/memories/MemoryWallView';
import BreathingExercisesView from './components/calm/BreathingExercisesView';
import ErrorBoundary from './components/common/ErrorBoundary';

/* ── Main App Shell ──────────────────────────────────────────────────────── */
function MainApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeRole, activeScreen } = useApp();

  // No role selected — show the landing/role-select screen
  if (!activeRole) {
    return (
      <div className="app-layout">
        <RoleSelectScreen />
      </div>
    );
  }

  // Caregiver view — full-width dashboard
  if (activeRole === 'caregiver') {
    return (
      <div className="caregiver-layout">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="main-content" style={{ padding: '24px 0' }}>
          <CaregiverDashboard />
        </main>
        <Footer />
      </div>
    );
  }

  // Patient view — centered mobile card
  return (
    <div className="patient-layout">
      <TopBar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        className="main-content"
        id="main-content"
        tabIndex={-1}
        aria-label="Main content area"
      >
        {(activeScreen === 'home' || !activeScreen) && <HomeScreen />}
        {activeScreen === 'games'     && <GamesScreen />}
        {activeScreen === 'reminders' && <RemindersScreen />}
        {activeScreen === 'profile'   && <ProfileScreen />}
        {activeScreen === 'companion' && <AICompanion />}
        {activeScreen === 'schedule'  && <TodayScheduleView />}
        {activeScreen === 'memories'  && <MemoryWallView />}
        {activeScreen === 'breathing' && <BreathingExercisesView />}
      </main>

      <BottomNav />
      <CalmModeOverlay />
    </div>
  );
}

/* ── Provider Bridges ────────────────────────────────────────────────────── */
function ReminderBridge({ children }) {
  const { currentUser, language } = useApp();
  const { speak } = useSpeechContext();

  return (
    <ReminderProvider
      currentLanguage={language || 'en-IN'}
      patientName={currentUser?.name || 'Friend'}
      onSpeakAlert={(msg) => speak(msg)}
    >
      {children}
    </ReminderProvider>
  );
}

function SpeechBridge({ children }) {
  const { language } = useApp();
  return (
    <SpeechProvider currentLanguage={language || 'en-IN'}>
      <ReminderBridge>{children}</ReminderBridge>
    </SpeechProvider>
  );
}

/* ── Root Export ─────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <AppProvider>
      <SpeechBridge>
        <ErrorBoundary>
          <MainApp />
        </ErrorBoundary>
      </SpeechBridge>
    </AppProvider>
  );
}
