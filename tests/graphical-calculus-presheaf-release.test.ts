import { describe, expect, it } from 'vitest'

import {
  UAPA_GRAPHICAL_CALCULUS_PRESHEAF_RELEASE_ID,
  buildGraphicalCalculusPresheafRelease,
} from '../src/index.js'
import type { GraphicalCalculusPresheafReleaseInput } from '../src/index.js'

const BASE_INPUT: Omit<GraphicalCalculusPresheafReleaseInput, 'milestone' | 'dataType'> = {
  namespace: 'uap.graphical.presheaf',
  sourceHex: '#1F7A54',
  theme: 'white',
  pairings: [
    { foreground: '800', background: 'theme' },
    { foreground: '100', background: '900' },
  ],
  injections: [
    {
      id: 'graphical-calculus-view',
      language: 'ts',
      method: 'presheaf-of-sheaves-global-section',
      code: 'export const view = "uap.graphical.presheaf"',
      pairings: [{ foreground: '800', background: 'theme' }],
    },
  ],
  profilePairs: [
    {
      id: 'body.text',
      role: 'normalText',
      foreground: '#111827',
      background: '#ffffff',
    },
    {
      id: 'status.release',
      role: 'status',
      foreground: '#ffffff',
      background: '#047857',
      hasNonColorCue: true,
    },
  ],
}

describe('buildGraphicalCalculusPresheafRelease', () => {
  it('accepts a closed safe-replay data type milestone through the presheaf global section', () => {
    const release = buildGraphicalCalculusPresheafRelease({
      ...BASE_INPUT,
      milestone: {
        id: 'MILESTONE_SAFE_REPLAY_DATA_TYPE_V1',
        title: 'Compiled safe-replay graphical calculus data type',
        status: 'closed',
        closedAt: '2026-07-10T18:00:00+02:00',
      },
      dataType: {
        name: 'GraphicalCalculusPresheafRelease',
        version: '0.2.0',
        kind: 'safe-replay-wcag-data-type',
      },
    })

    expect(release.id).toBe(UAPA_GRAPHICAL_CALCULUS_PRESHEAF_RELEASE_ID)
    expect(release.release.accepted).toBe(true)
    expect(release.release.blockReasons).toEqual([])
    expect(release.presheaf.categoryBasis).toMatchObject({
      source: 'Computational Category Theory',
      unificationRule: 'coequalizer-style-graphical-calculus-unification',
    })
    expect(release.presheaf.sheafCondition).toEqual({
      localAgreement: true,
      uniqueGluingCandidate: true,
      obstructionVisible: true,
    })
    expect(release.presheaf.localSections.map((section) => section.kind)).toEqual([
      'jaranian',
      'mbqc-hyperdag',
      'wcag-palette',
      'sigil-rag-mcp',
      'pacapdg',
    ])
    expect(release.rag).toMatchObject({
      repository: 'jbermejovega/universal-abstrakta-plural-aesthetik',
      selfExposedMcp: true,
      mutationPolicy: 'branch-pr-milestone-only',
    })
    expect(release.release.compliance).toMatchObject({
      w3cWcag: 'WCAG-2.2-AA',
      wcagProfileChecked: true,
      safeReplay: true,
      pyplCompliantDataTypeMetadata: true,
      pypiStyleMetadataOnly: true,
      compiledTypeScriptDeclarations: true,
    })
    expect(release.release.adapters.some((adapter) => adapter.surface === 'openmpi-hpc')).toBe(true)
    expect(release.release.adapters.some((adapter) => adapter.surface === 'openqasm')).toBe(true)
    expect(release.release.adapters.some((adapter) => adapter.surface === 'sigil4godot')).toBe(true)
  })

  it('blocks release updates until the deployment milestone is closed', () => {
    const release = buildGraphicalCalculusPresheafRelease({
      ...BASE_INPUT,
      milestone: {
        id: 'MILESTONE_OPEN',
        title: 'Open graphical calculus milestone',
        status: 'open',
      },
      dataType: {
        name: 'GraphicalCalculusPresheafRelease',
        version: '0.2.0',
        kind: 'safe-replay-wcag-data-type',
      },
    })

    expect(release.release.accepted).toBe(false)
    expect(release.release.blockReasons).toContain('milestone_not_closed')
    expect(release.release.milestonePolicy).toMatchObject({
      pushRegularUpdates: true,
      pushWhen: 'deployment-milestone-closed',
      branchPolicy: 'branch-and-pr-before-main',
    })
  })

  it('blocks release when no graphical calculus local sections are exposed', () => {
    const release = buildGraphicalCalculusPresheafRelease({
      ...BASE_INPUT,
      milestone: {
        id: 'MILESTONE_EMPTY_GRAPHICAL_COVER',
        title: 'Empty graphical calculus cover',
        status: 'closed',
      },
      dataType: {
        name: 'GraphicalCalculusPresheafRelease',
        version: '0.2.0',
        kind: 'safe-replay-wcag-data-type',
      },
      graphicalCalculi: [],
    })

    expect(release.release.accepted).toBe(false)
    expect(release.release.blockReasons).toContain('missing_graphical_calculus_sections')
    expect(release.presheaf.localSections).toEqual([])
  })
})
