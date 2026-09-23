import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import GamesHome from './games/GamesHome';
import MemoryMatchGame from './games/MemoryMatchGame';
import DailyRecallGame from './games/DailyRecallGame';
import NumberRecallGame from './games/NumberRecallGame';
import FacesFamilyGame from './games/FacesFamilyGame';
import StoryRecallGame from './games/StoryRecallGame';
import DailyMoodModal from './companion/DailyMoodModal';
import PatientSosButton from './common/PatientSosButton';
import ConfusionHelpButton from './common/ConfusionHelpButton';
import InactivityWatcher from './common/InactivityWatcher';

export default function PatientHome() {
  const { activeGame, setActiveGame } = useApp();
  const [showMoodModal, setShowMoodModal] = useState(false);

  return (
    <div>
      {/* Active Game or Full Home View */}
      {activeGame === null && <GamesHome onSelectGame={(id) => setActiveGame(id)} />}
      {activeGame === 'memory' && <MemoryMatchGame onBack={() => setActiveGame(null)} />}
      {activeGame === 'daily' && <DailyRecallGame onBack={() => setActiveGame(null)} />}
      {activeGame === 'number' && <NumberRecallGame onBack={() => setActiveGame(null)} />}
      {activeGame === 'faces' && <FacesFamilyGame onBack={() => setActiveGame(null)} />}
      {activeGame === 'story' && <StoryRecallGame onBack={() => setActiveGame(null)} />}

      {/* Floating Helpers */}
      <PatientSosButton />
      <ConfusionHelpButton />
      <InactivityWatcher />
      {showMoodModal && <DailyMoodModal onClose={() => setShowMoodModal(false)} />}
    </div>
  );
}
