import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS } from '../theme';

const PIECE_COLORS = [COLORS.teal, COLORS.coral, COLORS.tealDark, COLORS.ink, '#FFFFFF'];
const PIECE_COUNT = 45;
const GRAVITY = 0.09;

// Deterministic per-piece "randomness" (no Math.random -- Remotion renders
// frames out of order across workers, so anything random must be a pure
// function of the piece index, not actual randomness).
function pieceSeed(i: number) {
  const angle = ((i * 137.5) % 360) * (Math.PI / 180);
  const speed = 4 + (i % 6);
  return { angle, speed };
}

// A burst of confetti radiating out from (originX, originY), starting at
// `startFrame` (scene-relative). Before startFrame, renders nothing.
export const Confetti: React.FC<{ startFrame: number; originX: number; originY: number }> = ({
  startFrame,
  originX,
  originY
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;
  if (t < 0) return null;

  const DURATION = 90; // 3s burst + fall
  const fadeStart = 65;

  return (
    <svg
      viewBox="0 0 1920 1080"
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {Array.from({ length: PIECE_COUNT }).map((_, i) => {
        const { angle, speed } = pieceSeed(i);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed * 1.4 - 6; // biased upward at launch
        const x = originX + vx * t;
        const y = originY + vy * t + 0.5 * GRAVITY * t * t;
        const rotation = (i * 53 + t * (4 + (i % 3))) % 360;
        const opacity = t > fadeStart ? Math.max(0, 1 - (t - fadeStart) / (DURATION - fadeStart)) : 1;
        const color = PIECE_COLORS[i % PIECE_COLORS.length];
        const isRect = i % 2 === 0;

        if (t > DURATION) return null;

        return isRect ? (
          <rect
            key={i}
            x={x - 6}
            y={y - 4}
            width={12}
            height={8}
            fill={color}
            opacity={opacity}
            transform={`rotate(${rotation} ${x} ${y})`}
          />
        ) : (
          <circle key={i} cx={x} cy={y} r={5} fill={color} opacity={opacity} />
        );
      })}
    </svg>
  );
};
