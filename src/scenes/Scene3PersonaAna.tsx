import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { UndrawIllustration } from '../components/UndrawIllustration';
import { JetPayslip } from '../components/JetPayslip';
import { fallInto } from '../utils/motion';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'personaAna')!.captions;

// Beat boundaries -- one big thing on screen at a time, not layered.
const BEAT_A_END = 110; // Ana alone
const BEAT_B_END = 260; // sheet scrolling + fast counter, Ana gone
const BEAT_C_END = 380; // flock of tiny jet-payslips, alone
// Beat D (380 -> scene end): Ana back, happy, brief

// Fast, discrete jumps rather than a smooth count -- reads as "processing
// quickly" rather than a literal progress readout.
const COUNTER_STEPS = [1, 5, 11, 17, 25, 30];

export const Scene3PersonaAna: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);

  const anaInFirst = fallInto(frame, fps, 0);
  const beatAOpacity = interpolate(frame, [0, 20, BEAT_A_END - 15, BEAT_A_END], [0, 1, 1, 0]);

  const beatBOpacity = interpolate(frame, [BEAT_A_END, BEAT_A_END + 15, BEAT_B_END - 15, BEAT_B_END], [0, 1, 1, 0]);
  const scrollY = interpolate(frame, [BEAT_A_END, BEAT_B_END], [0, -900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stepIndex = Math.min(
    COUNTER_STEPS.length - 1,
    Math.floor(interpolate(frame, [BEAT_A_END + 10, BEAT_B_END - 20], [0, COUNTER_STEPS.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))
  );

  const beatCOpacity = interpolate(frame, [BEAT_B_END, BEAT_B_END + 15, BEAT_C_END - 15, BEAT_C_END], [0, 1, 1, 0]);

  const anaInSecond = fallInto(frame, fps, BEAT_C_END + 10);
  const beatDOpacity = interpolate(frame, [BEAT_C_END, BEAT_C_END + 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.mist }}>
      {/* BEAT A: Ana alone, big, filling most of the frame */}
      {frame < BEAT_A_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: beatAOpacity }}>
          <div style={{ transform: `translateY(${anaInFirst.translateY}px)`, opacity: anaInFirst.opacity }}>
            <UndrawIllustration name="ana" width={700} />
          </div>
        </AbsoluteFill>
      )}

      {/* BEAT B: sheet scrolling through rows + fast counter, Ana not present */}
      {frame >= BEAT_A_END && frame < BEAT_B_END && (
        <AbsoluteFill style={{ opacity: beatBOpacity }}>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
            <div style={{ transform: `translateY(${scrollY}px)`, marginTop: 200 }}>
              <UndrawIllustration name="spreadsheet" width={650} />
            </div>
          </div>
          <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 160 }}>
            <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 140, color: COLORS.teal, margin: 0, textShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              {COUNTER_STEPS[stepIndex]}
            </p>
          </AbsoluteFill>
        </AbsoluteFill>
      )}

      {/* BEAT C: a flock of tiny jet-payslips, nothing else on screen */}
      {frame >= BEAT_B_END && frame < BEAT_C_END && (
        <AbsoluteFill style={{ opacity: beatCOpacity }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const t = frame - BEAT_B_END;
            const angle = (i * 137.5) % 360;
            const speed = 6 + (i % 4);
            const rad = (angle * Math.PI) / 180;
            const x = 960 + Math.cos(rad) * speed * t;
            const y = 540 + Math.sin(rad) * speed * t * 0.6;
            const rot = angle;
            return (
              <div key={i} style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) rotate(${rot}deg)` }}>
                <JetPayslip size={90} />
              </div>
            );
          })}
        </AbsoluteFill>
      )}

      {/* BEAT D: Ana back, happy, brief */}
      {frame >= BEAT_C_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: beatDOpacity }}>
          <div style={{ transform: `translateY(${anaInSecond.translateY}px)`, opacity: anaInSecond.opacity }}>
            <UndrawIllustration name="ana" width={620} />
          </div>
        </AbsoluteFill>
      )}

      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
