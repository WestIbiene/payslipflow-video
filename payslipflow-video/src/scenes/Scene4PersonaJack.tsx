import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { PersonIllustration } from '../components/PersonIllustration';
import { DeskIcon, PayslipDocument, BankIcon } from '../components/SceneProps';
import { SilhouetteFigure } from '../components/SilhouetteFigure';
import { fallInto } from '../utils/motion';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'personaJack')!.captions;

export const Scene4PersonaJack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);

  const deskIn = fallInto(frame, fps, 0);
  const jackIn = fallInto(frame, fps, 14);
  const employeeIn = fallInto(frame, fps, 40);

  const badDocOpacity = interpolate(frame, [220, 260, 440, 470], [0, 1, 1, 0]);
  const goodDocOpacity = interpolate(frame, [460, 500], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bankApprovedOpacity = interpolate(frame, [690, 720], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const expression = frame < 470 ? 'stressed' : 'smile';
  const gestureProgress = interpolate(frame, [760, 800], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const approvedStampOpacity = interpolate(frame, [700, 730], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.white }}>
      <div style={{ position: 'absolute', left: 260, top: 300, opacity: deskIn.opacity, transform: `translateY(${deskIn.translateY}px)` }}>
        <DeskIcon size={150} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 420,
          top: 300,
          opacity: jackIn.opacity,
          transform: `translateY(${jackIn.translateY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14
        }}
      >
        <PersonIllustration variant="jack" size={280} expression={expression} gestureProgress={gestureProgress} />
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 30, color: COLORS.navy }}>Jack &middot; HR Administrator</p>
      </div>

      {/* Employee with a request */}
      <div
        style={{
          position: 'absolute',
          right: 380,
          top: 330,
          opacity: employeeIn.opacity,
          transform: `translateY(${employeeIn.translateY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10
        }}
      >
        <SilhouetteFigure size={110} color={COLORS.slateSoft} />
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 16, color: COLORS.slateSoft }}>An employee</p>
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 15, color: COLORS.coral }}>Needs a payslip today</p>
      </div>

      {/* Bad payslip attempt + rejected bank */}
      <div style={{ position: 'absolute', left: 720, top: 130, opacity: badDocOpacity }}>
        <PayslipDocument size={130} verified={false} />
      </div>
      <div style={{ position: 'absolute', left: 900, top: 160, opacity: badDocOpacity }}>
        <BankIcon size={110} approved={false} />
      </div>

      {/* Good, verified payslip */}
      <div style={{ position: 'absolute', left: 720, top: 130, opacity: goodDocOpacity }}>
        <PayslipDocument size={130} verified={true} />
      </div>
      <div style={{ position: 'absolute', left: 900, top: 160 }}>
        <div style={{ position: 'absolute', opacity: 1 - bankApprovedOpacity }}>
          <BankIcon size={110} approved={false} />
        </div>
        <div style={{ position: 'absolute', opacity: bankApprovedOpacity }}>
          <BankIcon size={110} approved={true} />
        </div>
      </div>

      <p
        style={{
          position: 'absolute',
          left: 700,
          top: 330,
          fontFamily: FONT_FAMILY,
          fontWeight: 800,
          fontSize: 24,
          color: COLORS.teal,
          opacity: approvedStampOpacity
        }}
      >
        Loan approved
      </p>

      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
