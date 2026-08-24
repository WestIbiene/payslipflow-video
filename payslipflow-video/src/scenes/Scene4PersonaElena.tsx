import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { PersonIllustration } from '../components/PersonIllustration';
import { SCENES } from './sceneData';

// 5 scattered "client tab" positions (chaos), and their collapsed target
// (a single sidebar shape, right-aligned).
const SCATTERED = [
  { x: -260, y: -140, rot: -8 },
  { x: 180, y: -180, rot: 6 },
  { x: -300, y: 100, rot: 10 },
  { x: 240, y: 60, rot: -6 },
  { x: 0, y: -260, rot: 3 }
];

export const Scene4PersonaElena: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const avatarIn = spring({ frame, fps, config: { damping: 14 } });
  const nameOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp' });

  // Collapse animation runs from frame 300 to 360 (10s-12s in).
  const collapse = interpolate(frame, [300, 360], [0, 1], { extrapolateRight: 'clamp' });

  // Stressed during the chaotic-tabs phase, smiles once everything collapses
  // into one sidebar -- reuses the same timing the tabs already animate on.
  const expression = frame < 300 ? 'stressed' : 'smile';
  const tabsOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const sidebarOpacity = interpolate(frame, [340, 370], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.white }}>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
        <div style={{ transform: `scale(${avatarIn})` }}>
          <PersonIllustration variant="elena" expression={expression} />
        </div>
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 32, color: COLORS.navy, opacity: nameOpacity }}>
          Elena &middot; Accountant, 5 Clients
        </p>
      </AbsoluteFill>

      {/* Scattered tabs, collapsing toward a single sidebar on the right */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        {SCATTERED.map((pos, i) => {
          const x = interpolate(collapse, [0, 1], [pos.x, 420]);
          const y = interpolate(collapse, [0, 1], [pos.y, (i - 2) * 12]);
          const rot = interpolate(collapse, [0, 1], [pos.rot, 0]);
          const w = interpolate(collapse, [0, 1], [110, 60]);
          const h = interpolate(collapse, [0, 1], [70, 200 / 5]);

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: w,
                height: h,
                background: COLORS.mist,
                border: `2px solid ${COLORS.navy}33`,
                borderRadius: 10,
                transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
                opacity: tabsOpacity
              }}
            />
          );
        })}
        <div
          style={{
            position: 'absolute',
            width: 70,
            height: 210,
            borderRadius: 14,
            background: COLORS.navy,
            transform: 'translateX(420px)',
            opacity: sidebarOpacity,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ color: COLORS.white, fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 16, writingMode: 'vertical-rl' }}>
            PayslipFlow
          </span>
        </div>
      </AbsoluteFill>

      <Caption text={SCENES[3].caption} />
    </AbsoluteFill>
  );
};
