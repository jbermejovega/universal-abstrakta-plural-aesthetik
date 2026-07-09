import type { AccessibilityProfile } from './profile.js'

export const cecicodeInspiredProfile: AccessibilityProfile = {
  id: 'cecicode-inspired-v1',
  name: 'Ceci-inspired accessibility profile',
  description:
    'An optional policy layer for projects that want stricter communication and UI accessibility checks on top of the WCAG AA palette engine.',
  baseline: ['WCAG 2.2 AA', 'non-color-only semantics', 'lintable design tokens'],
  policy: {
    normalTextMinContrast: 4.5,
    largeTextMinContrast: 3,
    uiComponentMinContrast: 3,
    focusIndicatorMinContrast: 3,
    graphicMinContrast: 3,
    statusMinContrast: 4.5,
    statusRequiresNonColorCue: true,
    tokenOnlyColorRecommended: true,
  },
  criteria: [
    {
      id: 'CCI-01',
      name: 'contrast minimums',
      requirement:
        'Normal text must meet at least 4.5:1 contrast; large text, UI components, graphics, and focus indicators must meet at least 3:1.',
    },
    {
      id: 'CCI-02',
      name: 'no color-only status',
      requirement:
        'Status meaning must not be conveyed by color alone; use a text label, icon, shape, or other non-color cue.',
    },
    {
      id: 'CCI-03',
      name: 'token-first implementation',
      requirement:
        'Projects should consume named tokens and validated pairings rather than ad-hoc foreground/background hex values in components.',
    },
    {
      id: 'CCI-04',
      name: 'communication accessibility',
      requirement:
        'Interfaces and generated templates should make request, context, boundary, evidence, and closure state explicit.',
    },
  ],
}
