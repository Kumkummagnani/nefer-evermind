import React from 'react';
import RemindersView from './RemindersView';
import PatientSosButton from '../common/PatientSosButton';
import ConfusionHelpButton from '../common/ConfusionHelpButton';

export default function RemindersScreen() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <RemindersView />
      <PatientSosButton />
      <ConfusionHelpButton />
    </div>
  );
}
