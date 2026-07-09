import { describe, expect, it } from 'vitest'

import { buildSigilPaletteFlow, lintAccessiblePalette } from '../src/sigil/index.js'

describe('SIGIL accessible palette linter', () => {
  it('accepts WCAG-compatible palette pairings through PACAPDG witness', () => {
    const result = lintAccessiblePalette({
      sourceHex: '#1F7A54',
      theme: 'white',
      requiredPairs: [
        { foreground: '800', background: 'white' },
        { foreground: '100', background: '900' },
      ],
    })

    expect(result.accepted).toBe(true)
    expect(result.primitive).toBe('PACAPDG_ACCESSIBLE_PAIRING')
    expect(result.reasons).toEqual([])
    expect(result.pacapdg).toEqual({
      piFixed: true,
      tracePreserved: true,
      noIdentityTransport: true,
      externalDependency: 'accessible-color-palette',
    })
  })

  it('wraps the linter result in a QQUAPP flow envelope', () => {
    const flow = buildSigilPaletteFlow({
      sourceHex: '#1F7A54',
      theme: 'white',
      requiredPairs: [{ foreground: '800', background: 'white' }],
    })

    expect(flow.id).toBe('UAPA_SIGIL_ACCESSIBLE_PALETTE_LINTER_V1')
    expect(flow.invariants).toEqual({
      wcagAaChecked: true,
      pacauapBoundaryPreserved: true,
      qquappFlow: true,
    })
    expect(flow.result.accepted).toBe(true)
  })
})
