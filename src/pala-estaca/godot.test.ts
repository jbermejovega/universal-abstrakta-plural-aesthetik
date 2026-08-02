import { describe, expect, it } from 'vitest'

import { buildPalaEstacaScene, type AmbientLattice, type CodeLayer, type PluralType } from './index.js'
import { PALA_ESTACA_GODOT_SCHEMA, projectSceneToGodotManifest } from './godot.js'

const pluralType: PluralType = {
  id: 'STRIKK_HYPER_CELL',
  strikkType: 'STRIKK_TYPED',
  contextId: 'uapa.paca.hiperbolica.demo',
  semanticType: 'HIGHER_COHOMOLOGICAL_CODE',
  semioticType: 'JARANIAN_TENSEGRITY_GLYPH',
  identityTransport: false,
}

const lattice: AmbientLattice = {
  id: 'hyperbolic-demo',
  topology: 'PACA_HIPERBOLICA',
  curvature: -1,
  cells: [
    { id: 'v0', dimension: 0, position: [0, 0], pluralType, boundary: [] },
    { id: 'v1', dimension: 0, position: [1, 0, 0.4], pluralType, boundary: [] },
    { id: 'e0', dimension: 1, position: [0.5, 0, 0.2], pluralType, boundary: ['v0', 'v1'] },
    { id: 'f0', dimension: 2, position: [0.5, 0.2, 0.2], pluralType, boundary: ['e0'] },
  ],
  incidence: [
    { source: 'e0', target: 'v0' },
    { source: 'e0', target: 'v1' },
    { source: 'f0', target: 'e0' },
  ],
}

const layer: CodeLayer = {
  id: 'higher-demo',
  family: 'HIGHER_COHOMOLOGICAL_JARANIAN',
  css: true,
  holographic: true,
  qldpc: true,
  logicalQubits: 1,
  distanceLowerBound: 2,
  checks: ['X:e0', 'Z:f0'],
  cohomologyClasses: [
    {
      id: 'omega-2',
      degree: 2,
      coefficientType: 'F2',
      supportCells: ['f0'],
      cocycle: [1],
    },
  ],
}

describe('Pala Estaca Godot projection', () => {
  it('emits a deterministic plural-typed 3D manifest', () => {
    const scene = buildPalaEstacaScene({
      id: 'godot-demo',
      topology: 'PACA_HIPERBOLICA',
      models: [
        'PACA_LAUREL',
        'LAURELPI',
        'TENSEGRITYPI',
        'QUOQUANTUM_TENSEGRITY',
        'UNIVERSAL_SAFIKA_ABSTRAKTA_PI',
        'TALLERTWERKPI',
        'JARRAPI',
        'HYPERAUSALPI',
      ],
      lattice,
      layers: [layer],
    })

    const first = projectSceneToGodotManifest(scene)
    const second = projectSceneToGodotManifest(scene)

    expect(first.schema).toBe(PALA_ESTACA_GODOT_SCHEMA)
    expect(first.digest).toBe(second.digest)
    expect(first.cells.find((cell) => cell.id === 'f0')?.kind).toBe('FACET_CELL')
    expect(first.overlays[0]).toMatchObject({ id: 'omega-2', degree: 2, support: ['f0'] })
    expect(first.hyperkernels).toHaveLength(8)
    expect(first.invariants.renderIsProjection).toBe(true)
    expect(first.invariants.canonicalAuthority).toBe(false)
  })
})
