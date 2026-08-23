import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { Avatar } from '../components/Avatar';
import { SCENES } from './sceneData';

const PINS = [
  { label: 'Lagos', currency: '\u20a6', x: -320, y: -40 },
  { label: 'London', currency: '\u00a3', x: 0, y: -140 },
  { label: 'Toronto', currency: '$', x: 320, y: -40 }
];

export const Scene5PersonaJack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const avatarIn = spring({ frame, fps, config: { damping: 14 } });
  const nameOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: 'clamp' });
  const pinsOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' });

  // Payslips fly out from center to each pin between 9s-13s (frame 270-390).
  const fly = interpolate(frame, [270, 390], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.mist }}>
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ transform: `scale(${avatarIn})` }}>
          <Avatar initial="J" bg={COLORS.white} />
        </div>
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 32, color: COLORS.navy, opacity: nameOpacity }}>
          Jack &middot; Distributed Team
        </p>
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        {PINS.map((pin, i) => {
          const flyX = interpolate(fly, [0, 1], [0, pin.x]);
          const flyY = interpolate(fly, [0, 1], [80, pin.y + 60]);
          return (
            <React.Fragment key={i}>
              {/* Pin */}
              <div
                style={{
                  position: 'absolute',
                  transform: `translate(${pin.x}px, ${pin.y}px)`,
                  opacity: pinsOpacity,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: COLORS.navy,
                    color: COLORS.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: FONT_FAMILY,
                    fontWeight: 800,
                    fontSize: 24
                  }}
                >
                  {pin.currency}
                </div>
                <p style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 18, color: COLORS.slateSoft }}>{pin.label}</p>
              </div>

              {/* Flying payslip */}
              <div
                style={{
                  position: 'absolute',
                  transform: `translate(${flyX}px, ${flyY}px)`,
                  opacity: fly > 0.05 ? interpolate(fly, [0.85, 1], [1, 0], { extrapolateLeft: 'clamp' }) : 0
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="13" rx="2" fill={COLORS.teal} />
                  <path d="M3 7l9 6 9-6" stroke={COLORS.white} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </React.Fragment>
          );
        })}
      </AbsoluteFill>

      <Caption text={SCENES[4].caption} />
    </AbsoluteFill>
  );
};
