export type ColorPairRole =
  | 'normalText'
  | 'largeText'
  | 'uiComponent'
  | 'focusIndicator'
  | 'graphic'
  | 'status'

export interface ColorPairPolicyInput {
  id: string
  role: ColorPairRole
  foreground: string
  background: string
  hasNonColorCue?: boolean
}

export interface AccessibilityProfilePolicy {
  normalTextMinContrast: number
  largeTextMinContrast: number
  uiComponentMinContrast: number
  focusIndicatorMinContrast: number
  graphicMinContrast: number
  statusMinContrast: number
  statusRequiresNonColorCue: boolean
  tokenOnlyColorRecommended: boolean
}

export interface AccessibilityProfileCriterion {
  id: string
  name: string
  requirement: string
}

export interface AccessibilityProfile {
  id: string
  name: string
  description: string
  baseline: readonly string[]
  policy: AccessibilityProfilePolicy
  criteria: readonly AccessibilityProfileCriterion[]
}

export type ProfileValidationSeverity = 'fail' | 'warn'

export interface ProfileValidationIssue {
  ruleId: string
  severity: ProfileValidationSeverity
  pairId?: string
  message: string
}

export interface ProfileValidationReport {
  profileId: string
  allPass: boolean
  issues: ProfileValidationIssue[]
}
