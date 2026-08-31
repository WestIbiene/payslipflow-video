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
    durationInSeconds: 10,
    captions: [{ atFrame: 0, text: 'Your Sheet. Your data. PayslipFlow turns every row into a payslip, automatically.' }]
  },
  {
    id: 'personaAna',
    durationInSeconds: 16,
    captions: [
      { atFrame: 0, text: 'Ana runs a growing business. 30 employees, payday every month.' },
      { atFrame: 110, text: 'Every payslip comes straight from her spreadsheet rows.' },
      { atFrame: 260, text: 'PayslipFlow builds and sends every one of them, automatically.' },
      { atFrame: 380, text: 'Done in seconds.' }
    ]
  },
  {
    id: 'personaJack',
    durationInSeconds: 21,
    captions: [
      { atFrame: 0, text: 'Jack has to make sure every payslip goes out on time, every period.' },
      { atFrame: 100, text: 'He schedules the run in advance, right from his Sheet.' },
      { atFrame: 200, text: 'Meet Ben, the external accountant Jack works with.' },
      { atFrame: 300, text: 'On the scheduled day, Ben is asked to confirm salaries were paid.' },
      { atFrame: 420, text: 'Jack gets his own notification once Ben confirms.' },
      { atFrame: 540, text: 'One tap, and payslips are released. Neither of them opened the spreadsheet.' }
    ]
  },
  {
    id: 'personaJenny',
    durationInSeconds: 17,
    captions: [
      { atFrame: 0, text: 'Jenny manages a global team of freelancers.' },
      { atFrame: 70, text: 'Every one of them gets paid differently, in different currencies.' },
      { atFrame: 180, text: "No two payslips look the same, and that's exactly the point." },
      { atFrame: 320, text: "She uses polls to check in on how the team's really doing, wherever they are." },
      { atFrame: 430, text: 'All from the Sheet she already runs.' }
    ]
  },
  {
    id: 'trust',
    durationInSeconds: 10,
    captions: [{ atFrame: 0, text: 'We never read, touch, or store your payroll data.' }]
  },
  {
    id: 'features',
    durationInSeconds: 15,
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
