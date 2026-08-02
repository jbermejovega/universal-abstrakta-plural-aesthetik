import { createHash } from 'node:crypto'
import { PALA_ESTACA_MODELS } from './models.js'
import type { EngineModel } from './index.js'

export const PALA_ESTACA_PYDANTIKA_SHEAF_ID =
  'PALA_ESTACA_PYDANTIKA_COHERENT_SHEAF_V1' as const
export const PALA_ESTACA_SEMANTIC_KERNEL_ID =
  'SIGILITAS_PYDANTIKA_COHERENT_SHEAF_KERNEL_V1' as const
export const PALA_ESTACA_SOURCE_SHA =
  '040117f2620b517182b7eb7d551d27b05ac0216d' as const
export const SIGIL4CPYTHON_PROJECTION_SHA =
  'f46124461838d94fc5835b340cf08aac8233e7dc' as const

export type PydantikaAnnotation =
  | 'PYDANTIKA_ANNOTATED'
  | 'PLURAL_TYPED'
  | 'PACAPDG'
  | 'UAP'
  | 'TRACE_PRESERVED'
  | 'PI_FIXED'
  | 'NO_IDENTITY_TRANSPORT'
  | 'OBSTRUCTION_PRESERVED'
  | 'RENDER_IS_PROJECTION'

export type CoherentSheafState =
  | 'ADMIT_COHERENT_SHEAF'
  | 'HOLD_WITH_COHERENCE_OBSTRUCTION'
  | 'REJECT_INVALID_SHEAF'

export interface PydantikaAnnotatedKernel {
  readonly sectionId: string
  readonly modelId: EngineModel
  readonly contextId: string
  readonly semanticKernelId: typeof PALA_ESTACA_SEMANTIC_KERNEL_ID
  readonly annotations: readonly PydantikaAnnotation[]
  readonly traceRef: string
  readonly piFixed: true
  readonly noIdentityTransport: true
  readonly executionClaimed: false
}

export interface PydantikaRestrictionWitness {
  readonly witnessId: string
  readonly sourceSection: 'PACA_ESTACA_ROOT'
  readonly targetSection: string
  readonly overlapContext: string
  readonly preservesAnnotations: true
  readonly preservesTrace: true
  readonly piFixed: true
  readonly identityTransported: false
}

export interface VoidOuroborosProjection {
  readonly flowId: 'PYDANTIKA_VOID_TYPED_OUROBOROS_FLOW_V1'
  readonly voidType: 'VOID'
  readonly finiteBudget: number
  readonly recurRequiresDecreasingResidue: true
  readonly errorHistoryAppendOnly: true
  readonly budgetResetAllowed: false
  readonly runtimeExecuted: false
}

export interface PalaEstacaPydantikaSheaf {
  readonly id: typeof PALA_ESTACA_PYDANTIKA_SHEAF_ID
  readonly semanticKernelId: typeof PALA_ESTACA_SEMANTIC_KERNEL_ID
  readonly source: {
    readonly repository: 'jbermejovega/sigilbook'
    readonly pullRequest: 649
    readonly branch: 'agent/sigilitas-vortice-taller-twerk-canonical-release-v1'
    readonly commit: typeof PALA_ESTACA_SOURCE_SHA
  }
  readonly cpythonProjection: {
    readonly repository: 'jbermejovega/sigil4cpython'
    readonly pullRequest: 6
    readonly branch: 'agent/vortice-twerk-coherent-sheaf-projection-v1'
    readonly commit: typeof SIGIL4CPYTHON_PROJECTION_SHA
  }
  readonly kernels: readonly PydantikaAnnotatedKernel[]
  readonly restrictions: readonly PydantikaRestrictionWitness[]
  readonly ouroboros: VoidOuroborosProjection
  readonly synthGothHubIsKernel: false
  readonly renderHasCanonicalAuthority: false
  readonly runtimeExecuted: false
  readonly digest: string
}

export interface PalaEstacaSheafValidation {
  readonly state: CoherentSheafState
  readonly obstructions: readonly string[]
  readonly warnings: readonly string[]
  readonly digest: string
}

function stableDigest(value: unknown): string {
  return createHash('sha256')
    .update(JSON.stringify(value))
    .digest('hex')
}

function annotationsFor(model: EngineModel): readonly PydantikaAnnotation[] {
  const base = [
    'PYDANTIKA_ANNOTATED',
    'PLURAL_TYPED',
    'PACAPDG',
    'UAP',
    'TRACE_PRESERVED',
    'PI_FIXED',
    'NO_IDENTITY_TRANSPORT',
    'OBSTRUCTION_PRESERVED',
  ] as const satisfies readonly PydantikaAnnotation[]

  return model === 'UNIVERSAL_SAFIKA_ABSTRAKTA_PI'
    ? [...base, 'RENDER_IS_PROJECTION']
    : base
}

export function buildPalaEstacaPydantikaSheaf(): PalaEstacaPydantikaSheaf {
  const kernels = PALA_ESTACA_MODELS.map((model) => ({
    sectionId: `PACA_ESTACA_KERNEL_${model.id}`,
    modelId: model.id,
    contextId: `PACA_ESTACA/${model.id}`,
    semanticKernelId: PALA_ESTACA_SEMANTIC_KERNEL_ID,
    annotations: annotationsFor(model.id),
    traceRef: `trace://pala-estaca/pydantika/${model.id}`,
    piFixed: true,
    noIdentityTransport: true,
    executionClaimed: false,
  })) satisfies readonly PydantikaAnnotatedKernel[]

  const restrictions = kernels.map((kernel, index) => ({
    witnessId: `R_PACA_ESTACA_${index}`,
    sourceSection: 'PACA_ESTACA_ROOT',
    targetSection: kernel.sectionId,
    overlapContext: `PACA_ESTACA_OVERLAP/${kernel.modelId}`,
    preservesAnnotations: true,
    preservesTrace: true,
    piFixed: true,
    identityTransported: false,
  })) satisfies readonly PydantikaRestrictionWitness[]

  const payload = {
    id: PALA_ESTACA_PYDANTIKA_SHEAF_ID,
    semanticKernelId: PALA_ESTACA_SEMANTIC_KERNEL_ID,
    source: {
      repository: 'jbermejovega/sigilbook',
      pullRequest: 649,
      branch: 'agent/sigilitas-vortice-taller-twerk-canonical-release-v1',
      commit: PALA_ESTACA_SOURCE_SHA,
    },
    cpythonProjection: {
      repository: 'jbermejovega/sigil4cpython',
      pullRequest: 6,
      branch: 'agent/vortice-twerk-coherent-sheaf-projection-v1',
      commit: SIGIL4CPYTHON_PROJECTION_SHA,
    },
    kernels,
    restrictions,
    ouroboros: {
      flowId: 'PYDANTIKA_VOID_TYPED_OUROBOROS_FLOW_V1',
      voidType: 'VOID',
      finiteBudget: 42,
      recurRequiresDecreasingResidue: true,
      errorHistoryAppendOnly: true,
      budgetResetAllowed: false,
      runtimeExecuted: false,
    },
    synthGothHubIsKernel: false,
    renderHasCanonicalAuthority: false,
    runtimeExecuted: false,
  } as const

  return { ...payload, digest: stableDigest(payload) }
}

export function validatePalaEstacaPydantikaSheaf(
  sheaf: PalaEstacaPydantikaSheaf,
): PalaEstacaSheafValidation {
  const obstructions: string[] = []
  const warnings: string[] = []
  const expectedModels = new Set(PALA_ESTACA_MODELS.map((model) => model.id))
  const actualModels = new Set(sheaf.kernels.map((kernel) => kernel.modelId))

  if (!/^[a-f0-9]{40}$/.test(sheaf.source.commit)) {
    obstructions.push('INVALID_SIGILBOOK_SOURCE_SHA')
  }
  if (!/^[a-f0-9]{40}$/.test(sheaf.cpythonProjection.commit)) {
    obstructions.push('INVALID_SIGIL4CPYTHON_SOURCE_SHA')
  }
  if (
    expectedModels.size !== actualModels.size
    || [...expectedModels].some((model) => !actualModels.has(model))
  ) {
    obstructions.push('PACA_ESTACA_KERNEL_COVER_INCOMPLETE')
  }

  const sectionIds = sheaf.kernels.map((kernel) => kernel.sectionId)
  if (new Set(sectionIds).size !== sectionIds.length) {
    obstructions.push('PACA_ESTACA_SECTION_IDENTITY_COLLAPSE')
  }

  for (const kernel of sheaf.kernels) {
    if (kernel.semanticKernelId !== PALA_ESTACA_SEMANTIC_KERNEL_ID) {
      obstructions.push(`SEMANTIC_KERNEL_MISMATCH:${kernel.modelId}`)
    }
    if (!kernel.piFixed || !kernel.noIdentityTransport) {
      obstructions.push(`KERNEL_INVARIANT_FAILURE:${kernel.modelId}`)
    }
    if (kernel.executionClaimed) {
      obstructions.push(`EXECUTION_CLAIM_FORBIDDEN:${kernel.modelId}`)
    }
    const required: readonly PydantikaAnnotation[] = [
      'PYDANTIKA_ANNOTATED',
      'PLURAL_TYPED',
      'PACAPDG',
      'UAP',
      'TRACE_PRESERVED',
      'PI_FIXED',
      'NO_IDENTITY_TRANSPORT',
      'OBSTRUCTION_PRESERVED',
    ]
    if (required.some((annotation) => !kernel.annotations.includes(annotation))) {
      obstructions.push(`ANNOTATION_STACK_INCOMPLETE:${kernel.modelId}`)
    }
  }

  const knownSections = new Set(sectionIds)
  if (
    sheaf.restrictions.length !== sheaf.kernels.length
    || sheaf.restrictions.some(
      (restriction) =>
        !knownSections.has(restriction.targetSection)
        || restriction.sourceSection !== 'PACA_ESTACA_ROOT'
        || restriction.identityTransported
        || !restriction.preservesAnnotations
        || !restriction.preservesTrace
        || !restriction.piFixed,
    )
  ) {
    obstructions.push('RESTRICTION_WITNESS_FAILURE')
  }

  if (
    sheaf.ouroboros.voidType !== 'VOID'
    || sheaf.ouroboros.finiteBudget < 1
    || !sheaf.ouroboros.recurRequiresDecreasingResidue
    || !sheaf.ouroboros.errorHistoryAppendOnly
    || sheaf.ouroboros.budgetResetAllowed
    || sheaf.ouroboros.runtimeExecuted
  ) {
    obstructions.push('VOID_OUROBOROS_BOUNDARY_FAILURE')
  }

  if (sheaf.synthGothHubIsKernel) {
    obstructions.push('SYNTHGOTHHUB_ROUTER_CANNOT_BECOME_KERNEL')
  }
  if (sheaf.renderHasCanonicalAuthority) {
    obstructions.push('RENDER_CANNOT_HAVE_CANONICAL_AUTHORITY')
  }
  if (sheaf.runtimeExecuted) {
    obstructions.push('RUNTIME_EXECUTION_NOT_OBSERVED')
  }
  if (!sheaf.kernels.some((kernel) => kernel.modelId === 'HYPERAUSALPI')) {
    warnings.push('HYPERCOHERENCE_MODEL_NOT_PRESENT')
  }

  const state: CoherentSheafState = obstructions.some(
    (item) =>
      item.includes('IDENTITY')
      || item.includes('CANONICAL_AUTHORITY')
      || item.includes('SYNTHGOTHHUB'),
  )
    ? 'REJECT_INVALID_SHEAF'
    : obstructions.length > 0
      ? 'HOLD_WITH_COHERENCE_OBSTRUCTION'
      : 'ADMIT_COHERENT_SHEAF'

  return {
    state,
    obstructions,
    warnings,
    digest: stableDigest({
      sheaf: sheaf.digest,
      state,
      obstructions,
      warnings,
    }),
  }
}
