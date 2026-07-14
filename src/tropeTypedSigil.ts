export type TropeTypedSigil =
  | 'visual_trope'
  | 'sonic_trope'
  | 'narrative_trope'
  | 'choreographic_trope'

export interface TropeSigilInput {
  readonly trope: TropeTypedSigil
  readonly contextSha256: string
  readonly policySha256: string
  readonly branchWeights: readonly number[]
}

export interface TropeSigilResult {
  readonly accepted: boolean
  readonly normalizedWeights: readonly number[]
  readonly obstruction: string | null
}

const SHA256 = /^[a-f0-9]{64}$/

export function normalizeTropeSigil(
  input: TropeSigilInput,
): TropeSigilResult {
  if (
    !SHA256.test(input.contextSha256) ||
    !SHA256.test(input.policySha256)
  ) {
    return {
      accepted: false,
      normalizedWeights: [],
      obstruction: 'invalid_provenance_digest',
    }
  }

  if (
    input.branchWeights.length === 0 ||
    input.branchWeights.some(
      weight => !Number.isFinite(weight) || weight < 0,
    )
  ) {
    return {
      accepted: false,
      normalizedWeights: [],
      obstruction: 'invalid_branch_weights',
    }
  }

  const total = input.branchWeights.reduce(
    (sum, weight) => sum + weight,
    0,
  )

  if (total <= 0) {
    return {
      accepted: false,
      normalizedWeights: [],
      obstruction: 'zero_branch_measure',
    }
  }

  return {
    accepted: true,
    normalizedWeights: input.branchWeights.map(
      weight => weight / total,
    ),
    obstruction: null,
  }
}
