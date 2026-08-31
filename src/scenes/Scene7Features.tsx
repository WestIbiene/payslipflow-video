import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../theme';
import { Caption } from '../components/Caption';
import { UndrawIllustration } from '../components/UndrawIllustration';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'features')!.captions;

// One real illustration at a time, big, no text labels anywhere in the
// scene itself. The caption band is the only text, and it's the same
// single line the whole time (see sceneData.ts) rather than a per-icon
// label, since the user was explicit: no text, not even labels, here.
const FEATURES = ['share-link', 'file-manager', 'data-trends', 'guidelines', 'digital-calendar'];
const BEAT = 90;

export const Scene7Features: React.FC = () => {
  const frame = useCurrentFrame();
  const active = getActiveCaption(frame, captionBeats);

  return (
    <AbsoluteFill style={{ background: COLORS.white, alignItems: 'center', justifyContent: 'center' }}>
      {FEATURES.map((name, i) => {
        const start = i * BEAT;
        const end = start + BEAT;
        const opacity = interpolate(frame, [start, start + 15, end - 15, end], [0, 1, 1, 0]);
        if (frame < start || frame >= end) return null;
        return (
          <div key={name} style={{ position: 'absolute', opacity }}>
            <UndrawIllustration name={name} width={560} />
          </div>
        );
      })}
      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
