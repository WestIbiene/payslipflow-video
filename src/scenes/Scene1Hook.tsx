import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { LogoWordmark } from '../components/Logo';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'hook')!.captions;

// Big centered clock while the hook plays, fully gone before the logo
// appears, not overlapping it. Background grid stays small/subtle so the
// clock is the one clear focal element, not competing for attention.
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const active = getActiveCaption(frame, captionBeats);
  const { fps } = useVideoConfig();

  const jitter = (seed: number) => Math.sin((frame + seed * 17) * 0.4) * 2;

  const clockRotation = interpolate(frame, [0, 130], [0, 1080], { extrapolateRight: 'clamp' });
  // Clock fully fades out BEFORE the logo starts fading in -- no overlap.
  const clockOpacity = interpolate(frame, [0, 20, 110, 135], [0, 1, 1, 0]);

  const logoIn = spring({ frame: frame - 150, fps, config: { damping: 14 } });
  const logoOpacity = interpolate(frame, [150, 175], [0, 1], { extrapolateRight: 'clamp' });
  const gridOpacity = 0.18;

  return (
    <AbsoluteFill style={{ background: COLORS.mist }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          gap: 6,
          padding: 120,
          opacity: gridOpacity
        }}
      >
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: COLORS.white,
              borderRadius: 6,
              border: `1px solid ${COLORS.slateSoft}22`,
              transform: `translate(${jitter(i)}px, ${jitter(i + 5)}px)`
            }}
          />
        ))}
      </div>

      {/* Big, centered clock -- the whole point of this beat */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ opacity: clockOpacity, transform: `rotate(${clockRotation}deg)` }}>
          <svg width="320" height="320" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={COLORS.navy} strokeWidth="1.2" />
            <path d="M12 7v5l3 3" stroke={COLORS.navy} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </AbsoluteFill>

      {/* Logo reveal, big, only after the clock is fully gone */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ opacity: logoOpacity, transform: `scale(${0.85 + logoIn * 0.15})` }}>
          <LogoWordmark size={170} />
        </div>
      </AbsoluteFill>

      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
