import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { SCENES } from './sceneData';

// 12s scene, 4 features, ~90 frames (3s) each -- fast-cut montage feel.
const FEATURES = [
  { label: 'Secure Drive links', icon: 'link' as const },
  { label: 'Automated folders', icon: 'folder' as const },
  { label: 'One-click polls', icon: 'poll' as const },
  { label: 'Approval gates', icon: 'gate' as const }
];

const ICONS: Record<string, React.ReactNode> = {
  link: (
    <path
      d="M9 15l6-6M8 12l-2 2a3.5 3.5 0 105 5l2-2M16 12l2-2a3.5 3.5 0 10-5-5l-2 2"
      stroke={COLORS.navy}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
  folder: <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke={COLORS.navy} strokeWidth="1.6" />,
  poll: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" stroke={COLORS.navy} strokeWidth="1.6" />
      <path d="M8 12.5l2.5 2.5L16 9" stroke={COLORS.teal} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  gate: (
    <>
      <rect x="5" y="10" width="14" height="10" rx="2" stroke={COLORS.navy} strokeWidth="1.6" />
      <path d="M8 10V7a4 4 0 018 0v3" stroke={COLORS.navy} strokeWidth="1.6" />
    </>
  )
};

export const Scene7Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const perFeature = 90; // 3s each

  return (
    <AbsoluteFill style={{ background: COLORS.white, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: 40 }}>
        {FEATURES.map((f, i) => {
          const start = i * perFeature;
          const localFrame = frame - start;
          const isActive = localFrame >= 0;
          const scale = spring({ frame: localFrame, fps, config: { damping: 12 } });
          const opacity = interpolate(localFrame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
          const dim = frame > start + perFeature ? 0.25 : 1;

          return (
            <div
              key={f.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                opacity: isActive ? opacity * dim : 0,
                transform: `scale(${isActive ? scale : 0.6})`
              }}
            >
              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 24,
                  background: COLORS.mist,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  {ICONS[f.icon]}
                </svg>
              </div>
              <p style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 18, color: COLORS.navy, textAlign: 'center', maxWidth: 130 }}>
                {f.label}
              </p>
            </div>
          );
        })}
      </div>
      <Caption text={SCENES[6].caption} />
    </AbsoluteFill>
  );
};
