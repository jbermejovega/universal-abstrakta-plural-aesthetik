# AGENTS.md

Guidelines for AI agents working on this codebase.

---

## What this library does

Takes a hex color + a background theme (`'white'` | `'black'`) and generates a 6-shade monochromatic palette where every shade meets WCAG 2.2 AA contrast requirements. Returns the palette (with hex, RGB and HSL for each shade) plus a usage map describing which shade pairs are safe to combine and at what text size.

---

## Non-negotiable constraints

Read these before touching any file.

- **No classes.** No `class`, no `new`, no `this`. Every module is a collection of pure functions.
- **No mutation.** Never reassign an object or array. Always return new values.
- **No external color libraries.** chroma-js, tinycolor2, color, etc. are forbidden. The WCAG math is implemented directly in `src/math/`.
- **Strict TypeScript.** `strict: true` in tsconfig. No `any`. No `as X` type assertions except where the spec explicitly permits them (`parseHex` return value).
- **Single responsibility.** If you need "and" to describe a function, split it.
- **Pure functions everywhere** except `src/mcp/server.ts`, which is the only file allowed to have side effects or import from Node.js core.

---

## Architecture

```
src/math/          -- color conversions + WCAG contrast math (no domain logic)
src/algorithm/     -- shade derivation (depends on math, nothing else)
src/output/        -- formatting and usage computation (depends on types, nothing else)
src/index.ts       -- public API boundary (the only place that accepts raw string for hex)
src/mcp/server.ts  -- MCP server (depends on index.ts only)
```

Dependencies only flow downward. `algorithm` may import from `math`. Nothing imports from `mcp`. Nothing imports from `index.ts` except external consumers.

---

## The branded HexColor type

`HexColor` is a branded string type defined in `src/types.ts`. It exists to prevent raw strings from bypassing validation.

- The only place a raw `string` is accepted is `generatePalette(hex: string, ...)` in `src/index.ts`.
- `parseHex(input: string): HexColor` is the sole gate. It validates and brands.
- All internal functions take `HexColor`, never `string`.
- Do not cast `string` to `HexColor` anywhere except inside `parseHex`.

---

## The algorithm

### find700 — the anchor

700 is the starting point. The algorithm adjusts the input color until its contrast against the background is exactly 5.1:1.

```
if ratio == 5.1  → return as-is
if ratio < 5.1   → increase contrast (darken for white bg, lighten for black bg)
if ratio > 5.1   → decrease contrast (lighten for white bg, darken for black bg)
```

The decrease path uses a manual loop (not `stepTowardRatio`) because `stepTowardRatio` only increases ratio. It tracks `prev` to handle overshoot: if the loop crosses below 5.1, return the last value that was still >= 5.1.

### find100, find300, find900

All start from shade700 and walk lightness until the contrast between the new color and shade700 reaches the target:

| Shade | Target vs 700 | Direction (white) |
|-------|---------------|-------------------|
| 100 | 4.5:1 | lighten |
| 300 | 3.1:1 | lighten |
| 900 | 3.1:1 | darken |

### find600, find800

These continue the chain from shade100:

| Shade | Reference | Target | Direction (white) |
|-------|-----------|--------|-------------------|
| 600 | shade100 | 3.1:1 vs 100 | darken |
| 800 | shade600 | 3.1:1 vs 600 | darken |

### buildPalette

Pure sequencing — no logic. If you feel the urge to add an `if` here, it belongs in one of the `find*` functions.

Each shade entry includes `hex`, `rgb` (0–255 integers), and `hsl` (h: 0–360, s/l: 0–100 integers). No contrast values — those live in the usage map.

### buildCompatibilityMatrix

Internal function. Computes `contrastRatioHex` for all 30 ordered pairs of distinct shades. Result is consumed by `buildPaletteUsage` and never exposed in `PaletteResult`. `matrix[shade][shade]` is always `undefined` — never assign it.

### buildPaletteUsage

Converts the internal compatibility matrix into the public usage map. For each shade:
- `normalText`: pairs with ratio >= 4.5 (passes for body text)
- `largeText`: pairs with 3.0 <= ratio < 4.5 (passes for large text / UI components only)
- Failing pairs (ratio < 3.0) are omitted — if it's not in the map, it's not safe to use
- Includes the theme background (`key: 'background'`, hex: `#ffffff` or `#000000`) in whichever list it qualifies for

---

## WCAG contrast formula

Exact formulas, no approximations. Implemented in `src/math/contrast.ts`.

```
toLinear(c):
  c <= 0.04045  →  c / 12.92
  else          →  ((c + 0.055) / 1.055) ^ 2.4

relativeLuminance(rgb):
  0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)

contrastRatio(a, b):
  L1 = max(luminance(a), luminance(b))
  L2 = min(luminance(a), luminance(b))
  ratio = (L1 + 0.05) / (L2 + 0.05)
  round: Math.round(ratio * 100) / 100   ← NOT Number.toFixed, NOT Math.round on intermediates
```

Never round intermediate luminance values. Only round the final ratio.

---

## What NOT to do

These mistakes are common when working with color code. Do not repeat them.

- **Do not use HSL lightness as a proxy for WCAG contrast.** `l` and relative luminance are different things. Always use `contrastRatioHex`.
- **Do not use `Number.toFixed`.** It returns a string. Use `Math.round(ratio * 100) / 100`.
- **Do not expose internal functions from `src/index.ts`.** The public API is exactly `generatePalette` and `toCSSTokens`.
- **Do not add caching or memoization** unless profiling proves it is needed.
- **Do not silently clamp invalid hex inputs.** Throw with `Error('Invalid hex color: <input>')`.
- **Do not add `if` logic to `buildPalette`.** It is a pure sequencing function.
- **Do not import any color library** at any point.
- **Do not put contrast values on `ShadeEntry`.** Contrast information belongs in `usage`, not in `palette`.

---

## Testing

Framework: **Vitest**. Run with `vitest run`. Target: 100% coverage of `src/` excluding `src/mcp/server.ts`.

```
tests/math/           -- unit tests for color conversions and contrast math
tests/algorithm/      -- unit tests for each find* function in isolation
tests/output/         -- unit tests for toCSSTokens and buildPaletteUsage
tests/integration.ts  -- end-to-end with known hex/palette pairs from the Figma test cases
```

Integration tests use fixed expected values (see `README.md` — Example output section). Allow ±1 per hex channel to account for the 0.5% lightness step.

When adding a new shade derivation rule, test the `find*` function directly — do not rely only on `buildPalette` tests to cover it.

---

## File ownership

| File | What lives here | What does NOT belong here |
|------|----------------|--------------------------|
| `src/types.ts` | All types and branded primitives | No logic |
| `src/math/color.ts` | Conversion functions only | No contrast math, no domain logic |
| `src/math/contrast.ts` | WCAG luminance + ratio | No color conversions |
| `src/algorithm/primitives.ts` | `stepTowardRatio` and its two wrappers | No shade-specific logic |
| `src/algorithm/palette.ts` | One `find*` function per shade + `buildPalette` | No formatting, no compatibility |
| `src/algorithm/compatibility.ts` | `buildCompatibilityMatrix` only (internal) | No palette building |
| `src/output/tokens.ts` | `toCSSTokens` only | No palette building |
| `src/output/usage.ts` | `buildPaletteUsage` only | No palette building |
| `src/index.ts` | `generatePalette`, `toCSSTokens` re-export, type exports | No implementation logic |
| `src/mcp/server.ts` | MCP wiring | No algorithm reimplementation |
