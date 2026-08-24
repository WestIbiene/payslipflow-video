import React from 'react';
import { LogoWordmark } from './Logo';

// Small, constant logo overlay in the corner for the ENTIRE video duration —
// this is what makes it a watermark rather than just a logo that appears in
// two scenes. Sits top-left so it never competes with the caption band,
// which is pinned to the very bottom of the frame.
export const Watermark: React.FC = () => (
  <div style={{ position: 'absolute', top: 32, left: 32, opacity: 0.92 }}>
    <LogoWordmark size={42} />
  </div>
);
