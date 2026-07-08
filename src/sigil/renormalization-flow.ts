import { validateProfileColorPairs } from '../output/policyValidation.js'
import { cecicodeInspiredProfile } from '../profile/cecicodeInspired.js'
import type { ColorPairPolicyInput, ProfileValidationReport } from '../profile/profile.js'
import type {
  PluralSigilFlow,
  PluralSigilInjection,
  PluralSigilInput,
  PluralSigilIssue,
  PluralSigilPairing,
  PluralSigilPrimitive,
  PluralSigilReport,
  Theme,
} from '../types.js'
import { buildSigilPaletteFlow } from './palette-linter.js'
import type { SigilPaletteFlow, SigilPalettePairing } from './pdg-types.js'
import { lintPluralSigil } from './plural-sigil.js'

export const UAPA_INVARIANT_SIGIL_RENORMALIZATION_FLOW_ID =
  'UAPA_INVARIANT_SIGIL_RENORMALIZATION_FLOW_V1'

export type RenormalizationGlueStage = 'kokompiled' | 'kokobuilt' | 'kokoskaffolded' | 'kokoweaved'
export type PluralTheorySource = 'plural-sigil' | 'accessible-palette-linter' | 'cecicode-profile'
export type ContextTensorRole = 'colimit' | 'twisted-injection' | 'coboundary-cocycle' | 'adjoint' | 'annihilator'
export type ContextTensorVariance = 'invariant' | 'covariant' | 'contravariant'

export interface InvariantSigilRenormalizationInput extends PluralSigilInput {
  profilePairs?: readonly ColorPairPolicyInput[]
}

export interface ContextTypedTensor {
  id: string
  source: PluralTheorySource
  role: ContextTensorRole
  variance: ContextTensorVariance
  context: string
  domain: string
  codomain: string
  invariant: boolean
}

export interface TwistedInjectionWitness {
  id: string
  from: string
  to: string
  cocycle: string
  accepted: boolean
}

export interface RenormalizationColimit {
  context: 'PACAPDG'
  accepted: boolean
  primitiveIds: string[]
}

export interface GeneralizedMeraLayer {
  ordinal: number
  stage: string
  primitive: string
  invariant: string
}

export interface PacaPdgRenormalizationWitness {
  primitive: 'PACAPDG_INVARIANT_SIGIL_RENORMALIZATION'
  algorithm: 'generalized-plural-tensor-renormalization'
  layout: 'sigil-vlsi'
  twist: 'coboundary-cocycle-colimit'
  accepted: boolean
  piFixed: boolean
  tracePreserved: true
  noIdentityTransport: true
  branchWitnesses: {
    pluralSigil: boolean
    accessiblePalette: boolean
    cecicodeProfile: boolean
  }
}

export interface InvariantSigilRenormalizationFlow {
  id: typeof UAPA_INVARIANT_SIGIL_RENORMALIZATION_FLOW_ID
  namespace: string
  glueStages: RenormalizationGlueStage[]
  pluralReport: PluralSigilReport
  paletteFlow: SigilPaletteFlow
  profileReport: ProfileValidationReport
  tensors: ContextTypedTensor[]
  twistedInjections: TwistedInjectionWitness[]
  colimit: RenormalizationColimit
  mera: {
    kind: 'generalized-mera'
    layers: GeneralizedMeraLayer[]
    invariant: boolean
  }
  pacapdg: PacaPdgRenormalizationWitness
}

const GLUE_STAGES: RenormalizationGlueStage[] = ['kokompiled', 'kokobuilt', 'kokoskaffolded', 'kokoweaved']

function copyGlueStages(): RenormalizationGlueStage[] {
  return GLUE_STAGES.map((stage) => stage)
}

function normalizeBackground(background: string, theme: Theme): string {
  return background === 'theme' ? theme : background
}

function normalizePairing(pairing: PluralSigilPairing, theme: Theme): SigilPalettePairing {
  return {
    foreground: pairing.foreground,
    background: normalizeBackground(pairing.background, theme),
  }
}

function injectionPairings(injection: PluralSigilInjection, fallback: PluralSigilPairing[]): PluralSigilPairing[] {
  return injection.pairings ?? fallback
}

function buildRequiredPairings(input: InvariantSigilRenormalizationInput): SigilPalettePairing[] {
  return [
    ...input.pairings.map((pairing) => normalizePairing(pairing, input.theme)),
    ...input.injections.flatMap((injection) =>
      injectionPairings(injection, input.pairings).map((pairing) => normalizePairing(pairing, input.theme)),
    ),
  ]
}

function bindingDomain(primitive: PluralSigilPrimitive): string {
  const domain = primitive.bindings
    .map((binding) => `${binding.foreground}->${binding.background}`)
    .join(' | ')

  return domain.length === 0 ? primitive.namespace : domain
}

function buildPrimitiveTensor(report: PluralSigilReport, primitive: PluralSigilPrimitive): ContextTypedTensor {
  const isPdg = primitive.kind === 'PACAPDG'

  return {
    id: primitive.id,
    source: 'plural-sigil',
    role: isPdg ? 'twisted-injection' : 'colimit',
    variance: isPdg ? 'contravariant' : 'covariant',
    context: primitive.method,
    domain: bindingDomain(primitive),
    codomain: primitive.kind,
    invariant: report.ok,
  }
}

function buildCocycleTensor(namespace: string, report: PluralSigilReport, flow: PluralSigilFlow): ContextTypedTensor {
  return {
    id: `${namespace}:coboundary:${flow.ordinal}`,
    source: 'plural-sigil',
    role: 'coboundary-cocycle',
    variance: 'invariant',
    context: flow.stage,
    domain: flow.primitive,
    codomain: flow.invariant,
    invariant: report.ok,
  }
}

function buildProfileTensor(
  namespace: string,
  profileReport: ProfileValidationReport,
  pair: ColorPairPolicyInput,
): ContextTypedTensor {
  const pairFailed = profileReport.issues.some((issue) => issue.pairId === pair.id && issue.severity === 'fail')

  return {
    id: `${namespace}:profile:${pair.id}`,
    source: 'cecicode-profile',
    role: 'adjoint',
    variance: 'covariant',
    context: pair.role,
    domain: pair.foreground,
    codomain: pair.background,
    invariant: !pairFailed,
  }
}

function buildPluralAnnihilator(namespace: string, issue: PluralSigilIssue): ContextTypedTensor {
  return {
    id: `${namespace}:annihilator:${issue.code}:${issue.path}`,
    source: 'plural-sigil',
    role: 'annihilator',
    variance: 'contravariant',
    context: issue.code,
    domain: issue.path,
    codomain: issue.message,
    invariant: false,
  }
}

function buildPaletteAnnihilator(namespace: string, reason: string, index: number): ContextTypedTensor {
  return {
    id: `${namespace}:annihilator:palette:${index + 1}`,
    source: 'accessible-palette-linter',
    role: 'annihilator',
    variance: 'contravariant',
    context: 'PACAPDG_ACCESSIBLE_PAIRING',
    domain: 'requiredPairs',
    codomain: reason,
    invariant: false,
  }
}

function buildProfileAnnihilator(namespace: string, issue: ProfileValidationReport['issues'][number]): ContextTypedTensor {
  return {
    id: `${namespace}:annihilator:profile:${issue.ruleId}:${issue.pairId ?? 'profile'}`,
    source: 'cecicode-profile',
    role: 'annihilator',
    variance: 'contravariant',
    context: issue.ruleId,
    domain: issue.pairId ?? 'profile',
    codomain: issue.message,
    invariant: false,
  }
}

function buildTensors(
  namespace: string,
  pluralReport: PluralSigilReport,
  paletteFlow: SigilPaletteFlow,
  profileReport: ProfileValidationReport,
  profilePairs: readonly ColorPairPolicyInput[],
): ContextTypedTensor[] {
  return [
    ...pluralReport.primitives.map((primitive) => buildPrimitiveTensor(pluralReport, primitive)),
    ...pluralReport.flow.map((flow) => buildCocycleTensor(namespace, pluralReport, flow)),
    ...profilePairs.map((pair) => buildProfileTensor(namespace, profileReport, pair)),
    ...pluralReport.issues.map((issue) => buildPluralAnnihilator(namespace, issue)),
    ...paletteFlow.result.reasons.map((reason, index) => buildPaletteAnnihilator(namespace, reason, index)),
    ...profileReport.issues.map((issue) => buildProfileAnnihilator(namespace, issue)),
  ]
}

function buildTwistedInjection(input: InvariantSigilRenormalizationInput, injection: PluralSigilInjection): TwistedInjectionWitness {
  return {
    id: `${input.namespace}:${injection.id}:twisted-injection`,
    from: input.namespace,
    to: injection.id,
    cocycle: injection.method ?? 'plural-method',
    accepted: true,
  }
}

function buildMeraLayer(flow: PluralSigilFlow): GeneralizedMeraLayer {
  return {
    ordinal: flow.ordinal,
    stage: flow.stage,
    primitive: flow.primitive,
    invariant: flow.invariant,
  }
}

export function buildInvariantSigilRenormalizationFlow(
  input: InvariantSigilRenormalizationInput,
): InvariantSigilRenormalizationFlow {
  const pluralReport = lintPluralSigil(input)
  const paletteFlow = buildSigilPaletteFlow({
    sourceHex: input.sourceHex,
    theme: input.theme,
    requiredPairs: buildRequiredPairings(input),
  })
  const profilePairs = input.profilePairs ?? []
  const profileReport = validateProfileColorPairs(cecicodeInspiredProfile, profilePairs)
  const pluralSigilAccepted = pluralReport.ok
  const accessiblePaletteAccepted = paletteFlow.result.accepted
  const cecicodeProfileAccepted = profileReport.allPass
  const accepted = pluralSigilAccepted && accessiblePaletteAccepted && cecicodeProfileAccepted

  return {
    id: UAPA_INVARIANT_SIGIL_RENORMALIZATION_FLOW_ID,
    namespace: input.namespace,
    glueStages: copyGlueStages(),
    pluralReport,
    paletteFlow,
    profileReport,
    tensors: buildTensors(input.namespace, pluralReport, paletteFlow, profileReport, profilePairs),
    twistedInjections: input.injections.map((injection) => ({
      ...buildTwistedInjection(input, injection),
      accepted,
    })),
    colimit: {
      context: 'PACAPDG',
      accepted,
      primitiveIds: pluralReport.primitives.map((primitive) => primitive.id),
    },
    mera: {
      kind: 'generalized-mera',
      layers: pluralReport.flow.map((flow) => buildMeraLayer(flow)),
      invariant: accepted,
    },
    pacapdg: {
      primitive: 'PACAPDG_INVARIANT_SIGIL_RENORMALIZATION',
      algorithm: 'generalized-plural-tensor-renormalization',
      layout: 'sigil-vlsi',
      twist: 'coboundary-cocycle-colimit',
      accepted,
      piFixed: accepted,
      tracePreserved: true,
      noIdentityTransport: true,
      branchWitnesses: {
        pluralSigil: pluralSigilAccepted,
        accessiblePalette: accessiblePaletteAccepted,
        cecicodeProfile: cecicodeProfileAccepted,
      },
    },
  }
}
