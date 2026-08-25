import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';
import { Caption } from '../components/Caption';
import { PersonIllustration } from '../components/PersonIllustration';
import { Confetti } from '../components/Confetti';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'payoff')!.captions;

// No on-screen tagline paragraph anymore -- that line lives ONLY in the
// bottom caption band now (see Caption below), not written large across
// the screen. Confetti carries the "happy ending" moment instead.
export const Scene8Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);
  const groupIn = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ background: COLORS.mist, alignItems: 'center', justifyContent: 'center' }}>
      <Confetti startFrame={20} originX={960} originY={480} />
      <div style={{ display: 'flex', gap: 50, transform: `scale(${groupIn})` }}>
        <PersonIllustration variant="ana" size={200} />
        <PersonIllustration variant="jack" size={200} gestureProgress={1} />
        <PersonIllustration variant="jenny" size={200} />
      </div>
      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
