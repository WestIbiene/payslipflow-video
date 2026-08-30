import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { LogoWordmark } from '../components/Logo';
import { SCENES } from './sceneData';

const captionText = SCENES.find((s) => s.id === 'cta')!.captions[0].text;

// The "link in description" line now lives ONLY in the bottom caption band
// (see Caption below) -- no duplicate paragraph written across the middle
// of the screen anymore.
export const Scene9CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 14 } });
  const buttonIn = spring({ frame: frame - 20, fps, config: { damping: 12 } });

  // Gentle pulse on the button so it reads as clickable/actionable.
  const pulse = 1 + Math.sin(frame * 0.15) * 0.03;

  return (
    <AbsoluteFill style={{ background: COLORS.white, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30 }}>
      <div
        style={{
          transform: `scale(${0.85 + logoIn * 0.15})`,
          opacity: logoIn
        }}
      >
        <LogoWordmark size={80} />
      </div>

      <div
        style={{
          transform: `scale(${(0.85 + buttonIn * 0.15) * pulse})`,
          opacity: buttonIn,
          background: COLORS.teal,
          color: COLORS.white,
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize: 30,
          padding: '20px 56px',
          borderRadius: 18,
          boxShadow: '0 12px 32px rgba(0,169,143,0.3)'
        }}
      >
        Install Free
      </div>

      <Caption text={captionText} />
    </AbsoluteFill>
  );
};
