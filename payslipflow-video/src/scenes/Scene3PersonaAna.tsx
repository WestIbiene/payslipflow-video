import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { PersonIllustration } from '../components/PersonIllustration';
import { HouseIcon } from '../components/SceneProps';
import { SilhouetteFigure } from '../components/SilhouetteFigure';
import { fallInto } from '../utils/motion';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'personaAna')!.captions;

export const Scene3PersonaAna: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);

  // Entrance: Ana falls into place first, the house icon a beat after.
  const anaIn = fallInto(frame, fps, 0);
  const houseIn = fallInto(frame, fps, 14);
  const accountantIn = fallInto(frame, fps, 210);
  const statIn = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' });

  // Stressed while she's still doing this manually, smiles once PayslipFlow
  // takes over.
  const expression = frame < 620 ? 'stressed' : 'smile';

  // The "one-click send" burst: a small cluster of payslip icons fans out
  // to represent all 15 going out at once, and a counter climbs to 15.
  const sendProgress = interpolate(frame, [620, 700], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sentCount = Math.round(interpolate(frame, [620, 700], [0, 15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const savedStatOpacity = interpolate(frame, [800, 830], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.mist }}>
      {/* House + Ana, left-of-center */}
      <div style={{ position: 'absolute', left: 300, top: 260, opacity: houseIn.opacity, transform: `translateY(${houseIn.translateY}px)` }}>
        <HouseIcon size={130} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 460,
          top: 300,
          opacity: anaIn.opacity,
          transform: `translateY(${anaIn.translateY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14
        }}
      >
        <PersonIllustration variant="ana" size={280} expression={expression} />
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 30, color: COLORS.navy }}>Ana &middot; Small Business Owner</p>
      </div>

      {/* 15 employees stat chip */}
      <div
        style={{
          position: 'absolute',
          left: 340,
          top: 180,
          opacity: statIn,
          background: COLORS.white,
          borderRadius: 16,
          padding: '10px 20px',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
        }}
      >
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 30, color: COLORS.teal, margin: 0 }}>15</p>
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 14, color: COLORS.slateSoft, margin: 0 }}>employees</p>
      </div>

      {/* Accountant, off to the right, hands off numbers to Ana */}
      <div
        style={{
          position: 'absolute',
          right: 340,
          top: 340,
          opacity: accountantIn.opacity,
          transform: `translateY(${accountantIn.translateY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10
        }}
      >
        <SilhouetteFigure size={110} color={COLORS.slateSoft} />
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 16, color: COLORS.slateSoft }}>Her accountant</p>
      </div>

      {/* One-click send burst: small payslip icons fanning outward + counter */}
      {frame >= 610 && (
        <>
          {[0, 1, 2, 3, 4].map((i) => {
            const fanAngle = (i - 2) * 22;
            const dist = sendProgress * 260;
            const rad = (fanAngle * Math.PI) / 180;
            const x = 730 + Math.sin(rad) * dist;
            const y = 460 - Math.cos(rad) * dist * 0.5;
            return (
              <div key={i} style={{ position: 'absolute', left: x, top: y, opacity: sendProgress * (1 - sendProgress * 0.3) }}>
                <svg width="34" height="42" viewBox="0 0 34 42">
                  <rect width="34" height="42" rx="4" fill={COLORS.white} stroke={COLORS.teal} strokeWidth="2" />
                  <rect x="6" y="10" width="22" height="4" rx="2" fill={COLORS.teal} />
                  <rect x="6" y="20" width="16" height="4" rx="2" fill={COLORS.teal} />
                </svg>
              </div>
            );
          })}
          <p
            style={{
              position: 'absolute',
              left: 660,
              top: 560,
              fontFamily: FONT_FAMILY,
              fontWeight: 800,
              fontSize: 26,
              color: COLORS.navy
            }}
          >
            {sentCount} / 15 sent
          </p>
        </>
      )}

      {/* Final saved-time stat */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 150, textAlign: 'center', opacity: savedStatOpacity }}>
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 34, color: COLORS.teal, margin: 0 }}>
          3 hours saved, every pay period
        </p>
      </div>

      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
