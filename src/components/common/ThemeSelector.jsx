import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../services/soundEffects';

export const THEMES = [
  { id: 'terracotta', label: 'Earthy Terracotta', color: '#9C4124', preview: '#E07A5F' },
  { id: 'emerald', label: 'Tea Garden Emerald', color: '#1E6B47', preview: '#22C55E' },
  { id: 'indigo', label: 'Brahmaputra Indigo', color: '#1E3A8A', preview: '#3B82F6' },
  { id: 'sunset', label: 'Sunset Amber', color: '#B45309', preview: '#F59E0B' },
  { id: 'rose', label: 'Mountain Rose', color: '#9F1239', preview: '#F43F5E' }
];

export default function ThemeSelector({ compact = false }) {
  const { theme, changeTheme } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id) => {
    sounds.playTap();
    changeTheme(id);
    setIsOpen(false);
  };

  if (compact) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-full)',
            border: '2px solid #DECBB1',
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
            fontSize: 'calc(0.875rem * var(--font-scale))',
            fontWeight: 700
          }}
          title="Change Color Theme"
          aria-label="Change Color Theme"
        >
          <Palette size={16} color="var(--color-primary)" />
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)' }} />
        </button>

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '46px',
              right: '0',
              background: 'var(--color-surface)',
              border: '2px solid #DECBB1',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 1000,
              minWidth: '200px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ fontSize: 'calc(0.8125rem * var(--font-scale))', fontWeight: 800, color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Choose Theme
            </div>
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelect(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: theme === t.id ? `2px solid ${t.color}` : '1.5px solid transparent',
                  background: theme === t.id ? 'var(--color-surface-warm)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: t.color, display: 'inline-block' }} />
                  <span style={{ fontSize: 'calc(0.875rem * var(--font-scale))', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    {t.label}
                  </span>
                </div>
                {theme === t.id && <Check size={16} color={t.color} />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Expanded inline view (e.g. for login page or caregiver hub)
  return (
    <div>
      <label style={{ display: 'block', fontSize: 'calc(1rem * var(--font-scale))', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-secondary)' }}>
        🎨 Choose Color Palette
      </label>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {THEMES.map((t) => {
          const isCurrent = theme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => handleSelect(t.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                border: isCurrent ? `2.5px solid ${t.color}` : '1.5px solid #DECBB1',
                background: isCurrent ? 'var(--color-surface-warm)' : 'var(--color-surface)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 'calc(0.875rem * var(--font-scale))',
                color: 'var(--color-text-primary)'
              }}
            >
              <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: t.color }} />
              <span>{t.label}</span>
              {isCurrent && <Check size={14} color={t.color} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
