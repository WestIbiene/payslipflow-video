import { spring } from 'remotion';

// Shared "fall into place" entrance: drops down from above with a bounce,
// used whenever a scene introduces a character or a supporting prop.
// `delayFrames` lets multiple elements stagger in one after another instead
// of all landing at once.
export function fallInto(frame: number, fps: number, delayFrames = 0) {
  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 9, stiffness: 120, mass: 0.8 }
  });
  const translateY = (1 - progress) * -260;
  const opacity = Math.min(1, Math.max(0, progress + 0.15));
  return { translateY, opacity, progress };
}
