# PACA · Cross-repository release standard V1

**Policy ID:** `PACA_CROSS_REPOSITORY_RELEASE_STANDARD_V1`  
**Decision:** `HOLD_PUBLIC_RELEASE` until a specific repository, commit, and artifact pass the gates.  
**Status:** Governance proposal; not a claim that all repositories comply.

## Why

One public professional portfolio should demonstrate the expressive reach of the PACA/SIGIL toolchain without redistributing its private core, disguising third-party licenses, or treating a conceptual proof as an executed verification. A public GitHub repository is already readable; `HOLD` can prevent *new* authorized publication, tags, packages and deployments, not undo previous publication.

## Universal rule

```
HOLD is the default.
SOURCE != RELEASE
VISUALIZATION != PROOF
DEMO != KERNEL
LICENSE_SCOPE != REPOSITORY_IDENTITY
EXTERNAL_DEPENDENCY != ORIGINAL_AUTHORSHIP
IDENTITY != ROLE != CAPABILITY
PREVIEW != DEPLOYMENT
```

Every repository has one `registry/paca_release_gate_v1.json` or schema-compatible successor with explicit release state, inventory, dependencies, rights, protections and human approvals. No release is inferred from passing tests, a README badge, a draft PR or GitHub visibility.

## Required gates for *every* repository

1. **Identity / scope:** repository kind (private kernel, reusable OSS dependency, public portfolio, documentation, game or distributable). Exact branch, head SHA, target artifact and proposed audience.
2. **Title / license:** file-level rights ledger: author(s), ownership basis, derivative lineage, SPDX identifier when available, inbound/outbound compatibility, third-party notices, fonts/images/audio and model-generated asset provenance. Unknown is HOLD, never silently MIT/CC/ARR.
3. **Separation:** third-party OSS stays external or is distributed under its existing license; no private SIGILBOOK kernels, credentials, proprietary engines or internal artifacts enter the public showcase by implication. No false claim that MIT material has become proprietary.
4. **Privacy / consent:** no personal or sensitive data, unconsented likenesses, confidential content, tokens, telemetry without notice, or accidental tracking. Verify opt-in replay export.
5. **Accessibility:** keyboard, focus, reduced motion, alt/labels and actual contrast checks for published views; WCAG lint is evidence for specific checks, not certification of the complete interface.
6. **Technical QA:** reproducible clean build/tests, dependency and security audit, supply-chain/asset inventory, exact source SHA and artifact digest. Distinguish authored tests, locally executed tests and hosted checks.
7. **Review:** human review for copyright clearance, security/privacy, artistic presentation, factual claims and license compatibility. Never use automated PASS to impersonate legal approval.
8. **Publication gate:** permitted channels individually approved (GitHub Release, npm, Pages, downloadable game, PDF, Quarto, social promo). Rulesets and the publishing account must prevent bypass; this checker alone is not complete enforcement.
9. **Evidence:** preserve proof/check receipts, provenance and obstruction ledger. Append-only records. Unresolved blockers remain visible.

## Allowed states

`HOLD_PUBLIC_RELEASE` → `REVIEW_REQUIRED` → `READY_FOR_RELEASE` → `RELEASED`; any unverified material returns to HOLD. Transition to READY requires all evidence for **one exact artifact**, human authorization and a clean license inventory. Existing publication must be recorded as existing, not represented as unreleased.

## Repository roles

- Private canonical SIGILBOOK: internal contract, independent kernel, theory and source provenance; not automatically publishable.
- Public demonstration repository: minimal permitted client/projection; no core implementation copied.
- SIGIL RPG / MY ORB 42: offline browser prototype remains a release candidate, not an authorized external game deployment. No new release until provenance, age/content labeling, access and QA are reviewed.
- Third-party packages: preserved original names, authors, legal notices and separate dependency installation.

## The artistic frontier

`PACA ARTE / FOLK / PURPOSE` precedes formal projections in the editorial cover. The symbolic renormalization of motifs is an editorial operator, not a physical RG computation; the notion of exponential capability must be supported by reproducible complexity measurements before appearing as a performance claim. `FOLK IS NOT A TYPE` describes people and communities; software can type interfaces or depictions, never assign human rights.

## Current assessment

This repository has an existing root MIT license naming Ceci Olivera and a gallery of agent-produced demonstration HTML. Until a file-level audit separates preexisting permissive works from demonstrably original new portfolio works, there is **no blanket proprietary relicensing**. The current package version, `README`, `LICENSE` and third-party obligations remain as found.

## Operational guard

- Run `npm run policy:audit` to validate the local declaration and preserve HOLD.
- Run `npm run policy:release` before attempting a release; it must fail while HOLD.
- CI `policy-audit` may be made a required branch status check after a successful observed run.
- GitHub Rulesets and actual publishing credentials must still be configured by an authorized repository administrator.
