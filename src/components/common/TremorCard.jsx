import React from 'react';
import { useTremorDebounce } from '../../hooks/useTremorDebounce';
import { sounds } from '../../services/soundEffects';

export default function TremorCard({
  children,
  onClick,
  className = '',
  debounceMs = 180,
  disabled = false,
  sound = true,
  id,
  role = 'button',
  tabIndex = 0,
  ariaLabel,
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    if (sound) sounds.playTap();
    if (onClick) onClick(e);
  };

  const tremorHandlers = useTremorDebounce(handleClick, debounceMs);

  return (
    <div
      id={id}
      role={role}
      tabIndex={disabled ? -1 : tabIndex}
      aria-label={ariaLabel}
      className={`tremor-card ${className}`}
      {...(disabled ? {} : tremorHandlers)}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick(e);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
}
