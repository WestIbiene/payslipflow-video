import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { UndrawIllustration } from '../components/UndrawIllustration';
import { Confetti } from '../components/Confetti';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'payoff')!.captions;

// No on-screen tagline paragraph -- that line lives ONLY in the bottom
// caption band (see Caption below). Confetti carries the "happy ending"
// moment. Uses the "team" illustration (already recolored to brand teal)
// instead of lining up the individual persona illustrations again, since
// this moment is about "everyone," not any one of them specifically.
export const Scene8Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);
  const groupIn = spring({ frame, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ background: COLORS.mist, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
      <Confetti startFrame={20} originX={960} originY={460} />
      <div style={{ transform: `scale(${groupIn})` }}>
        <UndrawIllustration name="team" width={460} />
      </div>
      <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 26, color: COLORS.navy, opacity: groupIn }}>
        Ana &middot; Jack &middot; Ben &middot; Jenny
      </p>
      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
