import React from 'react';
import { useTremorDebounce } from '../../hooks/useTremorDebounce';
import { sounds } from '../../services/soundEffects';

export default function TremorButton({
  children,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'warning', 'alert'
  size = 'medium',    // 'medium', 'large'
  className = '',
  debounceMs = 180,
  disabled = false,
  sound = true,
  ariaLabel,
  id,
  type = 'button',
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    if (sound) sounds.playTap();
    if (onClick) onClick(e);
  };

  const tremorHandlers = useTremorDebounce(handleClick, debounceMs);

  const variantClass = `tremor-btn-${variant}`;
  const sizeClass = size === 'large' ? 'tremor-btn-large' : '';

  return (
    <button
      id={id}
      type={type}
      className={`tremor-btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      aria-label={ariaLabel}
      {...(disabled ? {} : tremorHandlers)}
      {...props}
    >
      {children}
    </button>
  );
}
