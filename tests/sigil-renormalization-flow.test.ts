import { describe, expect, it } from 'vitest'

import {
  UAPA_INVARIANT_SIGIL_RENORMALIZATION_FLOW_ID,
  buildInvariantSigilRenormalizationFlow,
} from '../src/index.js'
import type { InvariantSigilRenormalizationInput } from '../src/index.js'

const BASE_INPUT: Omit<InvariantSigilRenormalizationInput, 'profilePairs'> = {
  namespace: 'uap.ceci.qquapp',
  sourceHex: '#1F7A54',
  theme: 'white',
  pairings: [
    { foreground: '800', background: 'theme' },
    { foreground: '100', background: '900' },
  ],
  injections: [
    {
      id: 'button',
      language: 'css',
      method: 'django-button-flow',
      code: '.button { color: var(--uap-800); background: #fff; }',
      pairings: [{ foreground: '800', background: 'theme' }],
    },
  ],
}

describe('buildInvariantSigilRenormalizationFlow', () => {
  it('glues plural SIGIL, palette linting, and profile policy into a PACAPDG colimit', () => {
    const flow = buildInvariantSigilRenormalizationFlow({
      ...BASE_INPUT,
      profilePairs: [
        {
          id: 'body.text',
          role: 'normalText',
          foreground: '#111827',
          background: '#ffffff',
        },
        {
          id: 'status.success',
          role: 'status',
          foreground: '#ffffff',
          background: '#047857',
          hasNonColorCue: true,
        },
      ],
    })

    expect(flow.id).toBe(UAPA_INVARIANT_SIGIL_RENORMALIZATION_FLOW_ID)
    expect(flow.glueStages).toEqual(['kokompiled', 'kokobuilt', 'kokoskaffolded', 'kokoweaved'])
    expect(flow.colimit).toMatchObject({ context: 'PACAPDG', accepted: true })
    expect(flow.mera).toMatchObject({ kind: 'generalized-mera', invariant: true })
    expect(flow.pacapdg).toMatchObject({
      primitive: 'PACAPDG_INVARIANT_SIGIL_RENORMALIZATION',
      algorithm: 'generalized-plural-tensor-renormalization',
      layout: 'sigil-vlsi',
      accepted: true,
      branchWitnesses: {
        pluralSigil: true,
        accessiblePalette: true,
        cecicodeProfile: true,
      },
    })
    expect(flow.tensors.some((tensor) => tensor.role === 'colimit')).toBe(true)
    expect(flow.tensors.some((tensor) => tensor.role === 'twisted-injection')).toBe(true)
    expect(flow.tensors.some((tensor) => tensor.role === 'coboundary-cocycle')).toBe(true)
    expect(flow.tensors.some((tensor) => tensor.role === 'adjoint')).toBe(true)
    expect(flow.twistedInjections).toEqual([
      {
        id: 'uap.ceci.qquapp:button:twisted-injection',
        from: 'uap.ceci.qquapp',
        to: 'button',
        cocycle: 'django-button-flow',
        accepted: true,
      },
    ])
  })

  it('adds annihilator tensors when downstream profile policy fails', () => {
    const flow = buildInvariantSigilRenormalizationFlow({
      ...BASE_INPUT,
      profilePairs: [
        {
          id: 'status.info',
          role: 'status',
          foreground: '#ffffff',
          background: '#0369a1',
        },
      ],
    })

    expect(flow.pacapdg.accepted).toBe(false)
    expect(flow.pacapdg.branchWitnesses).toMatchObject({
      pluralSigil: true,
      accessiblePalette: true,
      cecicodeProfile: false,
    })
    expect(flow.tensors.some((tensor) => tensor.role === 'annihilator' && tensor.source === 'cecicode-profile')).toBe(true)
    expect(flow.profileReport.issues.some((issue) => issue.ruleId === 'CCI-02')).toBe(true)
  })
})
