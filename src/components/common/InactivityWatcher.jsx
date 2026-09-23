import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { useSpeechContext } from '../../context/SpeechContext';
import { sounds } from '../../services/soundEffects';

// Real-world durations: 20 minutes idle, 5 minutes response grace period
const IDLE_LIMIT_MS = 20 * 60 * 1000; // 20 minutes
const ESCALATION_LIMIT_MS = 5 * 60 * 1000; // 5 minutes

export default function InactivityWatcher() {
  const { currentUser, emergencyContact } = useApp();
  const { speak } = useSpeechContext();

  const [inactivityState, setInactivityState] = useState('active'); // 'active' | 'prompt' | 'escalated'
  const lastActiveRef = useRef(Date.now());
  const escalationTimerRef = useRef(null);

  const resetActivity = useCallback(() => {
    lastActiveRef.current = Date.now();
    if (inactivityState !== 'active') {
      sounds.playSuccess();
      setInactivityState('active');
    }
    if (escalationTimerRef.current) {
      clearTimeout(escalationTimerRef.current);
      escalationTimerRef.current = null;
    }
  }, [inactivityState]);

  // Listen to physical user interaction events
  useEffect(() => {
    if (currentUser?.role !== 'patient') return;

    const handleUserEvent = () => {
      // If we are currently active, just touch the timestamp
      if (inactivityState === 'active') {
        lastActiveRef.current = Date.now();
      }
    };

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
    events.forEach((ev) => window.addEventListener(ev, handleUserEvent, { passive: true }));

    // Periodic check every 10 seconds
    const interval = setInterval(() => {
      if (inactivityState === 'active') {
        const elapsed = Date.now() - lastActiveRef.current;
        if (elapsed >= IDLE_LIMIT_MS) {
          setInactivityState('prompt');
          const patientName = currentUser?.name || 'Friend';
          speak(`Hello ${patientName}. Remi is right here. Tap the screen if you are doing okay.`);

          // Schedule Tier 2 escalation after 5 minutes
          escalationTimerRef.current = setTimeout(() => {
            setInactivityState('escalated');
            sounds.playAlert();
          }, ESCALATION_LIMIT_MS);
        }
      }
    }, 10000);

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleUserEvent));
      clearInterval(interval);
      if (escalationTimerRef.current) clearTimeout(escalationTimerRef.current);
    };
  }, [currentUser, inactivityState, speak]);

  if (currentUser?.role !== 'patient' || inactivityState === 'active') {
    return null;
  }

  const patientName = currentUser?.name || 'Friend';

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        maxWidth: '440px',
        width: 'calc(100% - 48px)',
        zIndex: 1350,
        animation: 'slideUp 0.3s ease'
      }}
    >
      {inactivityState === 'prompt' && (
        <div
          className="card"
          style={{
            background: '#FFFBEB',
            border: '3px solid #F59E0B',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 16px 40px rgba(245, 158, 11, 0.35)',
            textAlign: 'center'
          }}
        >
          <span style={{ fontSize: 'calc(2.625rem * var(--font-scale))', display: 'block', marginBottom: '8px' }}>💛</span>
          <h3 style={{ fontSize: 'calc(1.375rem * var(--font-scale))', fontWeight: 800, color: '#92400E', margin: '0 0 8px 0' }}>
            Still there, {patientName}?
          </h3>
          <p style={{ fontSize: 'calc(1.125rem * var(--font-scale))', color: '#78350F', margin: '0 0 20px 0', lineHeight: 1.5 }}>
            Remi is checking in gently. Tap below to let us know you’re comfortable.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={resetActivity}
            style={{
              width: '100%',
              minHeight: '56px',
              fontSize: 'calc(1.25rem * var(--font-scale))',
              fontWeight: 800,
              borderRadius: '16px',
              background: '#D97706',
              border: 'none',
              color: '#FFFFFF'
            }}
          >
            I’m Doing Okay 🌸
          </button>
        </div>
      )}

      {inactivityState === 'escalated' && (
        <div
          className="card"
          style={{
            background: '#FEF2F2',
            border: '3px solid #EF4444',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 16px 40px rgba(239, 68, 68, 0.35)',
            textAlign: 'center'
          }}
        >
          <span style={{ fontSize: 'calc(2.625rem * var(--font-scale))', display: 'block', marginBottom: '8px' }}>🔔</span>
          <h3 style={{ fontSize: 'calc(1.375rem * var(--font-scale))', fontWeight: 800, color: '#991B1B', margin: '0 0 8px 0' }}>
            Caregiver Alert Notification
          </h3>
          <p style={{ fontSize: 'calc(1.0625rem * var(--font-scale))', color: '#7F1D1D', margin: '0 0 16px 0', lineHeight: 1.5 }}>
            No activity detected for 25 minutes. Primary contact:
            <br />
            <strong>{emergencyContact.name} ({emergencyContact.relation})</strong>
            <br />
            {emergencyContact.phone}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={resetActivity}
            style={{
              width: '100%',
              minHeight: '56px',
              fontSize: 'calc(1.1875rem * var(--font-scale))',
              fontWeight: 800,
              borderRadius: '16px',
              background: '#DC2626',
              border: 'none',
              color: '#FFFFFF'
            }}
          >
            I am here — Clear Alert
          </button>
        </div>
      )}
    </div>
  );
}
