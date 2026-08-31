import React from 'react';
import { Img, staticFile } from 'remotion';

// Renders one of the recolored unDraw SVG files from public/illustrations/.
// These are used AS-IS for body/pose/hair -- never hand-edited -- which is
// what fixed the quality-mismatch problem from the hand-drawn attempts.
export const UndrawIllustration: React.FC<{ name: string; width?: number }> = ({
  name,
  width = 260
}) => <Img src={staticFile(`illustrations/${name}.svg`)} style={{ width, height: 'auto', display: 'block' }} />;
