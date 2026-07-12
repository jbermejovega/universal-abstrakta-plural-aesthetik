# JARRAS_KHOREO_LIBRARY_V1

Author-owner: Jara Juana Bermejo Vega / JJBV  
Status: TypeScript library scaffold  
Canon: PIORNALEGO_ES_CANON

## Purpose

`JARRAS_KHOREO_LIBRARY_V1` turns the course material for the twerk / Jarras Khoreo workshop into a typed JavaScript/TypeScript library. It is designed for PACAZINE figures, captions, social cards, visual prompts, and safe-replay validation.

It preserves the performance line supplied in the development request:

```text
I survived becoming a Turk teacher doing JavaScript
```

The phrase is stored as data, not as a legal or identity transfer claim.

## Public API

```ts
import {
  buildJarrasKhoreoLibrary,
  createFigurePrompt,
  createSocialMediaCards,
  getFigureSpec,
  renderCourseManifest,
  validateJarrasKhoreoLibrary,
} from 'universal-abstrakta-plural-aesthetik'

const library = buildJarrasKhoreoLibrary()
const report = validateJarrasKhoreoLibrary(library)
const figure = getFigureSpec('hexagonin-jaraniano')

if (figure) {
  console.log(createFigurePrompt(figure, { includeAltText: true }))
}

console.log(report.ok)
console.log(createSocialMediaCards().length)
console.log(renderCourseManifest(library))
```

## Modules

The library exposes the course as typed modules:

- `pelvic-foundation`: updown, jiggle, tiktok;
- `hiphop-groove`: bounce, wave, rockin;
- `composition-lab`: cuadradinho, hexagonín, Jarras Choreo compose-anything;
- `floor-metastability`: groove to metaestable state;
- `somatic-sensorial`: siente, disfruta, percibe, frontera/piel;
- `eulerian-improvisation`: random path over hiphop phrases;
- `sound-synthesis`: Moog, Moroder, Daft Punk, Click24, Click42, Synclavier, Frank Zappa, SonicPi;
- `queer-bounce-lineage`: Big Freedia, bounce, hiphop, waacking, jazz, sex worker clubs, queer pride, trans women, Black women of color;
- `safe-replay`: consent first, pause, opt-out, no coercion.

## Figures

The figure atlas is split into separate PACAZINE-ready figures:

1. `hyperlattice-course-map`
2. `pelvis-core`
3. `hiphop-groove`
4. `cuadradinho-brega-funk`
5. `hexagonin-jaraniano`
6. `jarras-choreo-transitions`
7. `floor-drops-metastable`
8. `somatic-sensorial`
9. `eulerian-random-path`
10. `psychedelic-postclub`
11. `quantum-instrumentality`
12. `queer-bounce-history`
13. `safe-replay-consent-first`

Each figure includes:

- title;
- subtitle;
- modules;
- visual kernel;
- caption;
- alt text;
- prompt;
- invariants.

## Invariants

Every accepted library object must preserve:

```text
no_transport
no_coercion
safe_replay
trace_preserved
pi_fixed
body_boundary_preserved
authorship_preserved
plurality_not_collapsed
public_internal_separated
consent_first
```

## PACAPDG reading

```text
course content
→ movement atoms
→ formulas
→ modules
→ figures
→ social cards
→ hyperlattice
→ GLOBAL_SECTION_PACAPDG
→ KAPSYLA-ready witness
```

The API is a library, not a repo mutation protocol. GitHub writes still require branch, visible diff, PR, CI, and review.
