import { describe, expect, it } from 'vitest'

import {
  JARANIAN_KNOWLEDGE_GENERATORS,
  PACA_KNOWLEDGE_SURFACES,
  PACA_KNOWLEDGE_UPSTREAM_COMMIT,
  PACA_KNOWLEDGE_UPSTREAM_PULL_REQUEST,
  PACA_KNOWLEDGE_UPSTREAM_REPOSITORY,
  UAPA_PACA_KNOWLEDGE_ATLAS_PROJECTION_ID,
  buildCanonicalPacaKnowledgeAtlasProjection,
  buildPacaKnowledgeAtlasProjection,
} from '../src/index.js'

describe('buildPacaKnowledgeAtlasProjection', () => {
  it('accepts the reviewed SIGILBOOK executable weave as a downstream atlas projection', () => {
    const projection = buildCanonicalPacaKnowledgeAtlasProjection()

    expect(projection.id).toBe(UAPA_PACA_KNOWLEDGE_ATLAS_PROJECTION_ID)
    expect(projection.accepted).toBe(true)
    expect(projection.blockReasons).toEqual([])
    expect(projection.source).toMatchObject({
      repository: PACA_KNOWLEDGE_UPSTREAM_REPOSITORY,
      commit: PACA_KNOWLEDGE_UPSTREAM_COMMIT,
      pullRequest: PACA_KNOWLEDGE_UPSTREAM_PULL_REQUEST,
      authority: 'canonical-upstream',
    })
    expect(projection.atlas.surfaces).toHaveLength(15)
    expect(projection.atlas.generators).toHaveLength(10)
    expect(projection.atlas.parentContainment).toBe('pacanotebook-inside-pacapaper')
    expect(projection.ragMcp.click42).toEqual({
      mode: 'human-confirmed-plan-only',
      autonomous: false,
      mutatesRepository: false,
      singleUse: true,
    })
    expect(projection.claimBoundary).toMatchObject({
      internalArchitectureValidated: true,
      upstreamIdentityReplaced: false,
      empiricalRealizationProved: false,
      autonomousAgencyProved: false,
      deploymentPerformed: false,
    })
  })

  it('rejects a stale upstream pin and a missing human review witness', () => {
    const projection = buildPacaKnowledgeAtlasProjection({
      upstreamRepository: PACA_KNOWLEDGE_UPSTREAM_REPOSITORY,
      upstreamCommit: 'stale-commit',
      upstreamPullRequest: PACA_KNOWLEDGE_UPSTREAM_PULL_REQUEST,
      humanReview: false,
      artisticRightsAcknowledged: true,
    })

    expect(projection.accepted).toBe(false)
    expect(projection.blockReasons).toContain('upstream_commit_mismatch')
    expect(projection.blockReasons).toContain('human_review_missing')
  })

  it('rejects incomplete covers, duplicate sectors, autonomous Click42, and rights collapse', () => {
    const projection = buildPacaKnowledgeAtlasProjection({
      upstreamRepository: PACA_KNOWLEDGE_UPSTREAM_REPOSITORY,
      upstreamCommit: PACA_KNOWLEDGE_UPSTREAM_COMMIT,
      upstreamPullRequest: PACA_KNOWLEDGE_UPSTREAM_PULL_REQUEST,
      humanReview: true,
      artisticRightsAcknowledged: false,
      autonomousClick42Claimed: true,
      surfaces: [...PACA_KNOWLEDGE_SURFACES.slice(0, -1), 'pacaclick'],
      generators: [...JARANIAN_KNOWLEDGE_GENERATORS.slice(0, -1), 'JARANIAN::Click'],
    })

    expect(projection.accepted).toBe(false)
    expect(projection.blockReasons).toEqual(
      expect.arrayContaining([
        'surface_cover_duplicated',
        'surface_cover_incomplete',
        'generator_cover_duplicated',
        'generator_cover_incomplete',
        'autonomous_click42_claimed',
        'artistic_rights_not_acknowledged',
      ]),
    )
  })
})
