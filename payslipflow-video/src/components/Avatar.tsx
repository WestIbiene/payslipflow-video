import React from 'react';
import { COLORS, FONT_FAMILY } from '../theme';

// Deliberately simple: a colored circle with initials, same visual language
// your site already uses for testimonial-style avatars. No illustrated
// character assets needed -- this is the "zero budget" version of a
// persona, and it's easy to keep consistent if you ever swap in real
// illustrations later (unDraw.co has free ones if you want to upgrade this).
export const Avatar: React.FC<{
  initial: string;
  size?: number;
  bg?: string;
}> = ({ initial, size = 140, bg = COLORS.mist }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT_FAMILY,
      fontWeight: 800,
      fontSize: size * 0.4,
      color: COLORS.navy,
      boxShadow: '0 8px 24px rgba(30,76,135,0.15)'
    }}
  >
    {initial}
  </div>
);
