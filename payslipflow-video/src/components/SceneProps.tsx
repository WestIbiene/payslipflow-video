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

// Shared "boxed line icon" look -- the same white rounded card + soft
// shadow used for the Google Sheet / Payslip+Email / Delivered icons in
// Scene2Explainer, reused here for the Jenny scene's client-sheet icons
// so the two scenes visually match instead of Jenny getting a flatter,
// cheaper-looking treatment.
const IconCard: React.FC<{ size: number; children: React.ReactNode }> = ({ size, children }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.2,
      background: COLORS.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 20px rgba(30,76,135,0.14)'
    }}
  >
    {children}
  </div>
);

// Client sheet -- same "Google Sheet" glyph as the intro scene.
export const GoogleSheetIcon: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <IconCard size={size}>
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke={COLORS.teal} strokeWidth="1.6" />
      <path d="M4 9h16M4 14h16M9 3v18" stroke={COLORS.teal} strokeWidth="1.4" />
    </svg>
  </IconCard>
);

// Payslip sent by email -- same envelope glyph as the intro scene.
export const EnvelopeIcon: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <IconCard size={size}>
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke={COLORS.navy} strokeWidth="1.6" />
      <path d="M3 7l9 6 9-6" stroke={COLORS.navy} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </IconCard>
);

// Delivered confirmation -- same check-in-circle glyph as the intro scene.
export const DeliveredIcon: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <IconCard size={size}>
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={COLORS.teal} strokeWidth="1.6" />
      <path d="M8 12.5l2.5 2.5L16 9" stroke={COLORS.teal} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </IconCard>
);

// Bare growing bar chart -- no card, no header bar, no response buttons.
// Just the three bars, sized big since they're the whole point: responses
// rolling in. Grows from 0 to full height as resultsProgress goes 0 -> 1.
export const PollBars: React.FC<{ size?: number; resultsProgress: number }> = ({ size = 260, resultsProgress }) => {
  const barHeights = [130, 85, 48];
  const barX = [10, 75, 140];
  return (
    <svg viewBox="0 0 200 180" width={size} height={(size * 180) / 200}>
      {barX.map((x, i) => (
        <rect
          key={i}
          x={x}
          y={180 - barHeights[i] * resultsProgress}
          width="48"
          height={barHeights[i] * resultsProgress}
          rx="8"
          fill={i === 0 ? COLORS.teal : i === 1 ? COLORS.tealDark : COLORS.coral}
        />
      ))}
    </svg>
  );
};
