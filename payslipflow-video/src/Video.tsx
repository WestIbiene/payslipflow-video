import React from 'react';
import { AbsoluteFill, Audio, Series, staticFile } from 'remotion';
import { FPS } from './theme';
import { SCENES } from './scenes/sceneData';
import { Watermark } from './components/Watermark';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Explainer } from './scenes/Scene2Explainer';
import { Scene3PersonaAna } from './scenes/Scene3PersonaAna';
import { Scene4PersonaElena } from './scenes/Scene4PersonaElena';
import { Scene5PersonaJack } from './scenes/Scene5PersonaJack';
import { Scene6Trust } from './scenes/Scene6Trust';
import { Scene7Features } from './scenes/Scene7Features';
import { Scene8Payoff } from './scenes/Scene8Payoff';
import { Scene9CTA } from './scenes/Scene9CTA';

const SCENE_COMPONENTS = [
  Scene1Hook,
  Scene2Explainer,
  Scene3PersonaAna,
  Scene4PersonaElena,
  Scene5PersonaJack,
  Scene6Trust,
  Scene7Features,
  Scene8Payoff,
  Scene9CTA
];

// ============================================================================
// VOICEOVER: drop a file at public/voiceover.mp3 and flip this to true.
// The full script (matching these scene captions word-for-word) is in
// PayslipFlow-Video-Script.md -- record or generate it as ONE continuous
// file for the whole 110s, not per-scene, so timing doesn't drift.
// ============================================================================
const HAS_VOICEOVER = false;

export const MyPayslipFlowPromo: React.FC = () => {
  return (
    <AbsoluteFill>
      {HAS_VOICEOVER && <Audio src={staticFile('voiceover.mp3')} />}
      <Series>
        {SCENES.map((scene, i) => {
          const Component = SCENE_COMPONENTS[i];
          return (
            <Series.Sequence key={scene.id} durationInFrames={scene.durationInSeconds * FPS}>
              <Component />
            </Series.Sequence>
          );
        })}
      </Series>
      <Watermark />
    </AbsoluteFill>
  );
};
