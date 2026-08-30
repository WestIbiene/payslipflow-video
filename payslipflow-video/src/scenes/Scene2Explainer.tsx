import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { SheetIcon } from '../components/SceneProps';
import { SCENES } from './sceneData';

const captionText = SCENES.find((s) => s.id === 'explainer')!.captions[0].text;

const IconBox: React.FC<{ children: React.ReactNode; delay: number; label: string }> = ({
  children,
  delay,
  label
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame: frame - delay, fps, config: { damping: 12 } });
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, opacity, transform: `scale(${scale})` }}>
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: 28,
          background: COLORS.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(30,76,135,0.12)'
        }}
      >
        {children}
      </div>
      <p style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 22, color: COLORS.navy }}>{label}</p>
    </div>
  );
};

const Arrow: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const width = interpolate(frame, [delay, delay + 15], [0, 70], { extrapolateRight: 'clamp' });
  return (
    <svg width="90" height="24" viewBox="0 0 90 24" style={{ overflow: 'visible' }}>
      <line x1="0" y1="12" x2={width} y2="12" stroke={COLORS.teal} strokeWidth="4" strokeLinecap="round" />
      {width > 60 && (
        <path d={`M ${width - 10} 4 L ${width} 12 L ${width - 10} 20`} stroke={COLORS.teal} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
};

export const Scene2Explainer: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.white, alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <IconBox delay={0} label="Google Sheet">
        <SheetIcon size={64} />
      </IconBox>
      <Arrow delay={20} />
      <IconBox delay={45} label="Payslip + Email">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="18" height="13" rx="2" stroke={COLORS.navy} strokeWidth="1.6" />
          <path d="M3 7l9 6 9-6" stroke={COLORS.navy} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconBox>
      <Arrow delay={75} />
      <IconBox delay={100} label="Delivered">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={COLORS.teal} strokeWidth="1.6" />
          <path d="M8 12.5l2.5 2.5L16 9" stroke={COLORS.teal} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconBox>
    </div>
    <Caption text={captionText} />
  </AbsoluteFill>
);
