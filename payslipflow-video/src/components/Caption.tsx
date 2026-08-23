import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';

// Burned-in captions matter a lot on YouTube -- most viewers watch muted
// for the first few seconds, and this is often the difference between a
// scroll-past and a watch. Fades in quickly, holds, no fancy motion.
export const Caption: React.FC<{ text: string; dark?: boolean }> = ({
  text,
  dark = false
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp'
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity
      }}
    >
      <div
        style={{
          maxWidth: '80%',
          padding: '14px 28px',
          borderRadius: 16,
          background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.85)',
          color: COLORS.white,
          fontFamily: FONT_FAMILY,
          fontSize: 34,
          fontWeight: 600,
          textAlign: 'center',
          lineHeight: 1.3
        }}
      >
        {text}
      </div>
    </div>
  );
};
