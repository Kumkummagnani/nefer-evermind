import React, { useEffect, useState } from 'react';
import { Sun, Sunset, Moon, ArrowRight, Phone, Image as ImageIcon, Wind, Gamepad2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../services/soundEffects';

function getPartOfDay(hour) {
  if (hour < 5)  return { greeting: 'Good Night',      icon: Moon,   color: '#3B4A6B', bgTint: '#EEF0F8' };
  if (hour < 12) return { greeting: 'Good Morning',    icon: Sun,    color: '#D97706', bgTint: '#FFFBEB' };
  if (hour < 17) return { greeting: 'Good Afternoon',  icon: Sun,    color: '#E07A5F', bgTint: '#FBF0EB' };
  if (hour < 20) return { greeting: 'Good Evening',    icon: Sunset, color: '#9C4124', bgTint: '#FBEEE9' };
  return           { greeting: 'Good Night',            icon: Moon,   color: '#3B4A6B', bgTint: '#EEF0F8' };
}

export default function HomeHero() {
  const { currentUser, scheduleTasks = [], setActiveScreen, emergencyContact, t } = useApp();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const firstName = currentUser?.name?.split(' ')[0] || 'Friend';
  const part = getPartOfDay(now.getHours());
  const PartIcon = part.icon;

  const nextTask = scheduleTasks.find(t => !t.done);
  const completedCount = scheduleTasks.filter(t => t.done).length;
  const totalCount = scheduleTasks.length || 1;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const quickActions = [
    {
      id: 'call',
      label: t?.callFamily || 'Call Family',
      icon: Phone,
      color: '#2C6E49',
      bg: '#EBF5EE',
      onClick: () => {
        sounds.playTap();
        window.location.href = `tel:${emergencyContact.phone.replace(/[^0-9+]/g, '')}`;
      },
    },
    {
      id: 'memories',
      label: t?.myMemories || 'Memories',
      icon: ImageIcon,
      color: '#9C4124',
      bg: '#FBEEE9',
      onClick: () => { sounds.playTap(); setActiveScreen('memories'); },
    },
    {
      id: 'games',
      label: t?.playGame || 'Play Game',
      icon: Gamepad2,
      color: '#D97706',
      bg: '#FEF3C7',
      onClick: () => { sounds.playTap(); setActiveScreen('games'); },
    },
    {
      id: 'breathing',
      label: t?.calmBreathing || 'Calm',
      icon: Wind,
      color: '#1E3A8A',
      bg: '#EFF6FF',
      onClick: () => { sounds.playTap(); setActiveScreen('breathing'); },
    },
  ];

  return (
    <div className="hero-card" role="region" aria-label="Daily overview">

      {/* ── Greeting ───────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: part.bgTint,
            border: `2px solid ${part.color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <PartIcon size={28} color={part.color} strokeWidth={2} />
        </div>

        <div style={{ minWidth: 0 }}>
          <h1 style={{
            fontSize: 'calc(1.75rem * var(--font-scale))',
            fontWeight: 900,
            color: 'var(--color-text-primary)',
            margin: 0,
            lineHeight: 1.15,
          }}>
            {part.greeting}, {firstName} 🌸
          </h1>
          <p style={{
            fontSize: 'calc(0.9375rem * var(--font-scale))',
            color: 'var(--color-text-secondary)',
            margin: '3px 0 0 0',
            lineHeight: 1.4,
          }}>
            {now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* ── Progress bar ────────────────────────────────── */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}>
          <span style={{
            fontSize: 'calc(0.8125rem * var(--font-scale))',
            fontWeight: 700,
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}>
            {t?.todayProgress || "Today's progress"}
          </span>
          <span style={{
            fontSize: 'calc(0.875rem * var(--font-scale))',
            fontWeight: 800,
            color: 'var(--color-primary)',
          }}>
            {completedCount}/{totalCount}
          </span>
        </div>
        <div className="progress-bar-track" aria-label={`${completedCount} of ${totalCount} tasks done`}>
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* ── Next task card ──────────────────────────────── */}
      <button
        type="button"
        onClick={() => { sounds.playTap(); setActiveScreen('schedule'); }}
        aria-label={nextTask ? `Next: ${nextTask.title} at ${nextTask.time}. Tap to view your schedule.` : 'All tasks done. Tap to view schedule.'}
        style={{
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          background: nextTask ? 'var(--color-primary-xlight)' : '#F0FDF4',
          border: nextTask ? '1.5px solid var(--color-primary-light)' : '1.5px solid #86EFAC',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '18px',
          cursor: 'pointer',
          transition: 'all 0.18s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontSize: 'calc(0.75rem * var(--font-scale))',
            fontWeight: 800,
            color: nextTask ? 'var(--color-primary)' : 'var(--color-success)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '4px',
          }}>
            {nextTask ? `Up next · ${nextTask.time}` : '🎉 All done for today!'}
          </div>
          <div style={{
            fontSize: 'calc(1rem * var(--font-scale))',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {nextTask
              ? `${nextTask.icon || '🕐'} ${nextTask.title}`
              : 'Wonderful! Every task is complete.'}
          </div>
        </div>
        <ArrowRight size={20} color={nextTask ? 'var(--color-primary)' : 'var(--color-success)'} style={{ flexShrink: 0 }} aria-hidden="true" />
      </button>

      {/* ── Quick Actions ────────────────────────────────── */}
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}
        role="group"
        aria-label="Quick actions"
      >
        {quickActions.map(action => (
          <button
            key={action.id}
            type="button"
            className="quick-action-btn"
            onClick={action.onClick}
            aria-label={action.label}
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: action.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }} aria-hidden="true">
              <action.icon size={18} color={action.color} strokeWidth={2} />
            </div>
            <span style={{
              fontSize: 'calc(0.75rem * var(--font-scale))',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              textAlign: 'center',
              lineHeight: 1.25,
            }}>
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
