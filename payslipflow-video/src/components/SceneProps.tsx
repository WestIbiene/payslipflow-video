import React from 'react';
import { COLORS } from '../theme';

// ============================================================================
// Small reusable flat-icon "props" for the persona story scenes -- house,
// desk, a payslip document (messy vs. verified), a bank/approval icon, and
// a poll card. Kept deliberately simple and consistent with the existing
// character illustration style (flat shapes, brand palette, no gradients).
// ============================================================================

export const HouseIcon: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <path d="M 10 50 L 50 15 L 90 50 Z" fill={COLORS.tealDark} />
    <rect x="20" y="48" width="60" height="42" rx="4" fill={COLORS.teal} />
    <rect x="44" y="65" width="14" height="25" rx="2" fill={COLORS.ink} />
    <rect x="26" y="56" width="12" height="12" rx="2" fill={COLORS.mist} />
    <rect x="64" y="56" width="12" height="12" rx="2" fill={COLORS.mist} />
  </svg>
);

export const DeskIcon: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg viewBox="0 0 120 100" width={size} height={(size * 100) / 120}>
    <rect x="10" y="70" width="100" height="10" rx="3" fill={COLORS.ink} />
    <rect x="18" y="80" width="8" height="16" fill={COLORS.ink} />
    <rect x="94" y="80" width="8" height="16" fill={COLORS.ink} />
    <rect x="40" y="25" width="40" height="30" rx="3" fill={COLORS.ink} />
    <rect x="44" y="29" width="32" height="22" rx="2" fill={COLORS.teal} />
    <rect x="55" y="55" width="10" height="10" fill={COLORS.ink} />
    <rect x="46" y="65" width="28" height="5" rx="2" fill={COLORS.ink} />
  </svg>
);

// A payslip document. `verified` controls whether it looks clean and
// authorized (checkmark badge, straight lines, signature) or homemade and
// crooked (slight rotation, uneven lines, a red rejection mark).
export const PayslipDocument: React.FC<{ size?: number; verified: boolean }> = ({ size = 140, verified }) => (
  <svg
    viewBox="0 0 140 180"
    width={size}
    height={(size * 180) / 140}
    style={{ transform: verified ? 'none' : 'rotate(-4deg)' }}
  >
    <rect x="10" y="10" width="120" height="160" rx="8" fill={COLORS.white} stroke="#E5E5E5" strokeWidth="2" />
    <rect x="24" y="30" width={verified ? 90 : 70} height="10" rx="5" fill={COLORS.slateSoft} transform={verified ? undefined : 'rotate(-2 24 30)'} />
    <rect x="24" y="52" width={verified ? 70 : 95} height="10" rx="5" fill={COLORS.slateSoft} transform={verified ? undefined : 'rotate(1.5 24 52)'} />
    <rect x="24" y="74" width={verified ? 82 : 55} height="10" rx="5" fill={COLORS.slateSoft} transform={verified ? undefined : 'rotate(-1 24 74)'} />

    {verified ? (
      <>
        {/* signature */}
        <path d="M 24 130 Q 34 118 44 130 T 64 128 T 84 132" stroke={COLORS.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* verified badge */}
        <circle cx="108" cy="145" r="16" fill={COLORS.teal} />
        <path d="M 101 145 L 106 150 L 116 138" stroke={COLORS.white} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        {/* rejection mark */}
        <circle cx="108" cy="140" r="18" fill="none" stroke={COLORS.coral} strokeWidth="3" />
        <path d="M 100 132 L 116 148 M 116 132 L 100 148" stroke={COLORS.coral} strokeWidth="3" strokeLinecap="round" />
      </>
    )}
  </svg>
);

export const BankIcon: React.FC<{ size?: number; approved: boolean }> = ({ size = 90, approved }) => (
  <svg viewBox="0 0 100 90" width={size} height={(size * 90) / 100}>
    <path d="M 50 8 L 92 30 H 8 Z" fill={COLORS.ink} />
    <rect x="14" y="34" width="8" height="38" fill={COLORS.ink} />
    <rect x="30" y="34" width="8" height="38" fill={COLORS.ink} />
    <rect x="46" y="34" width="8" height="38" fill={COLORS.ink} />
    <rect x="62" y="34" width="8" height="38" fill={COLORS.ink} />
    <rect x="78" y="34" width="8" height="38" fill={COLORS.ink} />
    <rect x="6" y="76" width="88" height="10" rx="2" fill={COLORS.ink} />
    <circle cx="82" cy="18" r="14" fill={approved ? COLORS.teal : COLORS.coral} />
    {approved ? (
      <path d="M 75 18 L 80 23 L 90 12" stroke={COLORS.white} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M 76 11 L 88 25 M 88 11 L 76 25" stroke={COLORS.white} strokeWidth="3" strokeLinecap="round" />
    )}
  </svg>
);

// A small poll card: two response buttons + a tiny bar chart, representing
// responses rolling in.
export const PollCard: React.FC<{ size?: number; resultsProgress: number }> = ({ size = 160, resultsProgress }) => (
  <svg viewBox="0 0 160 120" width={size} height={(size * 120) / 160}>
    <rect x="4" y="4" width="152" height="112" rx="12" fill={COLORS.white} stroke="#E5E5E5" strokeWidth="2" />
    <rect x="18" y="18" width="90" height="10" rx="5" fill={COLORS.slateSoft} />
    <circle cx="30" cy="55" r="14" fill={COLORS.mist} />
    <path d="M 24 55 Q 30 45 36 55 Q 30 62 24 55 Z" fill={COLORS.teal} />
    <circle cx="70" cy="55" r="14" fill={COLORS.mist} />
    <path d="M 64 55 Q 70 65 76 55 Q 70 48 64 55 Z" fill={COLORS.slateSoft} />
    {/* mini bar chart, grows with resultsProgress (0-1) */}
    <rect x="100" y={90 - 55 * resultsProgress} width="12" height={55 * resultsProgress} rx="3" fill={COLORS.teal} />
    <rect x="118" y={90 - 35 * resultsProgress} width="12" height={35 * resultsProgress} rx="3" fill={COLORS.tealDark} />
    <rect x="136" y={90 - 20 * resultsProgress} width="12" height={20 * resultsProgress} rx="3" fill={COLORS.coral} />
  </svg>
);
