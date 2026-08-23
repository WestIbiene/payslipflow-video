import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { SCENES } from './sceneData';

export const Scene9CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 14 } });
  const buttonIn = spring({ frame: frame - 20, fps, config: { damping: 12 } });

  // Gentle pulse on the button so it reads as clickable/actionable.
  const pulse = 1 + Math.sin(frame * 0.15) * 0.03;

  // Held final frame: last 4s (120 frames of this 300-frame scene) shows
  // the static "link in description" text -- this is the frame someone
  // pauses the video on, so keep it dead simple and legible.
  const heldTextOpacity = interpolate(frame, [180, 200], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.white, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30 }}>
      <p
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize: 56,
          color: COLORS.navy,
          transform: `scale(${0.85 + logoIn * 0.15})`,
          opacity: logoIn
        }}
      >
        PayslipFlow
      </p>

      <div
        style={{
          transform: `scale(${(0.85 + buttonIn * 0.15) * pulse})`,
          opacity: buttonIn,
          background: COLORS.navy,
          color: COLORS.white,
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize: 30,
          padding: '20px 56px',
          borderRadius: 18,
          boxShadow: '0 12px 32px rgba(30,76,135,0.25)'
        }}
      >
        Install Free
      </div>

      <p
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 700,
          fontSize: 26,
          color: COLORS.slateSoft,
          opacity: heldTextOpacity
        }}
      >
        {SCENES[8].caption}
      </p>
    </AbsoluteFill>
  );
};
