import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';
import { Caption } from '../components/Caption';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'trust')!.captions;

// Deliberately the calmest scene in the video visually, but no longer
// static. The shackle starts lifted clear off the body (unmistakably
// "unlocked, detached"), holds there briefly, then drops straight down
// into place with a little bounce right as the caption confirms the point.
export const Scene6Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);

  const fade = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Open state: lifted up + right, with a slight rotation, clearly detached
  // from the body. Closed state: sitting directly on the body, connected.
  const closeProgress = spring({ frame: frame - 35, fps, config: { damping: 10, stiffness: 140 } });
  const offsetX = interpolate(closeProgress, [0, 1], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const offsetY = interpolate(closeProgress, [0, 1], [-48, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rotation = interpolate(closeProgress, [0, 1], [8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // A tiny scale "thunk" right as it clicks shut.
  const clickScale = 1 + Math.max(0, 1 - Math.abs(closeProgress - 1) * 8) * 0.06;

  return (
    <AbsoluteFill style={{ background: COLORS.navy, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30 }}>
      <div style={{ opacity: fade, transform: `scale(${clickScale})` }}>
        <svg viewBox="0 0 200 200" width="320" height="320">
          <rect x="40" y="90" width="120" height="90" rx="14" fill={COLORS.teal} />
          <circle cx="100" cy="130" r="12" fill={COLORS.ink} />
          <rect x="95" y="130" width="10" height="24" rx="4" fill={COLORS.ink} />
          <g transform={`translate(${offsetX} ${offsetY}) rotate(${rotation})`}>
            <path
              d="M 60 95 V 60 A 40 40 0 0 1 140 60 V 95"
              stroke={COLORS.ink}
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
      <Caption text={active.text} sinceFrame={active.sinceFrame} dark />
    </AbsoluteFill>
  );
};
