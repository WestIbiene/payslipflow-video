import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { UndrawIllustration } from '../components/UndrawIllustration';
import { MoodIcon } from '../components/MoodIcon';
import { fallInto } from '../utils/motion';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'personaJenny')!.captions;

// A single generated payslip, showing only the line items that actually
// apply to that employee -- no blank rows, no forced-in fields. Two of
// these side by side (different item sets) is the whole point of this scene.
const AdaptivePayslip: React.FC<{ items: string[]; delay: number; opacity: number }> = ({ items, delay, opacity }) => (
  <div
    style={{
      width: 200,
      background: COLORS.white,
      borderRadius: 12,
      border: '2px solid #E5E5E5',
      padding: 16,
      opacity
    }}
  >
    <div style={{ width: '100%', height: 12, borderRadius: 6, background: COLORS.teal, marginBottom: 10 }} />
    {items.map((item, i) => (
      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 12, color: COLORS.slateSoft }}>{item}</span>
        <div style={{ width: 36, height: 8, borderRadius: 4, background: COLORS.mist }} />
      </div>
    ))}
  </div>
);

export const Scene5PersonaJenny: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);

  const jennyIn = fallInto(frame, fps, 0);
  const mood = frame < 460 ? 'stressed' : 'happy';
  const moodIn = interpolate(frame, [20, 45], [0, 1], { extrapolateRight: 'clamp' });

  const slipAOpacity = interpolate(frame, [220, 260], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const slipBOpacity = interpolate(frame, [260, 300], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const checkOpacity = interpolate(frame, [650, 690], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finalStatOpacity = interpolate(frame, [800, 830], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.mist }}>
      <div style={{ position: 'absolute', left: 140, top: 220, opacity: jennyIn.opacity, transform: `translateY(${jennyIn.translateY}px)` }}>
        <UndrawIllustration name="jenny" width={380} />
      </div>
      <div style={{ position: 'absolute', left: 110, top: 200, opacity: moodIn }}>
        <MoodIcon mood={mood} size={70} />
      </div>
      <p style={{ position: 'absolute', left: 150, top: 560, fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 28, color: COLORS.navy, opacity: jennyIn.opacity }}>
        Jenny &middot; HR Manager
      </p>

      {/* Two adaptive payslips, different line items, proving the claim visually */}
      <div style={{ position: 'absolute', right: 340, top: 220, display: 'flex', gap: 28 }}>
        <AdaptivePayslip items={['Base salary', 'Overtime', 'Extra days']} delay={220} opacity={slipAOpacity} />
        <AdaptivePayslip items={['Base salary', 'Gift bonus']} delay={260} opacity={slipBOpacity} />
      </div>

      {frame >= 640 && (
        <div style={{ position: 'absolute', right: 480, top: 480, opacity: checkOpacity, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: COLORS.teal, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8l4 4 8-8" stroke={COLORS.white} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <p style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 16, color: COLORS.navy, margin: 0 }}>No blank spaces, ever</p>
        </div>
      )}

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 150, textAlign: 'center', opacity: finalStatOpacity }}>
        <p style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 30, color: COLORS.teal, margin: 0 }}>
          Every payslip, exactly right, automatically
        </p>
      </div>

      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
