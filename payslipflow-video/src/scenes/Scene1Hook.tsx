import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { SCENES } from './sceneData';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Messy spreadsheet grid: cells jitter slightly to read as "chaotic."
  const jitter = (seed: number) =>
    Math.sin((frame + seed * 17) * 0.4) * 2;

  // Clock spins fast for the first ~4s, matching "hours passing" beat.
  const clockRotation = interpolate(frame, [0, 120], [0, 1080], {
    extrapolateRight: 'clamp'
  });

  // Logo pops in around frame 150 (5s).
  const logoIn = spring({ frame: frame - 150, fps, config: { damping: 14 } });
  const logoOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateRight: 'clamp' });
  const gridFade = interpolate(frame, [150, 190], [1, 0.15], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.mist }}>
      {/* Messy spreadsheet grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          gap: 6,
          padding: 120,
          opacity: gridFade
        }}
      >
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: COLORS.white,
              borderRadius: 6,
              border: `1px solid ${COLORS.slateSoft}22`,
              transform: `translate(${jitter(i)}px, ${jitter(i + 5)}px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: FONT_FAMILY,
              fontSize: 20,
              color: COLORS.slateSoft
            }}
          >
            {(i * 137) % 900}
          </div>
        ))}
      </div>

      {/* Spinning clock, top-right, fades out with the grid */}
      <div
        style={{
          position: 'absolute',
          top: 90,
          right: 140,
          opacity: gridFade,
          transform: `rotate(${clockRotation}deg)`
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke={COLORS.navy} strokeWidth="1.6" />
          <path d="M12 7v5l3 3" stroke={COLORS.navy} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Logo reveal */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: logoOpacity,
          transform: `scale(${0.85 + logoIn * 0.15})`
        }}
      >
        <p
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 800,
            fontSize: 76,
            color: COLORS.navy
          }}
        >
          PayslipFlow
        </p>
      </div>

      <Caption text={SCENES[0].caption} />
    </AbsoluteFill>
  );
};
