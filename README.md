# universal-abstrakta-plural-aesthetik

[![license](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D18-green)](./package.json)
[![types](https://img.shields.io/badge/types-TypeScript-blue)](./src/index.ts)

A TypeScript library that generates **WCAG 2.2 AA compliant monochromatic palettes** from any hex color. The palette algorithm has no external dependencies — the WCAG math is implemented directly.

Given a hex color and a background theme (`'white'` | `'black'`), it produces 6 shades — **100, 300, 600, 700, 800, 900** — where every shade meets contrast requirements against the theme. It also returns a usage map describing which shade pairs pass AA for normal text (4.5:1) and which pass for large text / UI components (3:1).

Ships as an ESM library, a **CLI**, and an **MCP server** for use with AI assistants.

---

## Universal Abstrakta Plural Aesthetik

This fork adds a plural SIGIL API module over the canonical `accessible-color-palette` dependency:

```ts
import { lintPluralSigil } from 'universal-abstrakta-plural-aesthetik'

const report = lintPluralSigil({
  namespace: 'uap.ceci.qquapp',
  sourceHex: '#1f7a54',
  theme: 'white',
  pairings: [{ foreground: '700', background: 'theme' }],
  injections: [
    {
      id: 'button',
      language: 'css',
      method: 'django-button-flow',
      code: '.button { color: var(--uap-700); background: #fff; }',
    },
  ],
})

console.log(report.ok)
console.log(report.primitives.map((primitive) => primitive.kind))
```

`lintPluralSigil` applies the KQC order (`SIGIL -> QUANTIZED -> CANONICAL`), validates pairings through WCAG 2.2 AA, emits `PACAUAP` palette primitives, emits `PACAPDG` code primitives with SIGIL headers, and exposes a compact agent-facing manifest for Django, QQUAPP, W3C/WCAG, and agent workflows.

The report also exposes a `qquapp` field whose `KokompiTyped` library metadata models an injective encoder, a projective decoder, and a self-dual roundtrip for PR review capsules. Its Error Correction Zoo binding is a taxonomy reference to the public `errorcorrectionzoo/eczoo_data` repository, not a claim that this package implements a physical quantum error-correcting code.

---

## Jarras Khoreo library

This package also exposes a typed course-atlas API for **Jarras Khoreo**: movement atoms, formulas, PACAZINE figures, safe-replay validation, social captions, and Hyperlattice structure.

```ts
import {
  buildJarrasKhoreoLibrary,
  createFigurePrompt,
  createSocialMediaCards,
  getFigureSpec,
  validateJarrasKhoreoLibrary,
} from 'universal-abstrakta-plural-aesthetik'

const library = buildJarrasKhoreoLibrary()
const report = validateJarrasKhoreoLibrary(library)
const cards = createSocialMediaCards(library.figures)
const figure = getFigureSpec('hexagonin-jaraniano')

if (figure) {
  console.log(createFigurePrompt(figure, { includeAltText: true }))
}

console.log(report.ok)
console.log(cards.length)
```

The library models the course as:

```text
movement atoms
→ movement formulas
→ course modules
→ PACAZINE figures
→ social media cards
→ course hyperlattice
→ GLOBAL_SECTION_PACAPDG
```

The safe-replay invariants are explicit: no transport, no coercion, trace preserved, `pi_fixed`, body boundary preserved, authorship preserved, plurality not collapsed, public/internal separated, and consent first.

---

## SIGIL Rule Zero

The formal capsule [SIGIL Rule Zero — Resource-Relative Commutation](./docs/SIGIL_RULEZERO_RESOURCE_RELATIVE_COMMUTATION_V1.md) is a **post-merge theoretical note following PR #14**. It does not modify the merged PR #14 patch and does not claim that Rule Zero was implemented or tested there.

Its algebraic criterion is:

\[
\operatorname{NF}_{G_R}\!\left(
\rho_{\mathcal O}(A\circ B)-\rho_{\mathcal O}(B\circ A)
\right)=0,
\]

where the ambient algebra, reduction order, Jaranian ideal, and Gröbner basis or equivalent confluent reducer are explicitly declared.

Its general ordered-monoidal cost law is:

\[
\mathsf C_R(A\circ B)
\preceq_R^{\mathcal K}
\mathsf C_R(A)\otimes_R\mathsf C_R(B).
\]

Full Rule-Zero admission additionally requires type preservation, `Π` preservation, replay equivalence, and cost comparability. Resource processes form a typed preorder; quotienting by operational equivalence yields a partial order on equivalence classes.

The capsule also distinguishes operator-algebraic approximation obstructions from orbifold quotient geometry: the Connes embedding problem does not define orbifolds. Both may enter a typed SIGIL obstruction registry without mathematical collapse.

---

## Install

```bash
npm install universal-abstrakta-plural-aesthetik
```

---

## Usage

### As a CLI

```bash
npx uap-palette <hex> <theme> [options]
```

| Argument / Option | Description |
|-------------------|-------------|
| `hex` | Hex color — with or without `#`, 3 or 6 chars |
| `theme` | Background theme: `white` \| `black` |
| `--prefix <name>` | CSS variable prefix (default: `color`) |
| `--json` | Output full palette + usage map as JSON |
| `-h, --help` | Show help |

```bash
# CSS tokens with WCAG manifest (default)
npx uap-palette 1F7A54 white

# Custom prefix
npx uap-palette 1F7A54 white --prefix brand

# Raw JSON
npx uap-palette 1F7A54 white --json
```
