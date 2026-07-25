import { createHash } from 'node:crypto'

import { projectSceneToGraph, type PalaEstacaScene } from './index.js'
import { getPalaEstacaModel } from './models.js'

export const PALA_ESTACA_GODOT_SCHEMA = 'uapa.pala-estaca.godot-manifest.v1' as const

export type GodotCellKind = 'VERTEX_CELL' | 'EDGE_CELL' | 'FACET_CELL' | 'HIGHER_CELL'

export interface GodotCellProjection {
  readonly id: string
  readonly kind: GodotCellKind
  readonly dimension: number
  readonly position: readonly [number, number, number]
  readonly pluralType: string
  readonly semanticType: string
  readonly semioticType: string
  readonly contextId: string
}

export interface GodotRelationProjection {
  readonly source: string
  readonly target: string
  readonly kind: 'INCIDENCE' | 'BOUNDARY'
}

export interface GodotCohomologyOverlay {
  readonly id: string
  readonly degree: number
  readonly support: readonly string[]
  readonly family: string
}

export interface GodotHyperkernelProjection {
  readonly id: string
  readonly role: string
  readonly dimensions: readonly number[]
  readonly preserves: readonly string[]
}

export interface PalaEstacaGodotManifest {
  readonly schema: typeof PALA_ESTACA_GODOT_SCHEMA
  readonly schemaVersion: 1
  readonly sceneId: string
  readonly sourceDigest: string
  readonly topology: string
  readonly cells: readonly GodotCellProjection[]
  readonly relations: readonly GodotRelationProjection[]
  readonly overlays: readonly GodotCohomologyOverlay[]
  readonly hyperkernels: readonly GodotHyperkernelProjection[]
  readonly invariants: {
    readonly provenancePreserved: true
    readonly replayPreserved: true
    readonly noIdentityTransport: true
    readonly noPluralCollapse: true
    readonly piFixed: true
    readonly contextPreserved: true
    readonly renderIsProjection: true
    readonly canonicalAuthority: false
  }
  readonly digest: string
}

function toVector3(position: readonly number[]): readonly [number, number, number] {
  return [position[0] ?? 0, position[1] ?? 0, position[2] ?? 0]
}

function cellKind(dimension: number): GodotCellKind {
  if (dimension <= 0) return 'VERTEX_CELL'
  if (dimension === 1) return 'EDGE_CELL'
  if (dimension === 2) return 'FACET_CELL'
  return 'HIGHER_CELL'
}

function digest(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}

export function projectSceneToGodotManifest(scene: PalaEstacaScene): PalaEstacaGodotManifest {
  const graph = projectSceneToGraph(scene)
  const cellsById = new Map(scene.lattice.cells.map((cell) => [cell.id, cell] as const))

  const payload = {
    schema: PALA_ESTACA_GODOT_SCHEMA,
    schemaVersion: 1 as const,
    sceneId: scene.id,
    sourceDigest: scene.digest,
    topology: scene.topology,
    cells: graph.nodes.map((node) => {
      const source = cellsById.get(node.id)
      if (!source) throw new Error(`missing source cell for Godot projection: ${node.id}`)
      return {
        id: node.id,
        kind: cellKind(node.dimension),
        dimension: node.dimension,
        position: toVector3(node.position),
        pluralType: source.pluralType.strikkType,
        semanticType: source.pluralType.semanticType,
        semioticType: source.pluralType.semioticType,
        contextId: source.pluralType.contextId,
      }
    }),
    relations: graph.edges,
    overlays: graph.overlays,
    hyperkernels: scene.models.map((modelId) => {
      const model = getPalaEstacaModel(modelId)
      return {
        id: model.id,
        role: model.role,
        dimensions: model.dimensions,
        preserves: model.preserves,
      }
    }),
    invariants: {
      ...scene.invariants,
      renderIsProjection: true,
      canonicalAuthority: false,
    } as const,
  }

  return { ...payload, digest: digest(payload) }
}
