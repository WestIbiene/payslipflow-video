import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS } from '../theme';

// ============================================================================
// ILLUSTRATED PERSONAS -- Ana, Elena, Jack. Built as inline SVG shapes, no
// external image files. Each one now has:
//   - a subtle constant idle bob + periodic blink (makes them read as
//     "alive" even in static-feeling shots)
//   - an `expression` prop the calling scene drives from its own timeline
//     ('neutral' | 'stressed' | 'smile')
//   - Jack additionally supports `gestureProgress` (0-1) for a raised
//     thumbs-up, driven by the scene's own frame-based animation
// Timing/expression logic stays in each scene file (same pattern as the
// rest of the project) -- this file only knows how to DRAW a given state,
// not when to switch to it.
// ============================================================================

export type PersonVariant = 'ana' | 'elena' | 'jack';
export type Expression = 'neutral' | 'stressed' | 'smile';

const Eyes: React.FC<{ leftX: number; rightX: number; y: number; blinking: boolean }> = ({
  leftX,
  rightX,
  y,
  blinking
}) =>
  blinking ? (
    <>
      <rect x={leftX - 4} y={y - 1} width={8} height={2} rx={1} fill={COLORS.ink} />
      <rect x={rightX - 4} y={y - 1} width={8} height={2} rx={1} fill={COLORS.ink} />
    </>
  ) : (
    <>
      <circle cx={leftX} cy={y} r={3} fill={COLORS.ink} />
      <circle cx={rightX} cy={y} r={3} fill={COLORS.ink} />
    </>
  );

const Mouth: React.FC<{ expression: Expression; cy: number }> = ({ expression, cy }) => {
  if (expression === 'stressed') {
    return <path d={`M 89 ${cy + 3} Q 100 ${cy - 3} 111 ${cy + 3}`} stroke={COLORS.ink} strokeWidth={2.5} fill="none" strokeLinecap="round" />;
  }
  if (expression === 'smile') {
    return <path d={`M 88 ${cy - 3} Q 100 ${cy + 7} 112 ${cy - 3}`} stroke={COLORS.ink} strokeWidth={2.5} fill="none" strokeLinecap="round" />;
  }
  return <path d={`M 89 ${cy} Q 100 ${cy + 1} 111 ${cy}`} stroke={COLORS.ink} strokeWidth={2.5} fill="none" strokeLinecap="round" />;
};

const Eyebrows: React.FC<{ show: boolean }> = ({ show }) =>
  show ? (
    <>
      <path d="M 82 72 L 94 77" stroke={COLORS.ink} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M 118 72 L 106 77" stroke={COLORS.ink} strokeWidth={2.5} strokeLinecap="round" />
    </>
  ) : null;

const PersonAna: React.FC<{ expression: Expression; blinking: boolean }> = ({ expression, blinking }) => (
  <>
    <path d="M 55 200 C 55 150 65 130 100 130 C 135 130 145 150 145 200 Z" fill={COLORS.teal} />
    <path d="M 90 132 L 100 160 L 82 145 Z" fill={COLORS.tealDark} />
    <path d="M 110 132 L 100 160 L 118 145 Z" fill={COLORS.tealDark} />
    <path d="M 92 130 L 100 148 L 108 130 Z" fill={COLORS.white} />
    <rect x="90" y="108" width="20" height="26" fill="#E8B792" />
    <circle cx="100" cy="82" r="34" fill="#E8B792" />
    <path d="M 66 78 A 34 34 0 0 1 134 78 L 134 66 A 34 30 0 0 0 66 66 Z" fill="#3A2A20" />
    <circle cx="126" cy="52" r="10" fill="#3A2A20" />
    <Eyebrows show={expression === 'stressed'} />
    <Eyes leftX={89} rightX={111} y={83} blinking={blinking} />
    <Mouth expression={expression} cy={97} />
  </>
);

const PersonElena: React.FC<{ expression: Expression; blinking: boolean }> = ({ expression, blinking }) => (
  <>
    <path d="M 55 200 C 55 150 65 130 100 130 C 135 130 145 150 145 200 Z" fill={COLORS.ink} />
    <path d="M 92 130 L 100 148 L 108 130 Z" fill={COLORS.white} />
    <rect x="90" y="108" width="20" height="26" fill="#F2D3B3" />
    <circle cx="100" cy="82" r="34" fill="#F2D3B3" />
    <path
      d="M 64 90 L 64 70 A 36 36 0 0 1 136 70 L 136 90 L 128 90 L 128 68 A 28 28 0 0 0 72 68 L 72 90 Z"
      fill="#5C3A21"
    />
    <Eyebrows show={expression === 'stressed'} />
    <rect x="78" y="76" width="20" height="14" rx="4" fill="none" stroke={COLORS.ink} strokeWidth="2.5" />
    <rect x="102" y="76" width="20" height="14" rx="4" fill="none" stroke={COLORS.ink} strokeWidth="2.5" />
    <line x1="98" y1="82" x2="102" y2="82" stroke={COLORS.ink} strokeWidth="2.5" />
    <Eyes leftX={88} rightX={112} y={83} blinking={blinking} />
    <Mouth expression={expression} cy={96} />
  </>
);

const PersonJack: React.FC<{ expression: Expression; blinking: boolean; gestureProgress: number }> = ({
  expression,
  blinking,
  gestureProgress
}) => {
  // Raised thumbs-up arm: slides up and fades in as gestureProgress goes
  // 0 -> 1. The scene controls the timing; this just draws the in-between.
  const armOffset = (1 - gestureProgress) * 40;
  return (
    <>
      <g transform={`translate(0 ${armOffset})`} opacity={gestureProgress}>
        <rect x="118" y="90" width="18" height="60" rx="9" fill="#A9714F" transform="rotate(-35 127 150)" />
        <circle cx="152" cy="78" r="14" fill="#A9714F" />
        <rect x="146" y="56" width="11" height="22" rx="5.5" fill="#A9714F" />
      </g>
      <path d="M 55 200 C 55 150 65 128 100 128 C 135 128 145 150 145 200 Z" fill={COLORS.teal} />
      <path d="M 82 128 Q 100 145 118 128 L 112 138 Q 100 148 88 138 Z" fill={COLORS.tealDark} />
      <rect x="90" y="106" width="20" height="26" fill="#A9714F" />
      <circle cx="100" cy="80" r="34" fill="#A9714F" />
      <path d="M 66 78 A 34 32 0 0 1 134 78 L 132 62 A 32 26 0 0 0 68 62 Z" fill="#1E1410" />
      <path d="M 68 76 A 32 30 0 0 1 132 76" stroke={COLORS.ink} strokeWidth="3.5" fill="none" />
      <circle cx="132" cy="82" r="7" fill={COLORS.ink} />
      <path d="M 132 88 Q 130 100 116 104" stroke={COLORS.ink} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="115" cy="105" r="2.5" fill={COLORS.ink} />
      <Eyebrows show={expression === 'stressed'} />
      <Eyes leftX={89} rightX={111} y={80} blinking={blinking} />
      <Mouth expression={expression} cy={94} />
    </>
  );
};

export const PersonIllustration: React.FC<{
  variant: PersonVariant;
  size?: number;
  expression?: Expression;
  gestureProgress?: number;
}> = ({ variant, size = 140, expression = 'smile', gestureProgress = 0 }) => {
  const frame = useCurrentFrame();

  // Ambient idle motion, independent of the scene's own narrative timing --
  // this is what makes them feel "alive" rather than a frozen sticker even
  // when nothing else in the scene is currently animating.
  const bob = Math.sin(frame * 0.12) * 3;
  const blinkCycle = frame % 150; // ~5s cycle at 30fps
  const isBlinking = blinkCycle > 145;

  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden' }}>
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ transform: `translateY(${bob}px)` }}>
        <circle cx="100" cy="100" r="100" fill={COLORS.mist} />
        {variant === 'ana' && <PersonAna expression={expression} blinking={isBlinking} />}
        {variant === 'elena' && <PersonElena expression={expression} blinking={isBlinking} />}
        {variant === 'jack' && <PersonJack expression={expression} blinking={isBlinking} gestureProgress={gestureProgress} />}
      </svg>
    </div>
  );
};
