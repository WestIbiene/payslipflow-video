import React from 'react';
import { COLORS, FONT_FAMILY } from '../theme';

// ============================================================================
// LOGO — this is the exact SVG you provided, completely untouched. Not one
// coordinate changed. Only wrapped in a sizeable <svg> wrapper so it can be
// dropped in at different sizes (hero reveal, CTA card, small watermark).
// ============================================================================
export const LogoMark: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="156 -30.5 730 700" width={size} height={size}>
    <path
      d="
        M 232 90
        H 668
        C 653 113 644 143 644 181
        V 557
        C 644 583 626 603 599 603
        H 237
        C 210 603 191 583 191 557
        V 135
        C 191 105 205 90 232 90
        Z
      "
      fill="#f45d48"
    />
    <path
      transform="translate(0,30)"
      d="
        M 736 78
        M 736 78
        H 767
        C 796 81 828 116 846 156
        C 858 187 864 228 863 271
        C 858 290 851 302 837 302
        H 664
        V 181
        C 664 127 690 91 736 78
        Z
      "
      fill="#134f4f"
    />
    <rect x="239" y="200" width="250" height="36" rx="19" fill="#134f4f" />
    <rect x="239" y="300" width="300" height="36" rx="19" fill="#134f4f" />
    <rect x="239" y="400" width="368" height="36" rx="19" fill="#134f4f" />
  </svg>
);

// Icon + "PayslipFlow" wordmark, on one line, text in the brand green/teal.
export const LogoWordmark: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.18 }}>
    <LogoMark size={size} />
    <span
      style={{
        fontFamily: FONT_FAMILY,
        fontWeight: 800,
        fontSize: size * 0.62,
        color: COLORS.teal,
        lineHeight: 1
      }}
    >
      PayslipFlow
    </span>
  </div>
);
