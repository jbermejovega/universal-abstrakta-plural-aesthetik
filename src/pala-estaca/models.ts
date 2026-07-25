import type { EngineModel } from './index.js'

export interface PalaEstacaModelDescriptor {
  readonly id: EngineModel
  readonly role: string
  readonly dimensions: readonly number[]
  readonly preserves: readonly string[]
  readonly executionClaimed: false
}

export const PALA_ESTACA_MODELS: readonly PalaEstacaModelDescriptor[] = [
  {
    id: 'PACA_LAUREL',
    role: 'rooted local-section and branching lattice view',
    dimensions: [1, 2, 3],
    preserves: ['local_context', 'branch_provenance', 'boundary'],
    executionClaimed: false,
  },
  {
    id: 'LAURELPI',
    role: 'pi-fixed laurel recursion and curvature-aware embedding',
    dimensions: [2, 3, 4],
    preserves: ['pi_fixed', 'curvature_class', 'safe_replay'],
    executionClaimed: false,
  },
  {
    id: 'TENSEGRITYPI',
    role: 'strut-cable realization of cells, membranes and checks',
    dimensions: [1, 2, 3],
    preserves: ['incidence', 'tension_class', 'plural_identity'],
    executionClaimed: false,
  },
  {
    id: 'QUOQUANTUM_TENSEGRITY',
    role: 'finite quotient visualization of code and cohomology sectors',
    dimensions: [2, 3, 4],
    preserves: ['quotient_witness', 'code_family', 'obstruction_ledger'],
    executionClaimed: false,
  },
  {
    id: 'UNIVERSAL_SAFIKA_ABSTRAKTA_PI',
    role: 'accessible universal visual projection with redundant semantics',
    dimensions: [0, 1, 2, 3],
    preserves: ['accessibility', 'semiotics', 'semantic_redundancy'],
    executionClaimed: false,
  },
  {
    id: 'TALLERTWERKPI',
    role: 'embodied workshop and movement-state projection',
    dimensions: [1, 2, 3],
    preserves: ['body_boundary', 'consent', 'trace'],
    executionClaimed: false,
  },
  {
    id: 'JARRAPI',
    role: 'Jaranian typed morphism, kink and choreography adapter',
    dimensions: [1, 2, 3, 4],
    preserves: ['jaranian_type', 'kink_class', 'context'],
    executionClaimed: false,
  },
  {
    id: 'HYPERAUSALPI',
    role: 'hypercoherence compositional-contextual plural flow model',
    dimensions: [2, 3, 4],
    preserves: ['higher_coherence', 'causal_trace', 'contextual_composition'],
    executionClaimed: false,
  },
] as const

export function getPalaEstacaModel(id: EngineModel): PalaEstacaModelDescriptor {
  const model = PALA_ESTACA_MODELS.find((candidate) => candidate.id === id)
  if (!model) throw new Error(`unknown Pala Estaca model: ${id}`)
  return model
}
