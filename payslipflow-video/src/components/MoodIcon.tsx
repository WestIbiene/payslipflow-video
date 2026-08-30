import React from 'react';
import { COLORS } from '../theme';

// Floating mood icon -- conveys a character's emotional state WITHOUT
// touching the character illustration itself. This exists specifically
// because hand-drawing faces onto the unDraw illustrations created a
// visible quality mismatch (different line weight/polish than the
// professionally-made bodies). Keeping mood entirely separate avoids
// that problem: nothing hand-drawn ever touches the character.
export type Mood = 'stressed' | 'happy';

export const MoodIcon: React.FC<{ mood: Mood; size?: number }> = ({ mood, size = 90 }) => {
  const bg = mood === 'stressed' ? COLORS.coral : COLORS.teal;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <circle cx="50" cy="50" r="46" fill={bg} />
      {mood === 'stressed' ? (
        <>
          <path d="M 30 40 Q 38 33 46 39" stroke={COLORS.ink} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 54 39 Q 62 33 70 40" stroke={COLORS.ink} strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="50" r="4.5" fill={COLORS.ink} />
          <circle cx="62" cy="50" r="4.5" fill={COLORS.ink} />
          <path d="M 34 70 Q 50 60 66 70" stroke={COLORS.ink} strokeWidth="4.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M 32 42 Q 38 38 44 42" stroke={COLORS.ink} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 56 42 Q 62 38 68 42" stroke={COLORS.ink} strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="38" cy="48" r="4.5" fill={COLORS.ink} />
          <circle cx="62" cy="48" r="4.5" fill={COLORS.ink} />
          <path d="M 32 62 Q 50 78 68 62" stroke={COLORS.ink} strokeWidth="4.5" fill="none" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
};
