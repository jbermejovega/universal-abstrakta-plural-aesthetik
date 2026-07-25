import { createHash } from 'node:crypto'

export const PALA_ESTACA_ENGINE_ID = 'PALA_ESTACA_JARANIAN_CODE_ENGINE_V1' as const

export type AmbientTopology =
  | 'PACA_CURVA'
  | 'PACA_PLANA'
  | 'PACA_HIPERBOLICA'
  | 'ARBITRARY_CELL_COMPLEX'

export type CodeFamily =
  | 'CSS_TOPOLOGICAL'
  | 'HOLOGRAPHIC'
  | 'QLDPC'
  | 'HIGHER_COHOMOLOGICAL_JARANIAN'

export type EngineModel =
  | 'PACA_LAUREL'
  | 'LAURELPI'
  | 'TENSEGRITYPI'
  | 'QUOQUANTUM_TENSEGRITY'
  | 'UNIVERSAL_SAFIKA_ABSTRAKTA_PI'
  | 'TALLERTWERKPI'
  | 'JARRAPI'
  | 'HYPERAUSALPI'

export type UapState = 'ADMIT' | 'HOLD_WITH_OBSTRUCTION' | 'REJECT'

export interface PluralType {
  readonly id: string
  readonly strikkType: string
  readonly contextId: string
  readonly semanticType: string
  readonly semioticType: string
  readonly identityTransport: false
}

export interface Cell {
  readonly id: string
  readonly dimension: number
  readonly position: readonly number[]
  readonly pluralType: PluralType
  readonly boundary: readonly string[]
  readonly metadata?: Readonly<Record<string, string | number | boolean>>
}

export interface CohomologyClass {
  readonly id: string
  readonly degree: number
  readonly coefficientType: string
  readonly supportCells: readonly string[]
  readonly cocycle: readonly number[]
  readonly obstruction?: string
}

export interface CodeLayer {
  readonly id: string
  readonly family: CodeFamily
  readonly css: boolean
  readonly holographic: boolean
  readonly qldpc: boolean
  readonly logicalQubits: number
  readonly distanceLowerBound: number
  readonly checks: readonly string[]
  readonly cohomologyClasses: readonly CohomologyClass[]
}

export interface AmbientLattice {
  readonly id: string
  readonly topology: AmbientTopology
  readonly curvature: number
  readonly cells: readonly Cell[]
  readonly incidence: readonly Readonly<{ source: string; target: string }>[]
}

export interface PalaEstacaScene {
  readonly id: string
  readonly engineId: typeof PALA_ESTACA_ENGINE_ID
  readonly topology: AmbientTopology
  readonly models: readonly EngineModel[]
  readonly lattice: AmbientLattice
  readonly layers: readonly CodeLayer[]
  readonly invariants: Readonly<{
    provenancePreserved: true
    replayPreserved: true
    noIdentityTransport: true
    noPluralCollapse: true
    piFixed: true
    contextPreserved: true
  }>
  readonly digest: string
}

export interface SceneValidation {
  readonly state: UapState
  readonly obstructions: readonly string[]
  readonly warnings: readonly string[]
  readonly digest: string
}

export interface LiftOptions {
  readonly targetTopology: AmbientTopology
  readonly model: EngineModel
  readonly preserveDegree?: boolean
  readonly curvatureScale?: number
}

function stableDigest(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value, Object.keys(value as object).sort())).digest('hex')
}

function assertFiniteVector(values: readonly number[], label: string): void {
  if (values.some((value) => !Number.isFinite(value))) {
    throw new TypeError(`${label} must contain only finite numbers`)
  }
}

export function validateAmbientLattice(lattice: AmbientLattice): readonly string[] {
  const obstructions: string[] = []
  const ids = new Set<string>()

  for (const cell of lattice.cells) {
    if (ids.has(cell.id)) obstructions.push(`DUPLICATE_CELL:${cell.id}`)
    ids.add(cell.id)
    if (cell.dimension < 0 || !Number.isInteger(cell.dimension)) {
      obstructions.push(`INVALID_DIMENSION:${cell.id}`)
    }
    assertFiniteVector(cell.position, `position:${cell.id}`)
    if (cell.pluralType.identityTransport !== false) {
      obstructions.push(`IDENTITY_TRANSPORT:${cell.id}`)
    }
    for (const boundaryId of cell.boundary) {
      if (boundaryId === cell.id) obstructions.push(`SELF_BOUNDARY:${cell.id}`)
    }
  }

  for (const edge of lattice.incidence) {
    if (!ids.has(edge.source) || !ids.has(edge.target)) {
      obstructions.push(`DANGLING_INCIDENCE:${edge.source}->${edge.target}`)
    }
  }

  return obstructions
}

export function validateCodeLayer(layer: CodeLayer, lattice: AmbientLattice): readonly string[] {
  const obstructions: string[] = []
  const cellIds = new Set(lattice.cells.map((cell) => cell.id))

  if (layer.logicalQubits < 0 || !Number.isInteger(layer.logicalQubits)) {
    obstructions.push(`INVALID_LOGICAL_QUBITS:${layer.id}`)
  }
  if (layer.distanceLowerBound < 1 || !Number.isInteger(layer.distanceLowerBound)) {
    obstructions.push(`INVALID_DISTANCE:${layer.id}`)
  }
  if (layer.family === 'CSS_TOPOLOGICAL' && !layer.css) {
    obstructions.push(`CSS_FLAG_REQUIRED:${layer.id}`)
  }
  if (layer.family === 'HOLOGRAPHIC' && !layer.holographic) {
    obstructions.push(`HOLOGRAPHIC_FLAG_REQUIRED:${layer.id}`)
  }
  if (layer.family === 'QLDPC' && !layer.qldpc) {
    obstructions.push(`QLDPC_FLAG_REQUIRED:${layer.id}`)
  }

  for (const cohomology of layer.cohomologyClasses) {
    assertFiniteVector(cohomology.cocycle, `cocycle:${cohomology.id}`)
    if (cohomology.degree < 0 || !Number.isInteger(cohomology.degree)) {
      obstructions.push(`INVALID_COHOMOLOGY_DEGREE:${cohomology.id}`)
    }
    for (const support of cohomology.supportCells) {
      if (!cellIds.has(support)) obstructions.push(`UNKNOWN_SUPPORT:${cohomology.id}:${support}`)
    }
  }

  return obstructions
}

export function buildPalaEstacaScene(input: Omit<PalaEstacaScene, 'engineId' | 'digest' | 'invariants'>): PalaEstacaScene {
  const payload = {
    ...input,
    engineId: PALA_ESTACA_ENGINE_ID,
    invariants: {
      provenancePreserved: true,
      replayPreserved: true,
      noIdentityTransport: true,
      noPluralCollapse: true,
      piFixed: true,
      contextPreserved: true,
    } as const,
  }

  return { ...payload, digest: stableDigest(payload) }
}

export function validatePalaEstacaScene(scene: PalaEstacaScene): SceneValidation {
  const obstructions = [
    ...validateAmbientLattice(scene.lattice),
    ...scene.layers.flatMap((layer) => validateCodeLayer(layer, scene.lattice)),
  ]
  const warnings: string[] = []

  if (scene.topology !== scene.lattice.topology) obstructions.push('TOPOLOGY_MISMATCH')
  if (scene.models.length === 0) obstructions.push('NO_ENGINE_MODEL')
  if (scene.layers.length === 0) obstructions.push('NO_CODE_LAYER')
  if (!scene.models.includes('HYPERAUSALPI')) warnings.push('HYPERCOHERENCE_MODEL_NOT_ENABLED')
  if (!scene.models.includes('TENSEGRITYPI')) warnings.push('TENSEGRITY_VIEW_NOT_ENABLED')

  const state: UapState = obstructions.some((value) => value.startsWith('IDENTITY_TRANSPORT'))
    ? 'REJECT'
    : obstructions.length > 0
      ? 'HOLD_WITH_OBSTRUCTION'
      : 'ADMIT'

  return {
    state,
    obstructions,
    warnings,
    digest: stableDigest({ scene: scene.digest, state, obstructions, warnings }),
  }
}

export function liftCodeLayer(
  source: CodeLayer,
  sourceLattice: AmbientLattice,
  targetLattice: AmbientLattice,
  options: LiftOptions,
): CodeLayer {
  if (targetLattice.topology !== options.targetTopology) {
    throw new Error('target lattice topology differs from requested lift topology')
  }

  const targetCells = new Set(targetLattice.cells.map((cell) => cell.id))
  const correspondence = new Map<string, string>()
  for (const cell of sourceLattice.cells) {
    if (targetCells.has(cell.id)) correspondence.set(cell.id, cell.id)
  }

  const liftedClasses = source.cohomologyClasses.map((item) => ({
    ...item,
    id: `${item.id}__LIFT_${options.targetTopology}`,
    degree: options.preserveDegree === false ? Math.max(0, item.degree - 1) : item.degree,
    supportCells: item.supportCells.filter((id) => correspondence.has(id)),
    obstruction:
      item.supportCells.every((id) => correspondence.has(id))
        ? item.obstruction
        : 'PARTIAL_SUPPORT_UNDER_TOPOLOGY_LIFT',
  }))

  return {
    ...source,
    id: `${source.id}__${options.model}__${options.targetTopology}`,
    cohomologyClasses: liftedClasses,
  }
}

export function projectSceneToGraph(scene: PalaEstacaScene): Readonly<{
  nodes: readonly Readonly<{ id: string; dimension: number; type: string; position: readonly number[] }>[]
  edges: readonly Readonly<{ source: string; target: string; kind: 'INCIDENCE' | 'BOUNDARY' }>[]
  overlays: readonly Readonly<{ id: string; degree: number; support: readonly string[]; family: CodeFamily }>[]
}> {
  const boundaryEdges = scene.lattice.cells.flatMap((cell) =>
    cell.boundary.map((target) => ({ source: cell.id, target, kind: 'BOUNDARY' as const })),
  )
  return {
    nodes: scene.lattice.cells.map((cell) => ({
      id: cell.id,
      dimension: cell.dimension,
      type: cell.pluralType.strikkType,
      position: cell.position,
    })),
    edges: [
      ...scene.lattice.incidence.map((edge) => ({ ...edge, kind: 'INCIDENCE' as const })),
      ...boundaryEdges,
    ],
    overlays: scene.layers.flatMap((layer) =>
      layer.cohomologyClasses.map((item) => ({
        id: item.id,
        degree: item.degree,
        support: item.supportCells,
        family: layer.family,
      })),
    ),
  }
}
