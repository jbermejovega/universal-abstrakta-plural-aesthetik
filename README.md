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

Output (default):

```css
/*
 * WCAG AA PAIRING MANIFEST — source: #1f7a54 · theme: white
 *
 * BODY TEXT (any font size, ≥4.5:1):
 *   shade-700 (#207c55) → white, 100
 *   shade-800 (#124630) → white, 100, 300
 *   ...
 */
:root {
  --color-100: #e3f8ef; /* ✅ text→900·800·700  ⚠️ lg→600 */
  --color-700: #207c55; /* ✅ text→white·100  ⚠️ lg→300·900 */
  ...
}
```

---

### As a library

```ts
import { generatePalette, toCSSTokens } from 'universal-abstrakta-plural-aesthetik'

const result = generatePalette('#1F7A54', 'white')

// Each shade includes hex, RGB and HSL values
console.log(result.palette['700'])
{
  hex: '#1f7a54',
  rgb: { r: 31, g: 122, b: 84 },
  hsl: { h: 152, s: 59, l: 30 }
}

// Usage map: for each shade, which backgrounds pass for normal text and large text
console.log(result.usage['700'].normalText)
[
  { key: '100', hex: '#d6f5e8', ratio: 4.18 },
  { key: 'background', hex: '#ffffff', ratio: 5.10 },
  ...
]

console.log(result.usage['700'].largeText)
[{ key: '300', hex: '#71dbae', ratio: 3.21 }, ...]

// CSS tokens
console.log(toCSSTokens(result))
--color-100: #d6f5e8;
--color-300: #71dbae;
--color-600: #259868;
--color-700: #1f7a54;
--color-800: #10422d;
--color-900: #082116;

// Custom prefix
console.log(toCSSTokens(result, 'brand'))
--brand-100: #d6f5e8;
// ...

// Validate a list of foreground/background shade pairs before you use them
import { validatePairings } from 'universal-abstrakta-plural-aesthetik'

const report = validatePairings(result, [
  { foreground: '700', background: 'white' },
  { foreground: '100', background: '900' },
])
console.log(report.allPass)        // true
console.log(report.pairings[0])    // { level: 'aa-normal', message: '✓ ...', ... }

// Check contrast between any two arbitrary hex colors — e.g. a brand accent
// that isn't part of the generated palette
import { checkContrast } from 'universal-abstrakta-plural-aesthetik'

console.log(checkContrast('#ffffff', '#c75d3a'))
{
  foreground: '#ffffff',
  background: '#c75d3a',
  ratio: 4.15,
  level: 'aa-large',
  message: '⚠ #ffffff on #c75d3a: 4.15:1 — AA large text only (3:1–4.5:1) ...'
}
```

### As an MCP server

Also ships as an MCP server exposing `generate_palette`, `validate_pairings`, `generate_css_tokens`, and `check_contrast` as tools, plus a `palette://{hex}/{theme}` resource and a `plan-palette-usage` guided prompt. `generate_css_tokens` enforces a server-side gate — it rejects requests for a hex+theme until `validate_pairings` has passed for that same combination earlier in the session.

See **[MCP.md](./MCP.md)** for client config, the full tools table, and how the gate and the guided-prompt workflow relate to each other.

---

## Output shape

```ts
interface PaletteResult {
  palette: Record<'100' | '300' | '600' | '700' | '800' | '900', {
    hex: string
    rgb: { r: number; g: number; b: number }  // 0–255
    hsl: { h: number; s: number; l: number }  // h: 0–360, s/l: 0–100
  }>
  usage: Record<'100' | '300' | '600' | '700' | '800' | '900', {
    hex: string
    normalText: Array<{ key: string; hex: string; ratio: number }>
    largeText:  Array<{ key: string; hex: string; ratio: number }>
  }>
  theme: 'white' | 'black'
  sourceColor: string
}
```

- `normalText` — backgrounds where this shade passes at **4.5:1** or better (body text, small UI)
- `largeText` — backgrounds where this shade passes at **3:1–4.49:1** (headings, large text, icons)
- Failing combinations (< 3:1) are omitted entirely
- `key` is a shade (`'100'`–`'900'`) or `'background'` (white or black, depending on theme)

---

## Example output

**`generatePalette('#1F7A54', 'white')`**

| Shade | Hex | RGB | HSL |
|-------|-----|-----|-----|
| 100 | `#d6f5e8` | `214, 245, 232` | `152°, 62%, 90%` |
| 300 | `#71dbae` | `113, 219, 174` | `152°, 59%, 65%` |
| 600 | `#259868` | `37, 152, 104` | `152°, 61%, 37%` |
| 700 | `#1f7a54` | `31, 122, 84` | `152°, 59%, 30%` |
| 800 | `#10422d` | `16, 66, 45` | `152°, 61%, 16%` |
| 900 | `#082116` | `8, 33, 22` | `152°, 61%, 8%` |

**`generatePalette('#239062', 'black')`** — dark theme inverts the lightness direction

| Shade | Hex | RGB | HSL |
|-------|-----|-----|-----|
| 100 | `#061911` | `6, 25, 17` | `152°, 61%, 6%` |
| 300 | `#0e3927` | `14, 57, 39` | `152°, 61%, 14%` |
| 600 | `#1c734e` | `28, 115, 78` | `152°, 61%, 28%` |
| 700 | `#239062` | `35, 144, 98` | `152°, 61%, 35%` |
| 800 | `#4fd498` | `79, 212, 152` | `152°, 59%, 57%` |
| 900 | `#b9eed8` | `185, 238, 216` | `152°, 62%, 83%` |

For `theme: 'black'`, shade 100 is the darkest. The lightness order is inverted relative to `theme: 'white'` — this is by design.

---

## How the algorithm works

### The core primitive

Every shade is found by the same iterative mechanism: start from a color, walk its HSL lightness in steps of 0.5%, and stop when the WCAG 2.2 contrast ratio against a reference color reaches the target.

```
stepTowardRatio(startHex, referenceHex, targetRatio, direction)
  1. Convert startHex to HSL
  2. Adjust lightness +/- 0.005 per step
  3. After each step: compute contrastRatio(current, referenceHex)
  4. Stop when ratio >= targetRatio
  5. Safety limit: throw after 1000 steps
```

Contrast is always computed using the **exact WCAG 2.2 formula** — no approximations, no HSL lightness shortcuts.

### Shade derivation chain

700 is the anchor. Everything else derives from it (or from a shade that derived from it).

```
inputHex --> find700 --> shade700 --> find100 --> shade100 --> find600 --> shade600 --> find800 --> shade800
                    |                                                |
                    |--> find300 --> shade300                       +- (reference for 600 and 800)
                    |
                    +--> find900 --> shade900
```

### Decision flowchart

```mermaid
flowchart TD
    A["Input: color + theme (white | black)"]
    A --> B["Find 700\n4.5:1 on bg"]
    B --> C["Calculate contrast ratio\nbetween color and bg"]
    C --> D{"ratio === 5.1:1?"}

    D -->|yes| Z700["shade 700 = color"]

    D -->|"white + ratio > 5.1"| E1["add light while ratio > 5.1\nif drops below → remove 1 step"]
    D -->|"white + ratio < 5.1"| E2["remove light until ratio ≥ 5.1"]
    D -->|"black + ratio > 5.1"| E3["remove light while ratio > 5.1\nif drops below → add 1 step"]
    D -->|"black + ratio < 5.1"| E4["add light until ratio ≥ 5.1"]

    E1 & E2 & E3 & E4 --> Z700

    Z700 --> F100["Find 100\nilluminate(4.5, 700) [white]\ndarken(4.5, 700) [black]"]
    Z700 --> F300["Find 300\nilluminate(3.1, 700) [white]\ndarken(3.1, 700) [black]"]
    Z700 --> F900["Find 900\ndarken(3.1, 700) [white]\nilluminate(3.1, 700) [black]"]

    F100 --> Z100["shade 100"]
    F300 --> Z300["shade 300"]
    F900 --> Z900["shade 900"]

    Z100 --> F600["Find 600\ndarken(3.1, 100) [white]\nilluminate(3.1, 100) [black]"]
    F600 --> Z600["shade 600"]

    Z600 --> F800["Find 800\ndarken(3.1, 600) [white]\nilluminate(3.1, 600) [black]"]
    F800 --> Z800["shade 800"]
```

### Shade-by-shade contract

| Shade | Derived from | Target contrast | Direction (white bg) |
|-------|-------------|-----------------|----------------------|
| 700 | inputHex | 5.1:1 vs background | darken if too light, lighten if too dark |
| 100 | shade700 | 4.5:1 vs shade700 | lighten |
| 300 | shade700 | 3.1:1 vs shade700 | lighten |
| 600 | shade100 | 3.1:1 vs shade100 | darken |
| 800 | shade600 | 3.1:1 vs shade600 | darken |
| 900 | shade700 | 3.1:1 vs shade700 | darken |

---

## Design principles

- **No classes.** Purely functional — no `class`, no `new`, no `this`.
- **No mutation.** Every function returns a new value.
- **No external color libraries.** The WCAG math is ~25 lines, implemented directly.
- **Strict TypeScript.** `strict: true`, branded `HexColor` type to prevent raw strings leaking through the API.
- **Pure functions.** Same input, same output. The only side effects are in `src/mcp/server.ts`.
- **Single responsibility.** Each function does exactly one thing.

---

## API reference

### `generatePalette(hex: string, theme: 'white' | 'black'): PaletteResult`

The main entry point. Accepts a raw hex string with or without `#`, 3 or 6 chars. Throws `Error` for invalid hex with a message that includes the invalid value.

### `toCSSTokens(result: PaletteResult, prefix?: string): string`

Generates CSS custom property declarations from a `PaletteResult`. Default prefix is `'color'`. Does not wrap in `:root {}` — the caller decides placement.

### `validatePairings(result: PaletteResult, pairings: Array<{ foreground: string; background: string }>): ValidationReport`

Checks a list of foreground/background shade pairs against `result`'s compatibility matrix. `foreground` must be a shade key (`100 | 300 | 600 | 700 | 800 | 900`); `background` can be a shade key, `'white'`, or `'black'`. Returns `{ summary, allPass, pairings }` — each pairing gets a `level` (`'aa-normal' | 'aa-large' | 'fail' | 'invalid'`) and a human-readable `message`. Same pure logic the MCP server's `validate_pairings` tool uses.

### `checkContrast(foregroundHex: string, backgroundHex: string): ContrastCheckResult`

Standalone WCAG 2.2 contrast check between any two hex colors — not tied to a generated palette. Use it for accent colors (brand colors, status colors) that aren't part of the monochrome scale. Returns `{ foreground, background, ratio, level, message }`.

---

## Running tests

```bash
npm test
npm run test:coverage
```

Uses [Vitest](https://vitest.dev/). Integration tests validate against known outputs from the original Figma test cases.

---

## Building

```bash
npm run build   # tsc -> dist/
npm run mcp     # start MCP server (requires build first)
```

No bundler required — the library ships ESM and Node resolves it natively.

---

## Migrating from v1

v2 is a full rewrite. The algorithm is the same but everything else changed — the API is not compatible.

**What changed:**

- No more classes. v1 used `AccessibleColorPalette.generatePalette(...)`. v2 uses named ESM exports.
- The output shape is different. v1 returned shade objects with a `compatibilities` key. v2 returns a `palette` object and a separate `usage` map.
- No external dependencies. v1 used `colorsys` and `@mdhnpm/color-contrast-ratio-calculator`. v2 implements the WCAG math directly.
- Ships an MCP server for use with AI assistants.

**v1 (old):**

```js
const AccessibleColorPalette = require('accessible-color-palette')
AccessibleColorPalette.generatePalette('#1c734e', 'black')
// → { "700": { compatibilities: { largeText: [...], smallText: [...] }, hex, rgb, hsl } }
```

**v2 (new):**

```ts
import { generatePalette } from 'accessible-color-palette'
generatePalette('#1c734e', 'black')
// → { palette: { "700": { hex, rgb, hsl } }, usage: { "700": { normalText: [...], largeText: [...] } }, theme, sourceColor }
```

v1 remains available on npm as `accessible-color-palette@1.x` but is no longer maintained.

---

## Credits

Algorithm by **Marta Herrera Hollingsworth**. Library and MCP by **Cecilia Olivera**.
