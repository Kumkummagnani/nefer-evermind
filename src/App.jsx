import React, { useState } from 'react';
import { restoreFontScale } from './fontScale';
restoreFontScale(); // Runs immediately, before first paint

import { AppProvider, useApp } from './context/AppContext';
import { SpeechProvider, useSpeechContext } from './context/SpeechContext';
import { ReminderProvider } from './context/ReminderContext';

import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import RoleSelectScreen from './components/RoleSelectScreen';
import PatientHome from './components/PatientHome';
import CaregiverDashboard from './components/caregiver/CaregiverDashboard';
import Footer from './components/common/Footer';
import CalmModeOverlay from './components/common/CalmModeOverlay';
import AICompanion from './components/companion/AICompanion';
import RemindersView from './components/reminders/RemindersView';
import TodayScheduleView from './components/schedule/TodayScheduleView';
import MemoryWallView from './components/memories/MemoryWallView';
import BreathingExercisesView from './components/calm/BreathingExercisesView';
import ErrorBoundary from './components/common/ErrorBoundary';

function MainApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { activeRole, activeScreen } = useApp();

  if (!activeRole) {
    return (
      <div className="app-layout" style={{ minHeight: '100vh', background: 'var(--color-background)', color: 'var(--color-text)' }}>
        <RoleSelectScreen />
      </div>
    );
  }

  return (
    <div className="app-layout" style={{ minHeight: '100vh', background: 'var(--color-background)', color: 'var(--color-text)', display: 'flex', flexDirection: 'column' }}>
      <TopBar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 99,
          }}
        />
      )}

      <main className="main-content" style={{ padding: '24px 16px', maxWidth: 1000, margin: '0 auto', width: '100%', flex: 1 }}>
        {activeRole === 'caregiver' && <CaregiverDashboard />}
        {activeRole === 'patient' && (
          <>
            {activeScreen === 'games' && <PatientHome />}
            {activeScreen === 'companion' && <AICompanion />}
            {activeScreen === 'schedule' && <TodayScheduleView />}
            {activeScreen === 'memories' && <MemoryWallView />}
            {activeScreen === 'breathing' && <BreathingExercisesView />}
            {activeScreen === 'reminders' && <RemindersView />}
          </>
        )}
      </main>

      <CalmModeOverlay />
      <Footer />
    </div>
  );
}

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
      <ReminderBridge>
        {children}
      </ReminderBridge>
    </SpeechProvider>
  );
}

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
