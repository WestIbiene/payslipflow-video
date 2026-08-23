import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { Avatar } from '../components/Avatar';
import { SCENES } from './sceneData';

export const Scene3PersonaAna: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const avatarIn = spring({ frame, fps, config: { damping: 14 } });
  const nameOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp' });

  // Beat 2 (~frame 270 / 9s in): background shifts to teal, counter reveals.
  const bgShift = interpolate(frame, [260, 300], [0, 1], { extrapolateRight: 'clamp' });
  const bg = `rgba(0,191,165,${bgShift * 0.08})`;
  const counterOpacity = interpolate(frame, [280, 310], [0, 1], { extrapolateRight: 'clamp' });
  const smileOpacity = interpolate(frame, [420, 450], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.mist }}>
      <AbsoluteFill style={{ background: bg }} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
        <div style={{ transform: `scale(${avatarIn})` }}>
          <Avatar initial="A" bg={COLORS.white} />
        </div>
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 32, color: COLORS.navy, opacity: nameOpacity }}>
          Ana &middot; Small Business Owner
        </p>

        <div
          style={{
            marginTop: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            opacity: counterOpacity,
            fontFamily: FONT_FAMILY
          }}
        >
          <span style={{ fontSize: 44, fontWeight: 800, color: COLORS.slateSoft, textDecoration: 'line-through' }}>4 hours</span>
          <span style={{ fontSize: 40, color: COLORS.teal }}>&rarr;</span>
          <span style={{ fontSize: 44, fontWeight: 800, color: COLORS.teal }}>4 minutes</span>
        </div>

        <div style={{ opacity: smileOpacity, marginTop: 20 }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={COLORS.teal} strokeWidth="1.6" />
            <path d="M8 14c1 1.3 2.5 2 4 2s3-.7 4-2" stroke={COLORS.teal} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="9" cy="10" r="1" fill={COLORS.teal} />
            <circle cx="15" cy="10" r="1" fill={COLORS.teal} />
          </svg>
        </div>
      </AbsoluteFill>
      <Caption text={SCENES[2].caption} />
    </AbsoluteFill>
  );
};
