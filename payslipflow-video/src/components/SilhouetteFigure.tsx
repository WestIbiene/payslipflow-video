import React from 'react';
import { COLORS } from '../theme';

// A simple, single-color bust silhouette for SECONDARY characters
// (the accountant, an employee, a client) -- deliberately plain so the
// three named personas (Ana/Jack/Jenny) stay the visual focus. No face
// detail on purpose; these are supporting cast, not leads.
export const SilhouetteFigure: React.FC<{ size?: number; color?: string }> = ({
  size = 90,
  color = COLORS.slateSoft
}) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx="50" cy="34" r="20" fill={color} />
    <path d="M 20 100 C 20 68 33 55 50 55 C 67 55 80 68 80 100 Z" fill={color} />
  </svg>
);
