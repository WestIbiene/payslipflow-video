import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { SCENES } from './sceneData';

// Deliberately the quietest, calmest scene in the video -- see the script
// notes on why this beat gets its own scene instead of being folded into
// the feature recap.
export const Scene6Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const drift = interpolate(frame, [0, 300], [0, -6]);

  return (
    <AbsoluteFill style={{ background: COLORS.navy, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
      <div style={{ opacity: fade, transform: `translateY(${drift}px)` }}>
        <svg width="140" height="140" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="14" rx="2" stroke={COLORS.teal} strokeWidth="1.4" opacity="0.5" />
          <rect x="7" y="10" width="10" height="9" rx="1.5" fill={COLORS.teal} />
          <path d="M9 10V8a3 3 0 016 0v2" stroke={COLORS.white} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="12" cy="14" r="1.3" fill={COLORS.navy} />
        </svg>
      </div>
      <Caption text={SCENES[5].caption} dark />
    </AbsoluteFill>
  );
};
