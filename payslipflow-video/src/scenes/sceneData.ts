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
      { atFrame: 0, text: 'Ana runs a small business. 15 employees. Payday is on her.' },
      { atFrame: 220, text: 'Her accountant crunches the numbers. Ana still has to turn them into payslips.' },
      { atFrame: 420, text: 'Every employee is owed a payslip, every single pay period.' },
      { atFrame: 620, text: 'With PayslipFlow, all 15 go out from her Sheet in one click.' },
      { atFrame: 800, text: 'Ana just got 3 hours back, every pay period.' }
    ]
  },
  {
    id: 'personaJack',
    durationInSeconds: 30,
    captions: [
      { atFrame: 0, text: 'An employee needs a payslip today, for a bank loan.' },
      { atFrame: 220, text: "The old homemade template doesn't look right. The bank won't take it." },
      { atFrame: 460, text: 'With PayslipFlow, Jack sends a clean, verified payslip in minutes.' },
      { atFrame: 700, text: 'Approved. No back and forth, no second try.' }
    ]
  },
  {
    id: 'personaJenny',
    durationInSeconds: 30,
    captions: [
      { atFrame: 0, text: 'Jenny runs a boutique HR firm. 5 client businesses, one Sheet each.' },
      { atFrame: 220, text: 'Every payslip goes out with a quick pulse poll built right in.' },
      { atFrame: 460, text: 'The responses roll in, real sentiment, across all 5 businesses.' },
      { atFrame: 650, text: 'That data helps her clients make better workplace decisions.' },
      { atFrame: 800, text: 'All from the Sheets she already runs. No new platform, for her or her clients.' }
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
