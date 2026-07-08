import { describe, expect, it } from 'vitest'
import { cecicodeInspiredProfile } from '../src/profile/cecicodeInspired.js'
import { validateProfileColorPairs } from '../src/output/policyValidation.js'

const PASSING_PAIRS = [
  {
    id: 'body.text',
    role: 'normalText' as const,
    foreground: '#111827',
    background: '#ffffff',
  },
  {
    id: 'status.success',
    role: 'status' as const,
    foreground: '#ffffff',
    background: '#047857',
    hasNonColorCue: true,
  },
]

describe('cecicodeInspiredProfile', () => {
  it('defines a lintable downstream accessibility profile', () => {
    expect(cecicodeInspiredProfile.id).toBe('cecicode-inspired-v1')
    expect(cecicodeInspiredProfile.policy.normalTextMinContrast).toBe(4.5)
    expect(cecicodeInspiredProfile.policy.statusRequiresNonColorCue).toBe(true)
  })

  it('passes accessible color pairs with required status cues', () => {
    const report = validateProfileColorPairs(cecicodeInspiredProfile, PASSING_PAIRS)

    expect(report.allPass).toBe(true)
    expect(report.issues).toEqual([])
  })

  it('fails status pairs without non-color cues', () => {
    const report = validateProfileColorPairs(cecicodeInspiredProfile, [
      {
        id: 'status.info',
        role: 'status',
        foreground: '#ffffff',
        background: '#0369a1',
      },
    ])

    expect(report.allPass).toBe(false)
    expect(report.issues.some(issue => issue.ruleId === 'CCI-02')).toBe(true)
  })

  it('fails low-contrast normal text pairs', () => {
    const report = validateProfileColorPairs(cecicodeInspiredProfile, [
      {
        id: 'body.muted',
        role: 'normalText',
        foreground: '#777777',
        background: '#888888',
      },
    ])

    expect(report.allPass).toBe(false)
    expect(report.issues.some(issue => issue.ruleId === 'CCI-01')).toBe(true)
  })
})
