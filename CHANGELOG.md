# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [2.2.0] — 2026-06-21

### Added

- **MCP server enforcement** — `generate_css_tokens` now rejects requests for a given hex+theme until `validate_pairings` has returned `proceed: true` for that same hex+theme earlier in the session. This makes the validate-before-generate rule a protocol-level contract instead of a prompt-only suggestion, so it holds regardless of whether the client supports MCP prompts.

### Changed

- `plan-palette-usage` prompt — Step 3 now notes that the validate-before-generate ordering is enforced server-side, not just advisory.

---

## [2.1.0] — 2026-06-15

### Added

- **CLI** — `accessible-color-palette <hex> <theme>` now works as a standalone command via `npx` or global install. Outputs the annotated `:root {}` block with the WCAG pairing manifest by default. Supports `--prefix <name>` for custom CSS variable names and `--json` for raw JSON output.

---

## [2.0.1] — 2026-05-14

### Changed

- Updated README with npm install instructions, migration notes from v1, and MCP server setup docs.

---

## [2.0.0] — 2026-05-14

Full rewrite. Not compatible with v1.

### Added

- `generatePalette(hex, theme)` — pure function that derives 6 accessible shades (100, 300, 600, 700, 800, 900) from any hex color against a white or black background.
- `toCSSTokens(result, prefix?)` — generates a `:root {}` block with inline WCAG comments and a pairing manifest.
- Palette usage map — for each shade, lists which other shades pass AA for body text (≥4.5:1) and large text only (3:1–4.49:1).
- MCP server — exposes `generate_palette`, `validate_pairings`, and `generate_css_tokens` as tools; palette compatibility matrix as a resource template; `plan-palette-usage` prompt for guided agentic workflows.
- WCAG 2.2 contrast formula implemented directly — no external color libraries.
- Branded `HexColor` type — prevents raw strings from leaking through the public API.
- Full test suite with Vitest, including integration tests validated against known Figma outputs.

### Changed

- API is entirely different from v1. See [migration notes in the README](./README.md#migrating-from-v1).

### Removed

- Class-based API (`AccessibleColorPalette.generatePalette(...)`).
- External dependencies: `colorsys`, `@mdhnpm/color-contrast-ratio-calculator`.

---

## [1.x]

Source code for v1 is no longer available. The package remains on npm as `accessible-color-palette@1.x` but is not maintained.
