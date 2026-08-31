import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { UndrawIllustration } from '../components/UndrawIllustration';
import { fallInto } from '../utils/motion';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'personaJack')!.captions;

// Beat boundaries -- Jack and Ben are never on screen together. Each one
// gets the full frame when the story is about them.
const A_END = 100; // Jack alone
const B_END = 200; // Jack + Scheduled button press
const C_END = 300; // Ben alone, introduced
const D_END = 420; // Ben + message (no button yet, button appears late)
const E_END = 540; // Jack alone + his message (button appears late)
// Beat F (540 -> end): released / thumbs-up

const NotificationCard: React.FC<{ text: string; showButton: boolean }> = ({ text, showButton }) => (
  <div style={{ background: COLORS.white, borderRadius: 20, padding: 26, width: 380, boxShadow: '0 16px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: 14 }}>
    <p style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 20, color: COLORS.navy, margin: 0, lineHeight: 1.4 }}>{text}</p>
    {showButton && (
      <div style={{ alignSelf: 'flex-start', background: COLORS.teal, color: COLORS.white, fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 18, padding: '10px 28px', borderRadius: 12 }}>
        Approve
      </div>
    )}
  </div>
);

export const Scene4PersonaJack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);

  const jackIn1 = fallInto(frame, fps, 0);
  const aOpacity = interpolate(frame, [0, 20, A_END - 15, A_END], [0, 1, 1, 0]);

  const bOpacity = interpolate(frame, [A_END, A_END + 15, B_END - 15, B_END], [0, 1, 1, 0]);
  // Button press: scale down then back up, once, partway through this beat.
  const pressLocal = frame - (A_END + 40);
  const pressScale = pressLocal >= 0 && pressLocal < 14 ? interpolate(pressLocal, [0, 7, 14], [1, 0.88, 1]) : 1;

  const benIn = fallInto(frame, fps, B_END + 10);
  const cOpacity = interpolate(frame, [B_END, B_END + 15, C_END - 15, C_END], [0, 1, 1, 0]);

  const dOpacity = interpolate(frame, [C_END, C_END + 15, D_END - 15, D_END], [0, 1, 1, 0]);
  const benButtonShown = frame >= D_END - 25;

  const jackIn2 = fallInto(frame, fps, D_END + 10);
  const eOpacity = interpolate(frame, [D_END, D_END + 15, E_END - 15, E_END], [0, 1, 1, 0]);
  const jackButtonShown = frame >= E_END - 25;

  const fOpacity = interpolate(frame, [E_END, E_END + 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.white }}>
      {/* A: Jack alone, big */}
      {frame < A_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: aOpacity }}>
          <div style={{ transform: `translateY(${jackIn1.translateY}px)`, opacity: jackIn1.opacity }}>
            <UndrawIllustration name="jack" width={680} />
          </div>
        </AbsoluteFill>
      )}

      {/* B: Jack + Scheduled button, pressed once */}
      {frame >= A_END && frame < B_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 50, flexDirection: 'column', opacity: bOpacity }}>
          <UndrawIllustration name="jack" width={520} />
          <div style={{ transform: `scale(${pressScale})`, background: COLORS.teal, color: COLORS.white, fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 34, padding: '22px 60px', borderRadius: 20 }}>
            Scheduled
          </div>
        </AbsoluteFill>
      )}

      {/* C: Ben alone, big, introduced */}
      {frame >= B_END && frame < C_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: cOpacity }}>
          <div style={{ transform: `translateY(${benIn.translateY}px)`, opacity: benIn.opacity }}>
            <UndrawIllustration name="ben" width={620} />
          </div>
        </AbsoluteFill>
      )}

      {/* D: Ben + his notification, button appears late in this beat */}
      {frame >= C_END && frame < D_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 50, flexDirection: 'column', opacity: dOpacity }}>
          <UndrawIllustration name="ben" width={420} />
          <NotificationCard text="Confirm salaries have been disbursed?" showButton={benButtonShown} />
        </AbsoluteFill>
      )}

      {/* E: Jack alone + his notification, button appears late */}
      {frame >= D_END && frame < E_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 50, flexDirection: 'column', opacity: eOpacity }}>
          <div style={{ transform: `translateY(${jackIn2.translateY}px)`, opacity: jackIn2.opacity }}>
            <UndrawIllustration name="jack" width={420} />
          </div>
          <NotificationCard text="Ben confirmed. Ready to release payslips?" showButton={jackButtonShown} />
        </AbsoluteFill>
      )}

      {/* F: released */}
      {frame >= E_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: fOpacity }}>
          <UndrawIllustration name="jack-thumbsup" width={420} />
        </AbsoluteFill>
      )}

      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
