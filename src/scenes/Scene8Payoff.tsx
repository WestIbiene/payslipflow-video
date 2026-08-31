import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';
import { Caption } from '../components/Caption';
import { UndrawIllustration } from '../components/UndrawIllustration';
import { Confetti } from '../components/Confetti';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'payoff')!.captions;

// The actual four characters from the story, not the generic "team"
// illustration -- and no name labels, per feedback: no text on screen,
// only in the caption band.
export const Scene8Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);
  const groupIn = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ background: COLORS.mist, alignItems: 'center', justifyContent: 'center' }}>
      <Confetti startFrame={20} originX={960} originY={460} />
      <div style={{ display: 'flex', gap: 20, transform: `scale(${groupIn})` }}>
        <UndrawIllustration name="ana" width={260} />
        <UndrawIllustration name="jack" width={260} />
        <UndrawIllustration name="ben" width={260} />
        <UndrawIllustration name="jenny" width={260} />
      </div>
      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
