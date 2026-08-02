import { createHash } from 'node:crypto'
import {
  buildVorticeTwerkPluralAesthetik,
  validateVorticeTwerkPluralAesthetik,
} from './vortice-twerk-plural-aesthetik.js'

export const PYDANTIKA_COHERENT_SHEAF_OVERLAY_V1 =
  'PYDANTIKA_COHERENT_SHEAF_OVERLAY_V1' as const
export const CURRENT_SIGILBOOK_SHEAF_SHA =
  '040117f2620b517182b7eb7d551d27b05ac0216d' as const
export const CURRENT_SIGIL4CPYTHON_SHEAF_SHA =
  'f46124461838d94fc5835b340cf08aac8233e7dc' as const

export interface PydantikaCoherentSheafOverlay {
  readonly id: typeof PYDANTIKA_COHERENT_SHEAF_OVERLAY_V1
  readonly semanticKernelId:
    'SIGILITAS_PYDANTIKA_COHERENT_SHEAF_KERNEL_V1'
  readonly previousSourcePins: {
    readonly sigilbook: string
    readonly sigil4cpython: string
  }
  readonly currentSourcePins: {
    readonly sigilbook: typeof CURRENT_SIGILBOOK_SHEAF_SHA
    readonly sigil4cpython: typeof CURRENT_SIGIL4CPYTHON_SHEAF_SHA
  }
  readonly voidOuroboros: {
    readonly flowId: 'PYDANTIKA_VOID_TYPED_OUROBOROS_FLOW_V1'
    readonly voidType: 'VOID'
    readonly finiteBudget: 42
    readonly recurRequiresDecreasingResidue: true
    readonly errorHistoryAppendOnly: true
    readonly budgetResetAllowed: false
  }
  readonly sourceModelRemainsDistinct: true
  readonly projectionRemainsDistinct: true
  readonly renderHasCanonicalAuthority: false
  readonly synthGothHubIsKernel: false
  readonly runtimeExecuted: false
  readonly digest: string
}

export interface CoherentSheafOverlayValidation {
  readonly state: 'ADMIT' | 'HOLD_WITH_OBSTRUCTION' | 'REJECT'
  readonly errors: readonly string[]
  readonly digest: string
}

function digest(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex')
}

export function buildPydantikaCoherentSheafOverlay(): PydantikaCoherentSheafOverlay {
  const source = buildVorticeTwerkPluralAesthetik()
  const payload = {
    id: PYDANTIKA_COHERENT_SHEAF_OVERLAY_V1,
    semanticKernelId: 'SIGILITAS_PYDANTIKA_COHERENT_SHEAF_KERNEL_V1',
    previousSourcePins: {
      sigilbook: source.sigilbookSource.commit,
      sigil4cpython: source.sigil4cpythonProjection.commit,
    },
    currentSourcePins: {
      sigilbook: CURRENT_SIGILBOOK_SHEAF_SHA,
      sigil4cpython: CURRENT_SIGIL4CPYTHON_SHEAF_SHA,
    },
    voidOuroboros: {
      flowId: 'PYDANTIKA_VOID_TYPED_OUROBOROS_FLOW_V1',
      voidType: 'VOID',
      finiteBudget: 42,
      recurRequiresDecreasingResidue: true,
      errorHistoryAppendOnly: true,
      budgetResetAllowed: false,
    },
    sourceModelRemainsDistinct: true,
    projectionRemainsDistinct: true,
    renderHasCanonicalAuthority: false,
    synthGothHubIsKernel: false,
    runtimeExecuted: false,
  } as const
  return { ...payload, digest: digest(payload) }
}

export function validatePydantikaCoherentSheafOverlay(
  overlay: PydantikaCoherentSheafOverlay,
): CoherentSheafOverlayValidation {
  const errors: string[] = []
  const sourceErrors = validateVorticeTwerkPluralAesthetik(
    buildVorticeTwerkPluralAesthetik(),
  )
  errors.push(...sourceErrors.map((error) => `SOURCE_MODEL:${error}`))

  if (!/^[a-f0-9]{40}$/.test(overlay.currentSourcePins.sigilbook)) {
    errors.push('INVALID_CURRENT_SIGILBOOK_PIN')
  }
  if (!/^[a-f0-9]{40}$/.test(overlay.currentSourcePins.sigil4cpython)) {
    errors.push('INVALID_CURRENT_SIGIL4CPYTHON_PIN')
  }
  if (
    !overlay.sourceModelRemainsDistinct
    || !overlay.projectionRemainsDistinct
  ) {
    errors.push('SOURCE_PROJECTION_IDENTITY_COLLAPSE')
  }
  if (
    overlay.voidOuroboros.voidType !== 'VOID'
    || overlay.voidOuroboros.finiteBudget !== 42
    || !overlay.voidOuroboros.recurRequiresDecreasingResidue
    || !overlay.voidOuroboros.errorHistoryAppendOnly
    || overlay.voidOuroboros.budgetResetAllowed
  ) {
    errors.push('VOID_OUROBOROS_BOUNDARY_FAILURE')
  }
  if (overlay.renderHasCanonicalAuthority) {
    errors.push('RENDER_CANONICAL_AUTHORITY_FORBIDDEN')
  }
  if (overlay.synthGothHubIsKernel) {
    errors.push('SYNTHGOTHHUB_IS_ROUTER_NOT_KERNEL')
  }
  if (overlay.runtimeExecuted) {
    errors.push('RUNTIME_EXECUTION_NOT_OBSERVED')
  }

  const state = errors.some(
    (error) =>
      error.includes('IDENTITY_COLLAPSE')
      || error.includes('CANONICAL_AUTHORITY')
      || error.includes('SYNTHGOTHHUB'),
  )
    ? 'REJECT'
    : errors.length > 0
      ? 'HOLD_WITH_OBSTRUCTION'
      : 'ADMIT'

  return {
    state,
    errors,
    digest: digest({ overlay: overlay.digest, state, errors }),
  }
}
