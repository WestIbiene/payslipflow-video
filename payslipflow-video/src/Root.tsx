import React from 'react';
import { Composition } from 'remotion';
import { MyPayslipFlowPromo } from './Video';
import { TOTAL_DURATION_IN_FRAMES } from './scenes/sceneData';
import { FPS } from './theme';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MyPayslipFlowPromo"
      component={MyPayslipFlowPromo}
      durationInFrames={TOTAL_DURATION_IN_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
