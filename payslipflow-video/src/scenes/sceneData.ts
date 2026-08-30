// ============================================================================
// SCENE DATA -- edit timings and captions here, not inside each scene file.
// Total target: ~2:26 (146s / 4380 frames at 30fps), inside the 2:30-3:00
// range agreed on. Persona scenes now carry MULTIPLE caption beats instead
// of one static line, since each one tells a short story rather than a
// single sentence.
// ============================================================================
import { FPS } from '../theme';

export interface CaptionBeat {
  atFrame: number; // frame WITHIN this scene (not global) when this text starts showing
  text: string;
}

export interface SceneEntry {
  id: string;
  durationInSeconds: number;
  captions: CaptionBeat[];
}

export const SCENES: SceneEntry[] = [
  {
    id: 'hook',
    durationInSeconds: 8,
    captions: [{ atFrame: 0, text: "If you're still building payslips by hand every month\u2026 there's a faster way." }]
  },
  {
    id: 'explainer',
    durationInSeconds: 8,
    captions: [{ atFrame: 0, text: 'Your Sheet. Your data. PayslipFlow turns every row into a payslip, automatically.' }]
  },
  {
    id: 'personaAna',
    durationInSeconds: 30,
    captions: [
      { atFrame: 0, text: 'Ana runs a growing business. 30 employees, payday every month.' },
      { atFrame: 220, text: 'She used to build every payslip by hand, line by line.' },
      { atFrame: 420, text: 'One typo, and private salary details could leak.' },
      { atFrame: 620, text: 'Now PayslipFlow matches her columns and builds every payslip in seconds.' },
      { atFrame: 800, text: 'Payday just got a lot less stressful.' }
    ]
  },
  {
    id: 'personaJack',
    durationInSeconds: 30,
    captions: [
      { atFrame: 0, text: 'Jack has to make sure every payslip goes out on time, every period.' },
      { atFrame: 220, text: 'He schedules the run in advance, right from his Sheet.' },
      { atFrame: 460, text: 'When the date arrives, Ben confirms the numbers from his phone.' },
      { atFrame: 650, text: 'Jack gets notified, and approves with one tap.' },
      { atFrame: 800, text: 'Payslips go out. Neither of them had to open the spreadsheet.' }
    ]
  },
  {
    id: 'personaJenny',
    durationInSeconds: 30,
    captions: [
      { atFrame: 0, text: 'No two employees have the same pay breakdown.' },
      { atFrame: 220, text: 'One has overtime. Another has a bonus. A third has extra days.' },
      { atFrame: 460, text: 'PayslipFlow builds each payslip exactly right, automatically.' },
      { atFrame: 650, text: 'No blank spaces. No messy layouts. Just the numbers that apply.' },
      { atFrame: 800, text: 'Jenny never touches a single template by hand.' }
    ]
  },
  {
    id: 'trust',
    durationInSeconds: 10,
    captions: [{ atFrame: 0, text: 'We never read, touch, or store your payroll data.' }]
  },
  {
    id: 'features',
    durationInSeconds: 12,
    captions: [{ atFrame: 0, text: 'Secure delivery. Automated folders. Pulse polls. Approval gates. Scheduled sends.' }]
  },
  {
    id: 'payoff',
    durationInSeconds: 9,
    captions: [{ atFrame: 0, text: "It's not another platform to learn. It's the one that works how you already do." }]
  },
  {
    id: 'cta',
    durationInSeconds: 9,
    captions: [{ atFrame: 0, text: 'Install Free. Link in description.' }]
  }
];

export const TOTAL_DURATION_IN_FRAMES = SCENES.reduce(
  (sum, s) => sum + s.durationInSeconds * FPS,
  0
);

// Given the current frame WITHIN a scene, returns whichever caption beat is
// active right now (the last one whose atFrame has passed), plus the frame
// that beat started at -- so the Caption component can fade in relative to
// each beat, not just once at the very start of the scene.
export function getActiveCaption(frame: number, captions: CaptionBeat[]): { text: string; sinceFrame: number } {
  let active = captions[0] ?? { atFrame: 0, text: '' };
  for (const beat of captions) {
    if (frame >= beat.atFrame) active = beat;
  }
  return { text: active.text, sinceFrame: active.atFrame };
}
