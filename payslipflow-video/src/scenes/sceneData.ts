// ============================================================================
// SCENE DATA -- edit timings and captions here, not inside each scene file.
// Durations match the script in PayslipFlow-Video-Script.md exactly.
// Total: 110 seconds (3300 frames at 30fps).
// ============================================================================
import { FPS } from '../theme';

export interface SceneEntry {
  id: string;
  durationInSeconds: number;
  caption: string;
}

export const SCENES: SceneEntry[] = [
  {
    id: 'hook',
    durationInSeconds: 8,
    caption:
      "If you're still building payslips by hand every month\u2026 there's a faster way."
  },
  {
    id: 'explainer',
    durationInSeconds: 8,
    caption:
      'Your Sheet. Your data. PayslipFlow turns every row into a payslip \u2014 automatically.'
  },
  {
    id: 'personaAna',
    durationInSeconds: 18,
    caption:
      "Ana runs her own business. PayslipFlow gave her afternoons back."
  },
  {
    id: 'personaElena',
    durationInSeconds: 18,
    caption:
      'Elena manages 5 clients\u2019 payroll \u2014 all from their own Sheets, one sidebar.'
  },
  {
    id: 'personaJack',
    durationInSeconds: 18,
    caption:
      'Jack pays a team across 3 countries. One Sheet, every currency, done.'
  },
  {
    id: 'trust',
    durationInSeconds: 10,
    caption: 'We never read, touch, or store your payroll data.'
  },
  {
    id: 'features',
    durationInSeconds: 12,
    caption:
      'Secure delivery. Automated folders. Team pulse polls. Approval gates.'
  },
  {
    id: 'payoff',
    durationInSeconds: 8,
    caption:
      "It's not another platform to learn. It's the one that works how you already do."
  },
  {
    id: 'cta',
    durationInSeconds: 10,
    caption: 'Install Free \u2014 link in description.'
  }
];

export const TOTAL_DURATION_IN_FRAMES = SCENES.reduce(
  (sum, s) => sum + s.durationInSeconds * FPS,
  0
);
