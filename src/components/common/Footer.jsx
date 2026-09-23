import React from 'react';
import { Heart, Shield, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { currentUser } = useApp();

  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '2px solid #EAE3D4',
        background: 'var(--color-surface)',
        padding: '24px 20px',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'calc(0.9375rem * var(--font-scale))', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
          <span>Evermind</span>
          <span>•</span>
          <span>Always with you</span>
          <span>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)' }}>
            <Heart size={14} fill="currentColor" /> Crafted for Elders & Families
          </span>
        </div>

        <div style={{ fontSize: 'calc(0.875rem * var(--font-scale))', color: 'var(--color-text-secondary)' }}>
          24x7 Elder Dementia Care Helpline: <strong>1800-345-NERCARE</strong> | Emergency Response: <strong>112</strong>
        </div>
      </div>
    </footer>
  );
}
