import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { Caption } from '../components/Caption';
import { UndrawIllustration } from '../components/UndrawIllustration';
import { fallInto } from '../utils/motion';
import { SCENES, getActiveCaption } from './sceneData';

const captionBeats = SCENES.find((s) => s.id === 'personaJenny')!.captions;

const A_END = 70; // globe transition, alone
const B_END = 180; // Jenny alone, introduced
const C_END = 320; // payslips alone, Jenny not present
const D_END = 430; // poll/chart alone
// Beat E (430 -> end): Jenny back, happy

// Redesigned payslip: no green bar (was "tacky" per feedback), a small
// company-logo placeholder dot + generic name instead, and a currency
// symbol used as the bullet for each line item, showing multi-currency
// support without needing any extra explanatory text.
const AdaptivePayslip: React.FC<{ items: string[]; opacity: number }> = ({ items, opacity }) => (
  <div style={{ width: 320, background: COLORS.white, borderRadius: 16, border: '2px solid #E5E5E5', padding: 24, opacity }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: COLORS.coral }} />
      <span style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 17, color: COLORS.slateSoft }}>CompanyName</span>
    </div>
    {items.map((item, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontFamily: FONT_FAMILY, fontWeight: 800, fontSize: 20, color: COLORS.teal }}>&#164;</span>
        <span style={{ fontFamily: FONT_FAMILY, fontSize: 19, color: COLORS.navy }}>{item}</span>
      </div>
    ))}
  </div>
);

export const Scene5PersonaJenny: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = getActiveCaption(frame, captionBeats);

  const aOpacity = interpolate(frame, [0, 15, A_END - 10, A_END], [0, 1, 1, 0]);

  const jennyIn1 = fallInto(frame, fps, A_END + 10);
  const bOpacity = interpolate(frame, [A_END, A_END + 15, B_END - 15, B_END], [0, 1, 1, 0]);

  const cOpacity = interpolate(frame, [B_END, B_END + 15, C_END - 15, C_END], [0, 1, 1, 0]);
  const slipAOpacity = interpolate(frame, [B_END + 15, B_END + 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const slipBOpacity = interpolate(frame, [B_END + 35, B_END + 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dOpacity = interpolate(frame, [C_END, C_END + 15, D_END - 15, D_END], [0, 1, 1, 0]);

  const jennyIn2 = fallInto(frame, fps, D_END + 10);
  const eOpacity = interpolate(frame, [D_END, D_END + 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: COLORS.white }}>
      {/* A: globe transition, alone */}
      {frame < A_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: aOpacity }}>
          <UndrawIllustration name="connected-world" width={620} />
        </AbsoluteFill>
      )}

      {/* B: Jenny alone, big, introduced */}
      {frame >= A_END && frame < B_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: bOpacity }}>
          <div style={{ transform: `translateY(${jennyIn1.translateY}px)`, opacity: jennyIn1.opacity }}>
            <UndrawIllustration name="jenny" width={680} />
          </div>
        </AbsoluteFill>
      )}

      {/* C: two adaptive payslips, big, legible, Jenny not present */}
      {frame >= B_END && frame < C_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', gap: 40, flexDirection: 'row', opacity: cOpacity }}>
          <AdaptivePayslip items={['Basic Salary', 'Overtime', 'Extra Days']} opacity={slipAOpacity} />
          <AdaptivePayslip items={['Basic Salary', 'Gift']} opacity={slipBOpacity} />
        </AbsoluteFill>
      )}

      {/* D: poll/sentiment chart, alone */}
      {frame >= C_END && frame < D_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: dOpacity }}>
          <UndrawIllustration name="data-trends" width={560} />
        </AbsoluteFill>
      )}

      {/* E: Jenny back, happy, brief */}
      {frame >= D_END && (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: eOpacity }}>
          <div style={{ transform: `translateY(${jennyIn2.translateY}px)`, opacity: jennyIn2.opacity }}>
            <UndrawIllustration name="jenny" width={600} />
          </div>
        </AbsoluteFill>
      )}

      <Caption text={active.text} sinceFrame={active.sinceFrame} />
    </AbsoluteFill>
  );
};
