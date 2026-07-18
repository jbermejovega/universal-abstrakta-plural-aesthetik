export const JARRAKNE_KQC_TWIST_GROOVE_V1 =
  'JARRAKNE_KQC_TWIST_GROOVE_V1' as const

export type JarrakneEntity =
  | 'invoka-jarrakne'
  | 'jaraskhoreo'
  | 'arakne'
  | 'jarramplas-mask'

export type GlueSurface =
  | 'sigilbook:sigil4py'
  | 'sigil4cpython'
  | 'universal-abstrakta-plural-aesthetik'

export interface TwistInjectionWitness {
  readonly source: GlueSurface
  readonly target: GlueSurface
  readonly twist: 'relation-preserving'
  readonly injected: true
  readonly identityTransported: false
  readonly tracePreserved: true
}

export interface GrooveAtom {
  readonly id: string
  readonly entity: JarrakneEntity
  readonly beat: number
  readonly motion: 'twerk' | 'weave' | 'mask' | 'cross'
}

export interface JarrakneKqcNormalForm {
  readonly id: typeof JARRAKNE_KQC_TWIST_GROOVE_V1
  readonly surfaces: readonly GlueSurface[]
  readonly entities: readonly JarrakneEntity[]
  readonly twists: readonly TwistInjectionWitness[]
  readonly grooves: readonly GrooveAtom[]
  readonly invariants: {
    readonly noTransport: true
    readonly tracePreserved: true
    readonly provenancePreserved: true
    readonly pluralityPreserved: true
    readonly maskBoundaryPreserved: true
    readonly piFixed: true
    readonly humanReviewRequired: true
  }
}

const surfaces = [
  'sigilbook:sigil4py',
  'sigil4cpython',
  'universal-abstrakta-plural-aesthetik',
] as const satisfies readonly GlueSurface[]

const entities = [
  'invoka-jarrakne',
  'jaraskhoreo',
  'arakne',
  'jarramplas-mask',
] as const satisfies readonly JarrakneEntity[]

export function buildJarrakneKqcNormalForm(): JarrakneKqcNormalForm {
  return {
    id: JARRAKNE_KQC_TWIST_GROOVE_V1,
    surfaces,
    entities,
    twists: [
      {
        source: 'sigilbook:sigil4py',
        target: 'sigil4cpython',
        twist: 'relation-preserving',
        injected: true,
        identityTransported: false,
        tracePreserved: true,
      },
      {
        source: 'sigil4cpython',
        target: 'universal-abstrakta-plural-aesthetik',
        twist: 'relation-preserving',
        injected: true,
        identityTransported: false,
        tracePreserved: true,
      },
      {
        source: 'universal-abstrakta-plural-aesthetik',
        target: 'sigilbook:sigil4py',
        twist: 'relation-preserving',
        injected: true,
        identityTransported: false,
        tracePreserved: true,
      },
    ],
    grooves: [
      { id: 'groove-00', entity: 'invoka-jarrakne', beat: 0, motion: 'cross' },
      { id: 'groove-01', entity: 'jaraskhoreo', beat: 1, motion: 'twerk' },
      { id: 'groove-02', entity: 'arakne', beat: 2, motion: 'weave' },
      { id: 'groove-03', entity: 'jarramplas-mask', beat: 3, motion: 'mask' },
    ],
    invariants: {
      noTransport: true,
      tracePreserved: true,
      provenancePreserved: true,
      pluralityPreserved: true,
      maskBoundaryPreserved: true,
      piFixed: true,
      humanReviewRequired: true,
    },
  }
}

export function validateJarrakneKqcNormalForm(
  normalForm: JarrakneKqcNormalForm,
): readonly string[] {
  const errors: string[] = []
  const uniqueSurfaces = new Set(normalForm.surfaces)
  const uniqueEntities = new Set(normalForm.entities)

  if (uniqueSurfaces.size !== surfaces.length) {
    errors.push('all three glue surfaces must occur exactly once')
  }
  if (uniqueEntities.size !== entities.length) {
    errors.push('all four Jarrakne entities must occur exactly once')
  }
  if (normalForm.twists.length !== surfaces.length) {
    errors.push('the twist cycle must contain exactly three witnesses')
  }
  if (
    normalForm.twists.some(
      (witness) =>
        witness.identityTransported ||
        !witness.injected ||
        !witness.tracePreserved ||
        witness.twist !== 'relation-preserving',
    )
  ) {
    errors.push('every twist must preserve trace and relations without identity transport')
  }
  if (normalForm.grooves.some((groove, index) => groove.beat !== index)) {
    errors.push('groove beats must be contiguous and replay ordered')
  }
  if (!Object.values(normalForm.invariants).every(Boolean)) {
    errors.push('all KQC invariants must hold')
  }

  return errors
}

export function jarrakneMermaid(normalForm = buildJarrakneKqcNormalForm()): string {
  const verdict = validateJarrakneKqcNormalForm(normalForm).length === 0 ? 'ADMIT' : 'REJECT'
  return `flowchart LR
  S4P["sigilbook:sigil4py"] -- twist --> CP["sigil4cpython"]
  CP -- twist --> UAPA["universal plural abstrakta aesthetik"]
  UAPA -- replay-safe glue --> S4P
  J["Invoka Jarrakne"] --> K["Jaraskhoreo twerk grooves"]
  K --> A["Arakne weave"]
  A --> M["Jarramplas mask boundary"]
  S4P --> KQC{"KQC normal form: ${verdict}"}
  CP --> KQC
  UAPA --> KQC
  M --> KQC`
}
