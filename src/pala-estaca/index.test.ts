import { describe, expect, it } from 'vitest'
import {
  buildPalaEstacaScene,
  liftCodeLayer,
  projectSceneToGraph,
  validatePalaEstacaScene,
  type AmbientLattice,
  type CodeLayer,
  type PluralType,
} from './index.js'

const type: PluralType = {
  id: 'STRIKK_CELL',
  strikkType: 'STRIKK_TYPED',
  contextId: 'paca.plana.demo',
  semanticType: 'HIGHER_COHOMOLOGY',
  semioticType: 'JARANIAN_CODE_GLYPH',
  identityTransport: false,
}

const plane: AmbientLattice = {
  id: 'plane',
  topology: 'PACA_PLANA',
  curvature: 0,
  cells: [
    { id: 'v0', dimension: 0, position: [0, 0], pluralType: type, boundary: [] },
    { id: 'v1', dimension: 0, position: [1, 0], pluralType: type, boundary: [] },
    { id: 'e0', dimension: 1, position: [0.5, 0], pluralType: type, boundary: ['v0', 'v1'] },
  ],
  incidence: [
    { source: 'e0', target: 'v0' },
    { source: 'e0', target: 'v1' },
  ],
}

const cssLayer: CodeLayer = {
  id: 'css-plane',
  family: 'CSS_TOPOLOGICAL',
  css: true,
  holographic: false,
  qldpc: false,
  logicalQubits: 1,
  distanceLowerBound: 2,
  checks: ['X:e0', 'Z:e0'],
  cohomologyClasses: [
    {
      id: 'h1',
      degree: 1,
      coefficientType: 'F2',
      supportCells: ['e0'],
      cocycle: [1],
    },
  ],
}

describe('Pala Estaca graphical engine', () => {
  it('admits a finite plural-typed planar CSS scene', () => {
    const scene = buildPalaEstacaScene({
      id: 'demo',
      topology: 'PACA_PLANA',
      models: ['PACA_LAUREL', 'TENSEGRITYPI', 'JARRAPI', 'HYPERAUSALPI'],
      lattice: plane,
      layers: [cssLayer],
    })

    const validation = validatePalaEstacaScene(scene)
    expect(validation.state).toBe('ADMIT')
    expect(validation.obstructions).toEqual([])
    expect(projectSceneToGraph(scene).overlays[0]?.degree).toBe(1)
  })

  it('retains an obstruction when a topology lift loses cocycle support', () => {
    const hyperbolic: AmbientLattice = {
      ...plane,
      id: 'hyperbolic',
      topology: 'PACA_HIPERBOLICA',
      curvature: -1,
      cells: plane.cells.filter((cell) => cell.id !== 'e0'),
      incidence: [],
    }

    const lifted = liftCodeLayer(cssLayer, plane, hyperbolic, {
      targetTopology: 'PACA_HIPERBOLICA',
      model: 'LAURELPI',
    })

    expect(lifted.cohomologyClasses[0]?.obstruction).toBe('PARTIAL_SUPPORT_UNDER_TOPOLOGY_LIFT')
    expect(lifted.cohomologyClasses[0]?.supportCells).toEqual([])
  })
})
