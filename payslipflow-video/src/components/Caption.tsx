import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';

// Flip this to false to remove burned-in captions from the whole video in
// one place, without touching every scene file individually. The caption
// text itself still lives in scenes/sceneData.ts either way, in case you
// want to reuse it later as a real .srt file.
export const SHOW_CAPTIONS = true;

// Pinned as a fixed-height band flush with the VERY bottom edge of the
// frame (not floating above it) -- on purpose, so it's a single clean strip
// you can either crop off entirely later, or paint your own subtitle style
// directly over the same zone without guessing where the old one sat.
const BAND_HEIGHT = 90;

export const Caption: React.FC<{ text: string; dark?: boolean }> = ({ text, dark = false }) => {
  if (!SHOW_CAPTIONS) return null;

  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: BAND_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.6)',
        opacity
      }}
    >
      <p
        style={{
          maxWidth: '85%',
          margin: 0,
          color: COLORS.white,
          fontFamily: FONT_FAMILY,
          fontSize: 30,
          fontWeight: 600,
          textAlign: 'center',
          lineHeight: 1.3
        }}
      >
        {text}
      </p>
    </div>
  );
};
