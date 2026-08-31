import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Caption } from '../components/Caption';
import { UndrawIllustration } from '../components/UndrawIllustration';
import { JetPayslip } from '../components/JetPayslip';
import { COLORS } from '../theme';
import { SCENES } from './sceneData';

const captionText = SCENES.find((s) => s.id === 'explainer')!.captions[0].text;

// One element at a time, each one big, instead of three small icons
// crammed together. Sheet -> email -> payslip sending, in sequence.
const BEAT = 100; // frames per beat

export const Scene2Explainer: React.FC = () => {
  const frame = useCurrentFrame();

  const sheetOpacity = interpolate(frame, [0, 20, BEAT - 20, BEAT], [0, 1, 1, 0]);
  const emailOpacity = interpolate(frame, [BEAT, BEAT + 20, BEAT * 2 - 20, BEAT * 2], [0, 1, 1, 0]);
  const sendOpacity = interpolate(frame, [BEAT * 2, BEAT * 2 + 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.white, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', opacity: sheetOpacity }}>
        <UndrawIllustration name="spreadsheet" width={620} />
      </div>
      <div style={{ position: 'absolute', opacity: emailOpacity }}>
        <UndrawIllustration name="email" width={560} />
      </div>
      <div style={{ position: 'absolute', opacity: sendOpacity }}>
        <JetPayslip size={480} />
      </div>
      <Caption text={captionText} />
    </AbsoluteFill>
  );
};
