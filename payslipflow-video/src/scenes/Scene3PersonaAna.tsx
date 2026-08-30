import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { UndrawIllustration } from '../components/UndrawIllustration';
import { MoodIcon } from '../components/MoodIcon';
import { fallInto } from '../utils/motion';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'personaAna')!.captions;

export const Scene3PersonaAna: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);

  const anaIn = fallInto(frame, fps, 0);
  const statIn = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' });
  const moodIn = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: 'clamp' });

  // Stressed while she's doing this by hand, switches once PayslipFlow takes over.
  const mood = frame < 620 ? 'stressed' : 'happy';

  const sendProgress = interpolate(frame, [620, 700], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sentCount = Math.round(interpolate(frame, [620, 700], [0, 30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const savedStatOpacity = interpolate(frame, [800, 830], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.mist }}>
      <div style={{ position: 'absolute', left: 260, top: 140, opacity: anaIn.opacity, transform: `translateY(${anaIn.translateY}px)` }}>
        <UndrawIllustration name="ana" width={420} />
      </div>

      {/* Mood icon floats near her, never touches the illustration itself */}
      <div style={{ position: 'absolute', left: 230, top: 120, opacity: moodIn }}>
        <MoodIcon mood={mood} size={80} />
      </div>

      <p style={{ position: 'absolute', left: 260, top: 570, fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 30, color: COLORS.navy, opacity: anaIn.opacity }}>
        Ana &middot; Small Business Owner
      </p>

      <div
        style={{
          position: 'absolute',
          left: 1300,
          top: 140,
          opacity: statIn,
          background: COLORS.white,
          borderRadius: 16,
          padding: '10px 24px',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
        }}
      >
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 36, color: COLORS.teal, margin: 0 }}>30</p>
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 15, color: COLORS.slateSoft, margin: 0 }}>employees</p>
      </div>

      {frame >= 610 && (
        <>
          <p
            style={{
              position: 'absolute',
              left: 1200,
              top: 320,
              fontFamily: FONT_FAMILY,
              fontWeight: 800,
              fontSize: 30,
              color: COLORS.navy,
              opacity: sendProgress
            }}
          >
            {sentCount} / 30 payslips sent
          </p>
          <div
            style={{
              position: 'absolute',
              left: 1200,
              top: 370,
              width: 260,
              height: 14,
              borderRadius: 7,
              background: `${COLORS.mist}`,
              border: `2px solid ${COLORS.teal}33`,
              overflow: 'hidden'
            }}
          >
            <div style={{ width: `${sendProgress * 100}%`, height: '100%', background: COLORS.teal }} />
          </div>
        </>
      )}

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 150, textAlign: 'center', opacity: savedStatOpacity }}>
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 34, color: COLORS.teal, margin: 0 }}>
          Payday, without the stress
        </p>
      </div>

      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
