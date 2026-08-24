// ============================================================================
// BRAND PALETTE — updated to match mypayslipflow_gusto_palette_preview.html
// (the newer, lighter "Gusto-style" mockup). Key names below are unchanged
// from the old navy/teal/mist theme so every scene file that already
// references COLORS.navy / COLORS.teal / COLORS.mist / COLORS.slateSoft
// picks up the new look automatically — only the hex values changed here.
//
// NOTE: the mockup itself uses two different "primary action" colors —
// teal (#00A98F) on the hero's main CTA, coral (#F45D48) on the top-nav
// Install button. For the video, teal is treated as the single primary
// action color throughout, and coral is reserved for accent/alert-style
// moments only (matching how the mockup itself uses coral for the
// "Staged safety gates" alert feature). Worth locking this down on the
// actual site too, so both stay consistent.
// ============================================================================
export const COLORS = {
  navy: '#1A1A1A', // was #1E4C87 — now the near-black used for headings/dark UI
  teal: '#00A98F', // was #00BFA5 — new primary teal (the ONE action color)
  mist: '#EAFAF6', // was #eaf1f8 — new light mint background
  white: '#FFFFFF',
  ink: '#1A1A1A',
  slateSoft: '#777777', // was #64748b — new secondary/caption text gray
  // New accent colors from the mockup, available if a scene needs them —
  // not wired into any existing scene by default (see note above on
  // keeping one consistent action color).
  coral: '#F45D48',
  coralBg: '#FDECEB',
  tealDark: '#00816F'
};

export const FONT_FAMILY =
  '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif';

export const FPS = 30;
