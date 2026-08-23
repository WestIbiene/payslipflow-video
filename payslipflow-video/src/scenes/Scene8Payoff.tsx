import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { Avatar } from '../components/Avatar';
import { SCENES } from './sceneData';

export const Scene8Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const groupIn = spring({ frame, fps, config: { damping: 14 } });
  const taglineOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.mist, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 40 }}>
      <div style={{ display: 'flex', gap: 30, transform: `scale(${groupIn})` }}>
        <Avatar initial="A" bg={COLORS.white} size={110} />
        <Avatar initial="E" bg={COLORS.white} size={110} />
        <Avatar initial="J" bg={COLORS.white} size={110} />
      </div>
      <p
        style={{
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize: 40,
          color: COLORS.navy,
          textAlign: 'center',
          maxWidth: 800,
          opacity: taglineOpacity,
          lineHeight: 1.3
        }}
      >
        It's not another platform to learn.
        <br />
        It's the one that works how you already do.
      </p>
      <Caption text={SCENES[7].caption} />
    </AbsoluteFill>
  );
};
