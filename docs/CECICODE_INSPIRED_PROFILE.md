# Ceci-inspired accessibility profile

This document describes an optional profile layer for projects that need stricter accessibility policy checks on top of the existing `accessible-color-palette` WCAG engine.

The profile is intentionally additive:

- it does not rename the package
- it does not change the palette algorithm
- it does not change default CSS token generation
- it preserves the upstream project identity and authorship

## Why this layer exists

The core package already answers a precise question:

> Given a source color and a theme, which palette shades satisfy WCAG contrast thresholds?

A profile layer answers a different downstream question:

> Given project-specific UI semantics, are the planned token pairings and status cues acceptable for this product?

## Profile scope

The first bundled profile is `cecicode-inspired-v1`.

It checks:

- normal text contrast: at least 4.5:1
- large text, UI components, focus indicators, and graphics: at least 3:1
- status color contrast: at least 4.5:1
- status colors must have a non-color cue
- token-first color implementation is recommended

## Non-color status rule

A status color must not be the only source of meaning. A component using a warning, success, info, or error token should also expose one of:

- visible text
- an icon with an accessible name or adjacent label
- a structural cue such as an alert role or heading

## Usage example

```ts
import {
  cecicodeInspiredProfile,
  validateProfileColorPairs,
} from 'accessible-color-palette'

const report = validateProfileColorPairs(cecicodeInspiredProfile, [
  {
    id: 'status.error.banner',
    role: 'status',
    foreground: '#ffffff',
    background: '#b91c1c',
    hasNonColorCue: true,
  },
])

if (!report.allPass) {
  throw new Error(report.issues.map(issue => issue.message).join('\n'))
}
```

## Design principle

The WCAG palette engine remains the foundation. Profiles sit above it as lintable policy, not as a replacement.
