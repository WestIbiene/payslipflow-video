import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { PersonIllustration } from '../components/PersonIllustration';
import { DeliveredIcon, EnvelopeIcon, GoogleSheetIcon, PollBars } from '../components/SceneProps';
import { fallInto } from '../utils/motion';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'personaJenny')!.captions;

// 5 "client sheet" positions, 3 up / 2 down, anchored on the RIGHT side of
// the frame -- kept well away from Jenny's fixed position on the left, so
// nothing ever passes over her face or name label. These stay fixed for
// the whole scene: the icon shown at each position changes over time
// (sheet -> email -> delivered) instead of the positions themselves moving.
const POSITIONS = [
  { x: 1180, y: 220, rot: -6 },
  { x: 1370, y: 190, rot: 4 },
  { x: 1550, y: 230, rot: -3 },
  { x: 1230, y: 400, rot: 6 },
  { x: 1470, y: 410, rot: -5 }
];

export const Scene5PersonaJenny: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);

  const jennyIn = fallInto(frame, fps, 0);

  // Three states for the client-sheet icons, each a simple crossfade into
  // the next -- no collapsing/stacking animation, they just sit at their
  // fixed positions and change what they're showing:
  //   sheets (chaos) -> emails (sent) -> delivered checks
  // ~2s (60 frames) of holding at each state before moving to the next.
  const sheetIn = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sheetOut = interpolate(frame, [200, 230], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sheetOpacity = sheetIn * sheetOut;

  const emailIn = interpolate(frame, [200, 230], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const emailOut = interpolate(frame, [290, 320], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const emailOpacity = emailIn * emailOut;

  const deliveredIn = interpolate(frame, [290, 320], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const deliveredOut = interpolate(frame, [400, 430], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const deliveredOpacity = deliveredIn * deliveredOut;

  // Poll now gets the entire freed-up right side to itself, so it's shown
  // much bigger -- no need to stay small when nothing else shares the space.
  const pollOpacity = interpolate(frame, [460, 500], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const resultsProgress = interpolate(frame, [540, 640], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const satisfiedOpacity = interpolate(frame, [660, 700], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finalStatOpacity = interpolate(frame, [800, 830], [0, 1], { extrapolateRight: 'clamp' });

  const expression = frame < 320 ? 'stressed' : 'smile';

  return (
    <AbsoluteFill style={{ background: COLORS.white }}>
      {/* Jenny, fixed on the left -- never shares space with the tabs/sidebar */}
      <div
        style={{
          position: 'absolute',
          left: 220,
          top: 300,
          opacity: jennyIn.opacity,
          transform: `translateY(${jennyIn.translateY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14
        }}
      >
        <PersonIllustration variant="jenny" size={280} expression={expression} />
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 30, color: COLORS.navy }}>Jenny &middot; Boutique HR Firm</p>
        <div style={{ background: COLORS.white, borderRadius: 16, padding: '6px 18px', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}>
          <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 22, color: COLORS.teal, margin: 0 }}>5 businesses, 1 sheet each</p>
        </div>
      </div>

      {/* 5 client sheets, fixed in place (3 up / 2 down). Each one just
          changes what it's showing over time -- sheet -> email -> delivered
          check -- instead of moving/collapsing anywhere. */}
      {POSITIONS.map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            transform: `rotate(${pos.rot}deg)`
          }}
        >
          <div style={{ position: 'absolute', opacity: sheetOpacity }}>
            <GoogleSheetIcon size={100} />
          </div>
          <div style={{ position: 'absolute', opacity: emailOpacity }}>
            <EnvelopeIcon size={100} />
          </div>
          <div style={{ position: 'absolute', opacity: deliveredOpacity }}>
            <DeliveredIcon size={100} />
          </div>
        </div>
      ))}

      {/* Poll feature: now has the whole right side to itself, shown big,
          with just the bars -- no card, no header, no response buttons. */}
      <div style={{ position: 'absolute', right: 200, top: 190, opacity: pollOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <PollBars size={460} resultsProgress={resultsProgress} />
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 22, color: COLORS.slateSoft, textAlign: 'center' }}>
          Sent with every payslip
        </p>
      </div>

      {/* Satisfied clients indicator -- clearly labeled now, sits below the
          poll card with real spacing instead of crowding next to it. */}
      <div style={{ position: 'absolute', right: 260, top: 660, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: satisfiedOpacity }}>
        <div style={{ display: 'flex', gap: 14 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', background: COLORS.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 16 16">
                <path d="M2 8l4 4 8-8" stroke={COLORS.white} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 18, color: COLORS.navy, margin: 0 }}>5 happy clients</p>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 150, textAlign: 'center', opacity: finalStatOpacity }}>
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 30, color: COLORS.teal, margin: 0 }}>
          Better decisions, for every client she manages
        </p>
      </div>

      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
