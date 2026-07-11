export const UAPA_PACA_KNOWLEDGE_ATLAS_PROJECTION_ID =
  'UAPA_PACA_KNOWLEDGE_ATLAS_PROJECTION_V2'

export const PACA_KNOWLEDGE_UPSTREAM_REPOSITORY = 'jbermejovega/sigilbook' as const
export const PACA_KNOWLEDGE_UPSTREAM_COMMIT =
  '520eb8bf656aea59d860627e2b3d5304089865e0' as const
export const PACA_KNOWLEDGE_UPSTREAM_PULL_REQUEST = 252 as const
export const PACA_KNOWLEDGE_THEORY_AUTHOR = 'Jara Juana Bermejo Vega / JJBV' as const

export type PacaKnowledgeSurface =
  | 'sigilbook'
  | 'pacainvestiga'
  | 'pacaricerca'
  | 'pacapaper'
  | 'pacanotebook'
  | 'pacapedia'
  | 'skaffold'
  | 'knowledge_weave'
  | 'pacadex'
  | 'pacaterminal'
  | 'pacaclock'
  | 'pacaclick'
  | 'click42'
  | 'pacanorma'
  | 'sigil_glue'

export type JaranianKnowledgeGenerator =
  | 'JARANIAN::Branch'
  | 'JARANIAN::Skaffold'
  | 'JARANIAN::Weave'
  | 'JARANIAN::Index'
  | 'JARANIAN::ProjectTerminal'
  | 'JARANIAN::Clock'
  | 'JARANIAN::Click'
  | 'JARANIAN::Kink42'
  | 'JARANIAN::Normalize'
  | 'JARANIAN::Glue'

export type PacaKnowledgeProjectionBlockReason =
  | 'upstream_repository_mismatch'
  | 'upstream_commit_mismatch'
  | 'upstream_pull_request_mismatch'
  | 'surface_cover_incomplete'
  | 'surface_cover_duplicated'
  | 'generator_cover_incomplete'
  | 'generator_cover_duplicated'
  | 'human_review_missing'
  | 'autonomous_click42_claimed'
  | 'theory_authorship_mismatch'
  | 'artistic_rights_not_acknowledged'

export interface PacaKnowledgeAtlasProjectionInput {
  upstreamRepository: string
  upstreamCommit: string
  upstreamPullRequest: number
  humanReview: boolean
  artisticRightsAcknowledged: boolean
  autonomousClick42Claimed?: boolean
  theoryAuthor?: string
  surfaces?: readonly PacaKnowledgeSurface[]
  generators?: readonly JaranianKnowledgeGenerator[]
}

export interface PacaKnowledgeAtlasProjection {
  id: typeof UAPA_PACA_KNOWLEDGE_ATLAS_PROJECTION_ID
  accepted: boolean
  blockReasons: PacaKnowledgeProjectionBlockReason[]
  source: {
    repository: typeof PACA_KNOWLEDGE_UPSTREAM_REPOSITORY
    commit: typeof PACA_KNOWLEDGE_UPSTREAM_COMMIT
    pullRequest: typeof PACA_KNOWLEDGE_UPSTREAM_PULL_REQUEST
    authority: 'canonical-upstream'
    resources: ['sigil://knowledge/paca-weave/v2', 'sigil://rag/paca-weave/v2']
  }
  atlas: {
    role: 'downstream-artistic-and-typed-projection'
    surfaces: PacaKnowledgeSurface[]
    generators: JaranianKnowledgeGenerator[]
    localIdentityPreserved: true
    obstructionVisible: true
    parentContainment: 'pacanotebook-inside-pacapaper'
  }
  ragMcp: {
    ragAuthority: 'retrieval-only'
    mcpAuthority: 'bounded-tools-only'
    repositoryMutation: false
    click42: {
      mode: 'human-confirmed-plan-only'
      autonomous: false
      mutatesRepository: false
      singleUse: true
    }
    pacaNormaRequiredBeforeGlue: true
  }
  gitNormalization: {
    branchLaw: 'local-typed-sector-over-current-main'
    rebaseLaw: 'base-change-preserves-patch-semantics'
    squashLaw: 'reviewed-normal-form-one-persistence-witness'
    mergeLaw: 'canonical-admission-after-green-checks'
  }
  authorship: {
    theoryAuthor: typeof PACA_KNOWLEDGE_THEORY_AUTHOR
    artisticRights: 'all-rights-reserved-unless-explicit-artistic-license'
    softwareLicensesUnchanged: true
    toolAuthorshipAuthority: 'none'
  }
  claimBoundary: {
    internalArchitectureValidated: boolean
    upstreamIdentityReplaced: false
    empiricalRealizationProved: false
    autonomousAgencyProved: false
    deploymentPerformed: false
  }
}

export const PACA_KNOWLEDGE_SURFACES = [
  'sigilbook',
  'pacainvestiga',
  'pacaricerca',
  'pacapaper',
  'pacanotebook',
  'pacapedia',
  'skaffold',
  'knowledge_weave',
  'pacadex',
  'pacaterminal',
  'pacaclock',
  'pacaclick',
  'click42',
  'pacanorma',
  'sigil_glue',
] as const satisfies readonly PacaKnowledgeSurface[]

export const JARANIAN_KNOWLEDGE_GENERATORS = [
  'JARANIAN::Branch',
  'JARANIAN::Skaffold',
  'JARANIAN::Weave',
  'JARANIAN::Index',
  'JARANIAN::ProjectTerminal',
  'JARANIAN::Clock',
  'JARANIAN::Click',
  'JARANIAN::Kink42',
  'JARANIAN::Normalize',
  'JARANIAN::Glue',
] as const satisfies readonly JaranianKnowledgeGenerator[]

function isCompleteCover<T extends string>(actual: readonly T[], expected: readonly T[]): boolean {
  const actualSet = new Set(actual)
  return actual.length === expected.length && actualSet.size === actual.length && expected.every((item) => actualSet.has(item))
}

function hasDuplicates<T extends string>(values: readonly T[]): boolean {
  return new Set(values).size !== values.length
}

function buildBlockReasons(
  input: PacaKnowledgeAtlasProjectionInput,
  surfaces: readonly PacaKnowledgeSurface[],
  generators: readonly JaranianKnowledgeGenerator[],
): PacaKnowledgeProjectionBlockReason[] {
  const reasons: PacaKnowledgeProjectionBlockReason[] = []

  if (input.upstreamRepository !== PACA_KNOWLEDGE_UPSTREAM_REPOSITORY) {
    reasons.push('upstream_repository_mismatch')
  }
  if (input.upstreamCommit !== PACA_KNOWLEDGE_UPSTREAM_COMMIT) {
    reasons.push('upstream_commit_mismatch')
  }
  if (input.upstreamPullRequest !== PACA_KNOWLEDGE_UPSTREAM_PULL_REQUEST) {
    reasons.push('upstream_pull_request_mismatch')
  }
  if (hasDuplicates(surfaces)) {
    reasons.push('surface_cover_duplicated')
  }
  if (!isCompleteCover(surfaces, PACA_KNOWLEDGE_SURFACES)) {
    reasons.push('surface_cover_incomplete')
  }
  if (hasDuplicates(generators)) {
    reasons.push('generator_cover_duplicated')
  }
  if (!isCompleteCover(generators, JARANIAN_KNOWLEDGE_GENERATORS)) {
    reasons.push('generator_cover_incomplete')
  }
  if (!input.humanReview) {
    reasons.push('human_review_missing')
  }
  if (input.autonomousClick42Claimed === true) {
    reasons.push('autonomous_click42_claimed')
  }
  if ((input.theoryAuthor ?? PACA_KNOWLEDGE_THEORY_AUTHOR) !== PACA_KNOWLEDGE_THEORY_AUTHOR) {
    reasons.push('theory_authorship_mismatch')
  }
  if (!input.artisticRightsAcknowledged) {
    reasons.push('artistic_rights_not_acknowledged')
  }

  return reasons
}

export function buildPacaKnowledgeAtlasProjection(
  input: PacaKnowledgeAtlasProjectionInput,
): PacaKnowledgeAtlasProjection {
  const surfaces = [...(input.surfaces ?? PACA_KNOWLEDGE_SURFACES)]
  const generators = [...(input.generators ?? JARANIAN_KNOWLEDGE_GENERATORS)]
  const blockReasons = buildBlockReasons(input, surfaces, generators)
  const accepted = blockReasons.length === 0

  return {
    id: UAPA_PACA_KNOWLEDGE_ATLAS_PROJECTION_ID,
    accepted,
    blockReasons,
    source: {
      repository: PACA_KNOWLEDGE_UPSTREAM_REPOSITORY,
      commit: PACA_KNOWLEDGE_UPSTREAM_COMMIT,
      pullRequest: PACA_KNOWLEDGE_UPSTREAM_PULL_REQUEST,
      authority: 'canonical-upstream',
      resources: ['sigil://knowledge/paca-weave/v2', 'sigil://rag/paca-weave/v2'],
    },
    atlas: {
      role: 'downstream-artistic-and-typed-projection',
      surfaces,
      generators,
      localIdentityPreserved: true,
      obstructionVisible: true,
      parentContainment: 'pacanotebook-inside-pacapaper',
    },
    ragMcp: {
      ragAuthority: 'retrieval-only',
      mcpAuthority: 'bounded-tools-only',
      repositoryMutation: false,
      click42: {
        mode: 'human-confirmed-plan-only',
        autonomous: false,
        mutatesRepository: false,
        singleUse: true,
      },
      pacaNormaRequiredBeforeGlue: true,
    },
    gitNormalization: {
      branchLaw: 'local-typed-sector-over-current-main',
      rebaseLaw: 'base-change-preserves-patch-semantics',
      squashLaw: 'reviewed-normal-form-one-persistence-witness',
      mergeLaw: 'canonical-admission-after-green-checks',
    },
    authorship: {
      theoryAuthor: PACA_KNOWLEDGE_THEORY_AUTHOR,
      artisticRights: 'all-rights-reserved-unless-explicit-artistic-license',
      softwareLicensesUnchanged: true,
      toolAuthorshipAuthority: 'none',
    },
    claimBoundary: {
      internalArchitectureValidated: accepted,
      upstreamIdentityReplaced: false,
      empiricalRealizationProved: false,
      autonomousAgencyProved: false,
      deploymentPerformed: false,
    },
  }
}

export function buildCanonicalPacaKnowledgeAtlasProjection(): PacaKnowledgeAtlasProjection {
  return buildPacaKnowledgeAtlasProjection({
    upstreamRepository: PACA_KNOWLEDGE_UPSTREAM_REPOSITORY,
    upstreamCommit: PACA_KNOWLEDGE_UPSTREAM_COMMIT,
    upstreamPullRequest: PACA_KNOWLEDGE_UPSTREAM_PULL_REQUEST,
    humanReview: true,
    artisticRightsAcknowledged: true,
    autonomousClick42Claimed: false,
    theoryAuthor: PACA_KNOWLEDGE_THEORY_AUTHOR,
  })
}
