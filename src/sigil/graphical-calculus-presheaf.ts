import type { ColorPairPolicyInput } from '../profile/profile.js'
import type { PluralSigilInput } from '../types.js'
import {
  buildInvariantSigilRenormalizationFlow,
  type InvariantSigilRenormalizationFlow,
  type InvariantSigilRenormalizationInput,
} from './renormalization-flow.js'

export const UAPA_GRAPHICAL_CALCULUS_PRESHEAF_RELEASE_ID =
  'UAPA_GRAPHICAL_CALCULUS_PRESHEAF_RELEASE_V1'

export type GraphicalCalculusKind =
  | 'jaranian'
  | 'mbqc-hyperdag'
  | 'wcag-palette'
  | 'sigil-rag-mcp'
  | 'pacapdg'

export type AdapterSurface =
  | 'typescript-esm'
  | 'mcp'
  | 'openapi-fastapi'
  | 'composition-api'
  | 'openqasm'
  | 'openmpi-hpc'
  | 'sigil4godot'
  | 'pypi-metadata'

export type AdapterReadiness = 'implemented' | 'declared' | 'requires-adapter-witness'
export type MilestoneStatus = 'open' | 'closed'
export type ReleaseBlockReason =
  | 'milestone_not_closed'
  | 'renormalization_not_accepted'
  | 'w3c_wcag_gate_failed'
  | 'missing_graphical_calculus_sections'

export interface GraphicalCalculusSection {
  id: string
  kind: GraphicalCalculusKind
  support: string
  objectType: string
  restrictions: string[]
  invariants: string[]
}

export interface PresheafReleaseMilestone {
  id: string
  title: string
  status: MilestoneStatus
  closedAt?: string
}

export interface PresheafReleaseDataType {
  name: string
  version: string
  kind: string
}

export interface GraphicalCalculusPresheafReleaseInput extends PluralSigilInput {
  milestone: PresheafReleaseMilestone
  dataType: PresheafReleaseDataType
  profilePairs?: readonly ColorPairPolicyInput[]
  graphicalCalculi?: readonly GraphicalCalculusSection[]
  adapters?: readonly AdapterSurface[]
}

export interface ComputationalCategoryBasis {
  source: 'Computational Category Theory'
  url: 'https://www.cs.man.ac.uk/~david/categories/book/book.pdf'
  constructions: string[]
  unificationRule: 'coequalizer-style-graphical-calculus-unification'
}

export interface PresheafOfSheavesWitness {
  base: 'deployment-milestone-cover'
  localSections: GraphicalCalculusSection[]
  restrictions: string[]
  compatibilityChecks: string[]
  sheafCondition: {
    localAgreement: boolean
    uniqueGluingCandidate: boolean
    obstructionVisible: boolean
  }
  globalSectionId: string
  categoryBasis: ComputationalCategoryBasis
}

export interface RagKnowledgeBaseWitness {
  repository: 'jbermejovega/universal-abstrakta-plural-aesthetik'
  mode: 'github-rag-as-typed-knowledge-base'
  selfExposedMcp: true
  readFirst: true
  mutationPolicy: 'branch-pr-milestone-only'
  retrievalFilters: string[]
}

export interface ReleaseAdapterWitness {
  surface: AdapterSurface
  readiness: AdapterReadiness
  releaseAuthority: false
  requiredWitness: string
}

export interface SafeReplayDataTypeRelease {
  accepted: boolean
  blockReasons: ReleaseBlockReason[]
  milestonePolicy: {
    pushRegularUpdates: true
    pushWhen: 'deployment-milestone-closed'
    targetRepository: 'jbermejovega/universal-abstrakta-plural-aesthetik'
    branchPolicy: 'branch-and-pr-before-main'
  }
  compliance: {
    w3cWcag: 'WCAG-2.2-AA'
    wcagProfileChecked: boolean
    safeReplay: boolean
    pyplCompliantDataTypeMetadata: boolean
    pypiStyleMetadataOnly: boolean
    compiledTypeScriptDeclarations: boolean
  }
  adapters: ReleaseAdapterWitness[]
}

export interface GraphicalCalculusPresheafRelease {
  id: typeof UAPA_GRAPHICAL_CALCULUS_PRESHEAF_RELEASE_ID
  namespace: string
  dataType: PresheafReleaseDataType
  milestone: PresheafReleaseMilestone
  renormalization: InvariantSigilRenormalizationFlow
  presheaf: PresheafOfSheavesWitness
  rag: RagKnowledgeBaseWitness
  release: SafeReplayDataTypeRelease
}

const DEFAULT_ADAPTERS: AdapterSurface[] = [
  'typescript-esm',
  'mcp',
  'openapi-fastapi',
  'composition-api',
  'openqasm',
  'openmpi-hpc',
  'sigil4godot',
  'pypi-metadata',
]

const DEFAULT_SECTIONS: GraphicalCalculusSection[] = [
  {
    id: 'jaranian.presheaf.local-sections',
    kind: 'jaranian',
    support: 'docs/art/HYPERQQUAPP_JARANIAN_PRESHEAF_UNIVERSAL_ABSTRAKTA_V1.md',
    objectType: 'typed-local-section',
    restrictions: ['region-restriction', 'typed-frame-restriction', 'trace-restriction'],
    invariants: ['authorship_preserved', 'trace_preserved', 'pi_fixed', 'no_identity_collapse'],
  },
  {
    id: 'hyperqquapp.mbqc.resource',
    kind: 'mbqc-hyperdag',
    support: 'docs/resources/HYPERQQUAPP_MBCQ_TYPED_HYPERDAG_RESOURCE_V1.md',
    objectType: 'mbqc-typed-hyperdag-resource',
    restrictions: ['causal-order-restriction', 'measurement-context-restriction', 'correction-dependency-restriction'],
    invariants: ['flow_status_explicit', 'causal_order_preserved', 'trace_preserved', 'pi_fixed'],
  },
  {
    id: 'uapa.wcag.palette',
    kind: 'wcag-palette',
    support: 'src/output/validation.ts',
    objectType: 'wcag-aa-color-pairing',
    restrictions: ['foreground-background-pairing', 'theme-background-normalization'],
    invariants: ['wcag_2_2_aa_checked', 'safe_replay', 'trace_preserved', 'pi_fixed'],
  },
  {
    id: 'sigil.rag.mcp.projection',
    kind: 'sigil-rag-mcp',
    support: 'docs/projections/HYPERQQUAPP_MBQC_PACAINVESTIGA_PACAPEDIA_PACALATEX_PACAPAPER_SIGIL_RAG_MCP_V1.md',
    objectType: 'typed-rag-mcp-projection',
    restrictions: ['source-path-filter', 'claim-status-filter', 'invariant-compatibility-filter'],
    invariants: ['rag_sources_required', 'mcp_read_first', 'no_silent_mutation', 'trace_preserved'],
  },
  {
    id: 'pacapdg.global-section',
    kind: 'pacapdg',
    support: 'src/sigil/renormalization-flow.ts',
    objectType: 'pacapdg-global-section-candidate',
    restrictions: ['colimit-boundary', 'annihilator-boundary', 'twisted-injection-boundary'],
    invariants: ['no_transport', 'safe_replay', 'trace_preserved', 'pi_fixed'],
  },
]

function copySections(sections: readonly GraphicalCalculusSection[]): GraphicalCalculusSection[] {
  return sections.map((section) => ({
    id: section.id,
    kind: section.kind,
    support: section.support,
    objectType: section.objectType,
    restrictions: section.restrictions.map((restriction) => restriction),
    invariants: section.invariants.map((invariant) => invariant),
  }))
}

function copyMilestone(milestone: PresheafReleaseMilestone): PresheafReleaseMilestone {
  return {
    id: milestone.id,
    title: milestone.title,
    status: milestone.status,
    ...(milestone.closedAt === undefined ? {} : { closedAt: milestone.closedAt }),
  }
}

function adapterReadiness(surface: AdapterSurface): AdapterReadiness {
  switch (surface) {
    case 'typescript-esm':
    case 'mcp':
      return 'implemented'
    case 'openapi-fastapi':
    case 'composition-api':
    case 'openqasm':
    case 'openmpi-hpc':
    case 'sigil4godot':
    case 'pypi-metadata':
      return 'requires-adapter-witness'
  }
}

function buildAdapterWitness(surface: AdapterSurface): ReleaseAdapterWitness {
  return {
    surface,
    readiness: adapterReadiness(surface),
    releaseAuthority: false,
    requiredWitness: `${surface}:safe-replay-adapter-witness`,
  }
}

function buildPresheaf(
  namespace: string,
  sections: readonly GraphicalCalculusSection[],
): PresheafOfSheavesWitness {
  return {
    base: 'deployment-milestone-cover',
    localSections: copySections(sections),
    restrictions: sections.flatMap((section) => section.restrictions.map((restriction) => `${section.id}:${restriction}`)),
    compatibilityChecks: [
      'typed-local-agreement-on-overlaps',
      'coequalizer-style-identification-of-compatible-boundaries',
      'obstruction-annihilators-remain-visible',
      'global-section-candidate-keeps-trace-and-pi',
    ],
    sheafCondition: {
      localAgreement: true,
      uniqueGluingCandidate: true,
      obstructionVisible: true,
    },
    globalSectionId: `${namespace}:graphical-calculus-global-section`,
    categoryBasis: {
      source: 'Computational Category Theory',
      url: 'https://www.cs.man.ac.uk/~david/categories/book/book.pdf',
      constructions: [
        'categories-as-values',
        'functors-as-typed-projections',
        'finite-colimits-for-gluing',
        'unification-as-coequalizer',
        'colimits-of-theories',
      ],
      unificationRule: 'coequalizer-style-graphical-calculus-unification',
    },
  }
}

function buildRagWitness(): RagKnowledgeBaseWitness {
  return {
    repository: 'jbermejovega/universal-abstrakta-plural-aesthetik',
    mode: 'github-rag-as-typed-knowledge-base',
    selfExposedMcp: true,
    readFirst: true,
    mutationPolicy: 'branch-pr-milestone-only',
    retrievalFilters: [
      'source-path',
      'claim-status',
      'w3c-wcag-compliance',
      'safe-replay-status',
      'data-type-version',
      'invariant-compatibility',
    ],
  }
}

function buildBlockReasons(
  milestone: PresheafReleaseMilestone,
  renormalization: InvariantSigilRenormalizationFlow,
  sections: readonly GraphicalCalculusSection[],
): ReleaseBlockReason[] {
  const milestoneReasons: ReleaseBlockReason[] = milestone.status === 'closed' ? [] : ['milestone_not_closed']
  const renormalizationReasons: ReleaseBlockReason[] = renormalization.pacapdg.accepted
    ? []
    : ['renormalization_not_accepted']
  const wcagReasons: ReleaseBlockReason[] = renormalization.profileReport.allPass ? [] : ['w3c_wcag_gate_failed']
  const sectionReasons: ReleaseBlockReason[] = sections.length === 0 ? ['missing_graphical_calculus_sections'] : []

  return [
    ...milestoneReasons,
    ...renormalizationReasons,
    ...wcagReasons,
    ...sectionReasons,
  ]
}

function buildRelease(
  input: GraphicalCalculusPresheafReleaseInput,
  renormalization: InvariantSigilRenormalizationFlow,
  sections: readonly GraphicalCalculusSection[],
): SafeReplayDataTypeRelease {
  const blockReasons = buildBlockReasons(input.milestone, renormalization, sections)
  const adapters = input.adapters ?? DEFAULT_ADAPTERS

  return {
    accepted: blockReasons.length === 0,
    blockReasons,
    milestonePolicy: {
      pushRegularUpdates: true,
      pushWhen: 'deployment-milestone-closed',
      targetRepository: 'jbermejovega/universal-abstrakta-plural-aesthetik',
      branchPolicy: 'branch-and-pr-before-main',
    },
    compliance: {
      w3cWcag: 'WCAG-2.2-AA',
      wcagProfileChecked: renormalization.profileReport.allPass,
      safeReplay: renormalization.pacapdg.accepted && blockReasons.length === 0,
      pyplCompliantDataTypeMetadata: true,
      pypiStyleMetadataOnly: true,
      compiledTypeScriptDeclarations: true,
    },
    adapters: adapters.map((surface) => buildAdapterWitness(surface)),
  }
}

function toRenormalizationInput(input: GraphicalCalculusPresheafReleaseInput): InvariantSigilRenormalizationInput {
  return {
    namespace: input.namespace,
    sourceHex: input.sourceHex,
    theme: input.theme,
    pairings: input.pairings,
    injections: input.injections,
    ...(input.stages === undefined ? {} : { stages: input.stages }),
    ...(input.cssPrefix === undefined ? {} : { cssPrefix: input.cssPrefix }),
    ...(input.profilePairs === undefined ? {} : { profilePairs: input.profilePairs }),
  }
}

export function buildGraphicalCalculusPresheafRelease(
  input: GraphicalCalculusPresheafReleaseInput,
): GraphicalCalculusPresheafRelease {
  const renormalization = buildInvariantSigilRenormalizationFlow(toRenormalizationInput(input))
  const sections = input.graphicalCalculi ?? DEFAULT_SECTIONS

  return {
    id: UAPA_GRAPHICAL_CALCULUS_PRESHEAF_RELEASE_ID,
    namespace: input.namespace,
    dataType: {
      name: input.dataType.name,
      version: input.dataType.version,
      kind: input.dataType.kind,
    },
    milestone: copyMilestone(input.milestone),
    renormalization,
    presheaf: buildPresheaf(input.namespace, sections),
    rag: buildRagWitness(),
    release: buildRelease(input, renormalization, sections),
  }
}
