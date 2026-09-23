import React from 'react';
import { useApp } from '../../context/AppContext';
import { useSpeechContext } from '../../context/SpeechContext';
import { sounds } from '../../services/soundEffects';

export default function TodayScheduleView() {
  const { scheduleTasks, toggleTaskDone, currentUser, t } = useApp();
  const { speak, isSpeaking, stopSpeaking } = useSpeechContext();

  const completedCount = scheduleTasks.filter((t) => t.done).length;
  const totalCount = scheduleTasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const patientName = currentUser?.name || 'Friend';

  const handleReadSchedule = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    sounds.playTap();
    const remaining = scheduleTasks.filter((t) => !t.done);
    let speech = `Hello ${patientName}. You have completed ${completedCount} out of ${totalCount} activities today. `;
    if (remaining.length > 0) {
      speech += `Your next activity is at ${remaining[0].time}: ${remaining[0].title}. ${remaining[0].desc}`;
    } else {
      speech += `Wonderful job! You have completed all your activities for today!`;
    }
    speak(speech);
  };

  return (
    <div className="container" style={{ paddingBottom: '90px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #FFF9F0 0%, #F5ECE0 100%)',
          borderRadius: '24px',
          border: '2px solid #DECBB1',
          padding: '28px 24px',
          marginBottom: '28px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: 'var(--font-size-xxl)' }}>📅</span>
              <h1 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--color-primary-dark, #5C2415)', margin: 0 }}>
                Dainik Dincharya — {t.scheduleTitle || 'Today’s Gentle Schedule'}
              </h1>
            </div>
            <p style={{ fontSize: 'var(--font-size-large)', color: '#6A564A', margin: 0 }}>
              {t.scheduleSubtitle || 'One gentle step at a time. No rush, everything at your own peaceful pace.'}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleReadSchedule}
            style={{
              minHeight: '56px',
              padding: '12px 24px',
              fontSize: 'var(--font-size-large)',
              fontWeight: 800,
              borderRadius: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>{isSpeaking ? '⏹️ Stop Voice' : `🎙️ ${t.scheduleReadAloud || 'Remi Read Schedule'}`}</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: 'var(--font-size-base)', fontWeight: 800, color: '#4A3B32' }}>
            <span>{t.scheduleProgressLabel || 'Progress Today:'} {completedCount} of {totalCount}</span>
            <span>{progressPercent}%</span>
          </div>
          <div style={{ height: '16px', background: '#EAE1D5', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #E07A5F 0%, #2A9D8F 100%)',
                borderRadius: '9999px',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>
      </div>

      {/* Visual Timeline Blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {scheduleTasks.map((task) => (
          <div
            key={task.id}
            className={`schedule-timeline-block ${task.done ? 'completed' : ''}`}
            style={{
              opacity: task.done ? 0.88 : 1,
              transform: task.done ? 'scale(0.99)' : 'scale(1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: '220px' }}>
              <div
                style={{
                  minWidth: '95px',
                  background: task.done ? '#DCFCE7' : '#FAF6F0',
                  border: task.done ? '2px solid #86EFAC' : '2px solid #DECBB1',
                  borderRadius: '16px',
                  padding: '8px 12px',
                  textAlign: 'center',
                  fontWeight: 900,
                  fontSize: 'calc(1.0625rem * var(--font-scale))',
                  color: task.done ? '#15803D' : '#8C5338'
                }}
              >
                {task.time}
              </div>

              <span style={{ fontSize: 'calc(2.25rem * var(--font-scale))', lineHeight: 1 }} role="img" aria-hidden="true">
                {task.icon}
              </span>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: 'var(--font-size-large)',
                    fontWeight: 800,
                    margin: '0 0 4px 0',
                    color: task.done ? '#166534' : 'var(--color-primary-dark, #5C2415)',
                    textDecoration: task.done ? 'line-through' : 'none'
                  }}
                >
                  {task.title}
                </h3>
                <p style={{ fontSize: 'var(--font-size-base)', color: '#57483E', margin: 0, lineHeight: 1.5 }}>
                  {task.desc}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTaskDone(task.id)}
              style={{
                minHeight: '56px',
                padding: '10px 22px',
                fontSize: 'var(--font-size-base)',
                fontWeight: 800,
                borderRadius: '16px',
                border: task.done ? '2px solid #16A34A' : '2px solid #DECBB1',
                background: task.done ? '#16A34A' : '#FFFFFF',
                color: task.done ? '#FFFFFF' : '#4A3B32',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              aria-label={`Mark ${task.title} as ${task.done ? 'incomplete' : 'done'}`}
            >
              <span>{task.done ? (t.scheduleCompleted || '✓ Done') : (t.scheduleMarkDone || '○ Mark Done')}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
