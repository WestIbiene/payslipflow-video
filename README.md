# PayslipFlow, Promo Video (Remotion project)

A code-based 2D animated promo video. Every scene is a React component;
Remotion renders it to a real MP4 using headless Chrome + ffmpeg, both free,
no watermark, no render credits.

**Status:** TypeScript compiles cleanly (verified). Actual frame rendering
needs to happen on your machine, see below for why.

## Quick start

```bash
npm install
npm start        # opens Remotion Studio in your browser, live preview, scrubbing, hot reload
```

The first `npm install` will download a headless Chrome binary (~150–200MB,
one-time, fully automatic). That's the one step that can't happen inside a
sandboxed environment without outbound network access to `remotion.media` ,
which is why I couldn't render a preview frame for you directly, but it's a
non-issue on a normal machine or in GitHub Codespaces.

## Render the final video

```bash
npm run build
```

Output lands at `out/my-payslipflow-promo.mp4`, 1920x1080, ~110 seconds,
ready to upload.

## Project structure

```
src/
  theme.ts                 → brand colors (pulled exactly from your site's tailwind.config.mjs)
  scenes/sceneData.ts       → EDIT HERE for timing + captions, single source of truth
  scenes/Scene1Hook.tsx     → each scene = one file, matches the script scene-for-scene
  scenes/Scene2Explainer.tsx
  scenes/Scene3PersonaAna.tsx
  scenes/Scene4PersonaJenny.tsx
  scenes/Scene5PersonaJack.tsx
  scenes/Scene6Trust.tsx
  scenes/Scene7Features.tsx
  scenes/Scene8Payoff.tsx
  scenes/Scene9CTA.tsx
  components/Avatar.tsx     → reusable circle-initial persona avatar (no illustration assets needed)
  components/Caption.tsx    → reusable burned-in caption bar
  Video.tsx                 → sequences all 9 scenes in order, handles the voiceover track
  Root.tsx                  → registers the composition (duration/fps/resolution)
```

## Adding your voiceover

1. Record the script from `PayslipFlow-Video-Script.md` as **one
   continuous take** covering all 9 scenes, not per-scene clips, since
   per-scene files drift out of sync with the visuals over time.
   - Free option: phone voice memo in a closet full of clothes (dampens
     echo more than you'd expect) + [Audacity](https://www.audacityteam.org/)
     (free) for noise reduction and normalizing volume.
   - AI option: [ElevenLabs](https://elevenlabs.io) free tier gives ~10k
     characters/month, the whole script is well under that.
2. Save the file as `public/voiceover.mp3`.
3. In `src/Video.tsx`, flip `HAS_VOICEOVER` to `true`.
4. Re-run `npm start` and check the audio lines up with each scene. If it
   drifts, the fix is almost always in `scenes/sceneData.ts` ,
   nudge `durationInSeconds` on the scene where it starts slipping.

## Adjusting timing or captions

Everything editable lives in **`src/scenes/sceneData.ts`**, change a
caption's wording or a scene's length there, not inside the individual
scene files. This mirrors the same pattern your site uses (`addons.js` as
the single data source) on purpose, since you're already used to working
that way.

## Adding music

Grab something free from
[YouTube Audio Library](https://www.youtube.com/audiolibrary) or
[Pixabay Music](https://pixabay.com/music/) (no attribution required on
either), drop it in `public/music.mp3`, and add a second `<Audio>` line in
`Video.tsx` next to the voiceover one, set its `volume` prop to something
low (like `0.15`) so it sits under the voice, not over it.

## Upgrading visuals later

Right now personas (Ana, Jenny, Jack) are simple colored circles with
initials, zero-asset, zero-cost, and easy to keep consistent. If you want
to upgrade to actual illustrated characters later, free flat-style
illustrations that would drop in cleanly: [unDraw.co](https://undraw.co)
(MIT license, recolor-able to your brand navy/teal).

## Exporting captions as a separate .srt (optional, for YouTube's caption track)

The burned-in captions in the video cover muted viewers already. If you
also want a proper `.srt` file for YouTube's caption system, the caption
text for each scene is already sitting in `scenes/sceneData.ts`, the
timings you need are just the cumulative sum of each scene's
`durationInSeconds`.
