import React from 'react';
import { COLORS } from '../theme';

// The jet-winged payslip motif -- built and tested earlier but never
// actually wired into a scene until now. Used for "sending" moments:
// sharp, angular, fast, not YAMM's soft feathered wings.
export const JetPayslip: React.FC<{ size?: number }> = ({ size = 160 }) => (
  <svg viewBox="0 0 400 260" width={size} height={(size * 260) / 400}>
    <line x1="20" y1="120" x2="90" y2="120" stroke={COLORS.teal} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    <line x1="20" y1="145" x2="75" y2="145" stroke={COLORS.teal} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
    <line x1="30" y1="170" x2="85" y2="170" stroke={COLORS.teal} strokeWidth="4" strokeLinecap="round" opacity="0.25" />
    <line x1="380" y1="120" x2="310" y2="120" stroke={COLORS.teal} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    <line x1="380" y1="145" x2="325" y2="145" stroke={COLORS.teal} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
    <line x1="370" y1="170" x2="315" y2="170" stroke={COLORS.teal} strokeWidth="4" strokeLinecap="round" opacity="0.25" />

    <path d="M 145 130 L 40 90 L 60 130 L 40 170 Z" fill={COLORS.teal} />
    <path d="M 145 130 L 70 115 L 80 130 L 70 145 Z" fill={COLORS.tealDark} />
    <path d="M 255 130 L 360 90 L 340 130 L 360 170 Z" fill={COLORS.teal} />
    <path d="M 255 130 L 330 115 L 320 130 L 330 145 Z" fill={COLORS.tealDark} />

    <rect x="150" y="70" width="100" height="120" rx="8" fill={COLORS.white} stroke="#E5E5E5" strokeWidth="2" />
    <rect x="162" y="86" width="76" height="14" rx="4" fill={COLORS.teal} />
    <rect x="162" y="110" width="60" height="8" rx="4" fill="#94A3B8" />
    <rect x="162" y="126" width="70" height="8" rx="4" fill="#94A3B8" />
    <rect x="162" y="142" width="50" height="8" rx="4" fill="#94A3B8" />
    <circle cx="220" cy="168" r="12" fill={COLORS.teal} />
    <path d="M 214 168 L 219 173 L 227 163" stroke={COLORS.white} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
