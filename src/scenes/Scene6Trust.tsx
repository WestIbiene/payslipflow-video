import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../theme';
import { Caption } from '../components/Caption';
import { UndrawIllustration } from '../components/UndrawIllustration';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'trust')!.captions;

// Replaces the hand-drawn padlock (called out as "tacky") with the real
// shield illustration, big and centered.
export const Scene6Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const active = getActiveCaption(frame, captionBeats);
  const fade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const scaleIn = interpolate(frame, [0, 25], [0.85, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.mist, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: fade, transform: `scale(${scaleIn})` }}>
        <UndrawIllustration name="shield" width={480} />
      </div>
      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
