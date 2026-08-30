import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { UndrawIllustration } from '../components/UndrawIllustration';
import { MoodIcon } from '../components/MoodIcon';
import { fallInto } from '../utils/motion';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'personaJack')!.captions;

// Simple phone notification mockup -- reused for both Jack and Ben's
// approval taps, since the relay is really about "this happens on a
// phone," not about drawing a whole new environment per person.
const PhoneNotification: React.FC<{ approved: boolean }> = ({ approved }) => (
  <div
    style={{
      width: 220,
      background: COLORS.white,
      borderRadius: 16,
      padding: 16,
      boxShadow: '0 10px 26px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }}
  >
    <p style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 13, color: COLORS.slateSoft, margin: 0 }}>
      PayslipFlow
    </p>
    <p style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 14, color: COLORS.navy, margin: 0 }}>
      {approved ? 'Confirmed by Ben. Ready to release.' : 'Confirm salaries have been disbursed?'}
    </p>
    <div
      style={{
        alignSelf: 'flex-start',
        background: approved ? COLORS.teal : COLORS.mist,
        color: approved ? COLORS.white : COLORS.navy,
        fontFamily: FONT_FAMILY,
        fontWeight: 800,
        fontSize: 13,
        padding: '6px 16px',
        borderRadius: 8
      }}
    >
      {approved ? 'Approved \u2713' : 'Approve'}
    </div>
  </div>
);

export const Scene4PersonaJack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);

  const jackIn = fallInto(frame, fps, 0);
  const benIn = fallInto(frame, fps, 410); // Ben arrives partway through, matching the frame >= 400 render guard below

  const jackMood = frame < 650 ? 'stressed' : 'happy';

  const benPhoneOpacity = interpolate(frame, [460, 500], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const benApproved = frame >= 560;
  const jackPhoneOpacity = interpolate(frame, [650, 690], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const jackApproved = frame >= 750;

  const thumbsUpOpacity = interpolate(frame, [800, 830], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.white }}>
      {/* Jack, left side -- present the whole scene */}
      <div style={{ position: 'absolute', left: 140, top: 160, opacity: jackIn.opacity, transform: `translateY(${jackIn.translateY}px)` }}>
        <UndrawIllustration name="jack" width={380} />
      </div>
      <div style={{ position: 'absolute', left: 110, top: 140, opacity: jackIn.opacity }}>
        <MoodIcon mood={jackMood} size={70} />
      </div>
      <p style={{ position: 'absolute', left: 150, top: 560, fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 28, color: COLORS.navy, opacity: jackIn.opacity }}>
        Jack &middot; HR Manager
      </p>

      {/* Jack's own phone: confirms once Ben has already confirmed */}
      {frame >= 650 && (
        <div style={{ position: 'absolute', left: 130, top: 380, opacity: jackPhoneOpacity }}>
          <PhoneNotification approved={jackApproved} />
        </div>
      )}

      {/* Ben, right side -- arrives partway through the scene, not from the start */}
      {frame >= 400 && (
        <>
          <div style={{ position: 'absolute', right: 160, top: 160, opacity: benIn.opacity, transform: `translateY(${benIn.translateY}px)` }}>
            <UndrawIllustration name="ben" width={340} />
          </div>
          <p style={{ position: 'absolute', right: 200, top: 520, fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 28, color: COLORS.navy, opacity: benIn.opacity }}>
            Ben &middot; External Accountant
          </p>
          <div style={{ position: 'absolute', right: 200, top: 340, opacity: benPhoneOpacity }}>
            <PhoneNotification approved={benApproved} />
          </div>
        </>
      )}

      {/* Thumbs-up beat, once both have approved and payslips are released */}
      {frame >= 800 && (
        <div style={{ position: 'absolute', left: 140, top: 60, opacity: thumbsUpOpacity }}>
          <UndrawIllustration name="jack-thumbsup" width={140} />
        </div>
      )}

      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
