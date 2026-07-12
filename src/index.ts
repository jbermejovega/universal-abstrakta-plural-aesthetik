import { parseHex } from './math/color.js'
import { buildCompatibilityMatrix } from './algorithm/compatibility.js'
import { buildPalette } from './algorithm/palette.js'
import { toCSSTokens as _toCSSTokens } from './output/tokens.js'
import { buildPaletteUsage } from './output/usage.js'
import { validatePairings as _validatePairings, checkContrast as _checkContrast } from './output/validation.js'
import type { PaletteResult, Theme } from './types.js'

export function generatePalette(hex: string, theme: Theme): PaletteResult {
  const parsed = parseHex(hex)
  const palette = buildPalette(parsed, theme)
  const compatibility = buildCompatibilityMatrix(palette, theme)
  const usage = buildPaletteUsage(palette, compatibility, theme)
  return { palette, usage, theme, sourceColor: parsed }
}

export function toCSSTokens(result: PaletteResult, prefix?: string): string {
  return _toCSSTokens(result, prefix)
}

export const validatePairings = _validatePairings
export const checkContrast = _checkContrast

export { lintPluralSigil } from './sigil/plural-sigil.js'
export {
  JARANIAN_KNOWLEDGE_GENERATORS,
  PACA_KNOWLEDGE_SURFACES,
  PACA_KNOWLEDGE_THEORY_AUTHOR,
  PACA_KNOWLEDGE_UPSTREAM_COMMIT,
  PACA_KNOWLEDGE_UPSTREAM_PULL_REQUEST,
  PACA_KNOWLEDGE_UPSTREAM_REPOSITORY,
  UAPA_GRAPHICAL_CALCULUS_PRESHEAF_RELEASE_ID,
  UAPA_INVARIANT_SIGIL_RENORMALIZATION_FLOW_ID,
  UAPA_PACA_KNOWLEDGE_ATLAS_PROJECTION_ID,
  UAPA_SIGIL_ACCESSIBLE_PALETTE_LINTER_ID,
  buildCanonicalPacaKnowledgeAtlasProjection,
  buildGraphicalCalculusPresheafRelease,
  buildInvariantSigilRenormalizationFlow,
  buildPacaKnowledgeAtlasProjection,
  buildSigilPaletteFlow,
  lintAccessiblePalette,
} from './sigil/index.js'
export { cecicodeInspiredProfile } from './profile/cecicodeInspired.js'
export { validateProfileColorPairs } from './output/policyValidation.js'
export * from './jarras/index.js'

export type {
  PaletteResult,
  Palette,
  ShadeEntry,
  ContrastLevel,
  Theme,
  ShadeKey,
  MatrixKey,
  HexColor,
  CSSTokens,
  BackgroundKey,
  CompatiblePair,
  ShadeUsage,
  PaletteUsage,
  CompatibilityEntry,
  CompatibilityMatrix,
  PluralSigilStage,
  PluralSigilPrimitiveKind,
  PluralSigilRuntime,
  PluralSigilSeverity,
  PluralSigilIssueCode,
  PluralSigilPairingLevel,
  QquappTeleportationMethod,
  QquappEncoder,
  QquappDecoder,
  QecZooReference,
  QquappKokompiLibrary,
  PluralSigilPairing,
  PluralSigilInjection,
  PluralSigilInput,
  PluralSigilFlow,
  PluralSigilIssue,
  PluralSigilValidationPairing,
  PluralSigilValidation,
  PluralSigilPayload,
  PluralSigilPrimitive,
  PluralSigilAgentExposition,
  PluralSigilRelease,
  PluralSigilReport,
} from './types.js'

export type {
  SigilPaletteFlow,
  SigilPaletteLintInput,
  SigilPaletteLintResult,
  SigilPalettePairing,
  SigilPalettePdgWitness,
  SigilPaletteTheme,
  SigilPrimitive,
  ContextTensorRole,
  ContextTensorVariance,
  ContextTypedTensor,
  GeneralizedMeraLayer,
  InvariantSigilRenormalizationFlow,
  InvariantSigilRenormalizationInput,
  PacaPdgRenormalizationWitness,
  PluralTheorySource,
  RenormalizationColimit,
  RenormalizationGlueStage,
  TwistedInjectionWitness,
  AdapterReadiness,
  AdapterSurface,
  ComputationalCategoryBasis,
  GraphicalCalculusKind,
  GraphicalCalculusPresheafRelease,
  GraphicalCalculusPresheafReleaseInput,
  GraphicalCalculusSection,
  JaranianKnowledgeGenerator,
  MilestoneStatus,
  PacaKnowledgeAtlasProjection,
  PacaKnowledgeAtlasProjectionInput,
  PacaKnowledgeProjectionBlockReason,
  PacaKnowledgeSurface,
  PresheafOfSheavesWitness,
  PresheafReleaseDataType,
  PresheafReleaseMilestone,
  RagKnowledgeBaseWitness,
  ReleaseAdapterWitness,
  ReleaseBlockReason,
  SafeReplayDataTypeRelease,
} from './sigil/index.js'
export type {
  AccessibilityProfile,
  AccessibilityProfileCriterion,
  AccessibilityProfilePolicy,
  ColorPairPolicyInput,
  ColorPairRole,
  ProfileValidationIssue,
  ProfileValidationReport,
  ProfileValidationSeverity,
} from './profile/index.js'
export type { PairingLevel, PairingResult, ValidationReport, ContrastCheckResult } from './output/validation.js'
