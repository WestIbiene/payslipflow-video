import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { PersonIllustration } from '../components/PersonIllustration';
import { PollCard, SheetIcon } from '../components/SceneProps';
import { fallInto } from '../utils/motion';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'personaJenny')!.captions;

// 5 scattered "client sheet" positions (chaos), anchored on the RIGHT side
// of the frame -- deliberately kept well away from Jenny's fixed position
// on the left, so the tabs never pass over her face or name label.
const SCATTERED = [
  { x: 1180, y: 260, rot: -8 },
  { x: 1480, y: 220, rot: 6 },
  { x: 1140, y: 460, rot: 10 },
  { x: 1500, y: 440, rot: -6 },
  { x: 1320, y: 180, rot: 3 }
];
const SIDEBAR_TARGET = { x: 1420, y: 340 };

export const Scene5PersonaJenny: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);

  const jennyIn = fallInto(frame, fps, 0);
  const collapse = interpolate(frame, [300, 400], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tabsOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' });
  const sidebarOpacity = interpolate(frame, [380, 410], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // FIX: once the sheets have attached to the sidebar, clear them off the
  // screen entirely before the poll comes in. Previously they just sat
  // there forever, cluttering the same right-side region the poll and the
  // satisfied-clients row also use -- that's what was reading as "messy."
  const clearOutOpacity = interpolate(frame, [410, 440], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Poll now gets the entire freed-up right side to itself, so it's shown
  // much bigger -- no need to stay small when nothing else shares the space.
  const pollOpacity = interpolate(frame, [460, 500], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const resultsProgress = interpolate(frame, [540, 640], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const satisfiedOpacity = interpolate(frame, [660, 700], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finalStatOpacity = interpolate(frame, [800, 830], [0, 1], { extrapolateRight: 'clamp' });

  const expression = frame < 400 ? 'stressed' : 'smile';

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

      {/* Chaotic client SHEETS collapsing into a single PayslipFlow sidebar,
          then clearing off screen entirely once the point is made. */}
      {SCATTERED.map((pos, i) => {
        const x = interpolate(collapse, [0, 1], [pos.x, SIDEBAR_TARGET.x]);
        const y = interpolate(collapse, [0, 1], [pos.y, SIDEBAR_TARGET.y + (i - 2) * 30]);
        const rot = interpolate(collapse, [0, 1], [pos.rot, 0]);
        const scale = interpolate(collapse, [0, 1], [1.15, 0.55]);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              transform: `rotate(${rot}deg) scale(${scale})`,
              opacity: tabsOpacity * clearOutOpacity
            }}
          >
            <SheetIcon size={90} />
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: SIDEBAR_TARGET.x - 35,
          top: SIDEBAR_TARGET.y - 105,
          width: 70,
          height: 210,
          borderRadius: 14,
          background: COLORS.teal,
          opacity: sidebarOpacity * clearOutOpacity,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span style={{ color: COLORS.white, fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 15, writingMode: 'vertical-rl' }}>
          PayslipFlow
        </span>
      </div>

      {/* Poll feature: now has the whole right side to itself, shown big */}
      <div style={{ position: 'absolute', right: 220, top: 260, opacity: pollOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <PollCard size={420} resultsProgress={resultsProgress} />
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 20, color: COLORS.slateSoft, textAlign: 'center' }}>
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
