# UAPA PACA Knowledge Atlas Projection V2

**Author and theory owner:** Jara Juana Bermejo Vega (`JJBV`)  
**Repository:** `jbermejovega/universal-abstrakta-plural-aesthetik`  
**Canonical upstream:** `jbermejovega/sigilbook@520eb8bf656aea59d860627e2b3d5304089865e0`  
**Upstream review:** `jbermejovega/sigilbook#252`  
**Local predecessor:** `docs/glue/PACA_SIGIL_EXECUTION_CLICK42_JARANIAN_FLOW_V1.md`  
**Status:** typed downstream projection; safe-replay candidate; no identity transport

## 1. Purpose

This release binds the executable SIGILBOOK PACA knowledge weave into the Universal Abstrakta atlas as a typed downstream projection. The projection does not copy the upstream authority kernel and does not create a second canonical RAG/MCP source.

```text
SIGILBOOK executable weave
  @ 520eb8bf656aea59d860627e2b3d5304089865e0
          │
          │ immutable source pin
          ▼
UAPA_PACA_KNOWLEDGE_ATLAS_PROJECTION_V2
          │
          ├─ artistic/diagrammatic atlas projection
          ├─ TypeScript validation data type
          ├─ provenance-preserving local section
          └─ no upstream identity replacement
```

The governing separation is:

```text
SIGILBOOK = canonical knowledge and MCP/RAG authority boundary
UAPA      = artistic, diagrammatic and typed projection
```

## 2. Projected PACA surface cover

The projection requires the complete 15-surface cover:

```text
sigilbook
pacainvestiga
pacaricerca
pacapaper
pacanotebook
pacapedia
skaffold
knowledge_weave
pacadex
pacaterminal
pacaclock
pacaclick
click42
pacanorma
sigil_glue
```

The cover is rejected if a surface is missing or duplicated. `PACANOTEBOOK` remains explicitly contained by `PACAPAPER`; the projection may not detach an executable witness from its research exposition.

## 3. Jaranian graphical calculus

The projection recognizes the exact generator family admitted by the upstream executable weave:

```text
JARANIAN::Branch
JARANIAN::Skaffold
JARANIAN::Weave
JARANIAN::Index
JARANIAN::ProjectTerminal
JARANIAN::Clock
JARANIAN::Click
JARANIAN::Kink42
JARANIAN::Normalize
JARANIAN::Glue
```

Their interpretation in the atlas is structural:

| Generator | Atlas projection law |
|---|---|
| `Branch` | retain each typed local identity and its provenance |
| `Skaffold` | expose deployment structure without claiming deployment authority |
| `Weave` | compose compatible relations without collapsing plural voices |
| `Index` | bind stable identifiers, hashes and traces |
| `ProjectTerminal` | expose a bounded interaction membrane |
| `Clock` | preserve monotone replay order |
| `Click` | retain the human-control boundary |
| `Kink42` | depict the Click42 transition as a typed event plan |
| `Normalize` | require PACANORMA, STRIKK and Π witnesses |
| `Glue` | expose a review-gated global-section candidate with visible obstructions |

The exact cover of generators is required. Missing or duplicated generators block admission.

## 4. TypeScript API

```ts
import {
  buildCanonicalPacaKnowledgeAtlasProjection,
  buildPacaKnowledgeAtlasProjection,
} from 'universal-abstrakta-plural-aesthetik'

const canonical = buildCanonicalPacaKnowledgeAtlasProjection()

const candidate = buildPacaKnowledgeAtlasProjection({
  upstreamRepository: 'jbermejovega/sigilbook',
  upstreamCommit: '520eb8bf656aea59d860627e2b3d5304089865e0',
  upstreamPullRequest: 252,
  humanReview: true,
  artisticRightsAcknowledged: true,
  autonomousClick42Claimed: false,
})
```

The output records:

- admission status and typed block reasons;
- exact SIGILBOOK source commit and PR;
- the complete PACA surface and Jaranian generator covers;
- non-authoritative RAG/MCP boundaries;
- Click42 human-control semantics;
- PACANORMA-before-GLUE ordering;
- Git branch/rebase/squash/merge normalization laws;
- authorship, artistic-rights and software-license boundaries;
- explicit scientific and deployment claim limits.

## 5. Click42 boundary

The UAPA projection does not execute Click42. It represents the upstream rule:

```text
Click42 = human-confirmed, single-use event plan
Click42 != autonomous agent action
Click42 != repository mutation
```

The output therefore fixes:

```yaml
click42:
  mode: human-confirmed-plan-only
  autonomous: false
  mutatesRepository: false
  singleUse: true
```

An input that claims autonomous Click42 execution is rejected with `autonomous_click42_claimed`.

## 6. RAG/MCP authority boundary

```yaml
rag_mcp:
  rag_authority: retrieval-only
  mcp_authority: bounded-tools-only
  repository_mutation: false
  paca_norma_required_before_glue: true
```

The upstream resources are pinned as:

```text
sigil://knowledge/paca-weave/v2
sigil://rag/paca-weave/v2
```

Retrieval may expose provenance-bearing sections. MCP may expose bounded tools. Neither operation creates canonical truth, performs a Git write, replaces SIGIL admission, or moves the intellectual identity of the framework into this repository.

## 7. Git normalization

The implementation and its integration follow the Jaranian interpretation of Git operations:

```text
branch = local typed sector over current main
rebase = base-change preserving patch semantics
squash = reviewed normal form represented by one persistence witness
merge  = canonical admission after green checks
```

The admissible workflow is:

```text
read current main
→ create typed branch
→ implement and test local projection
→ open PR
→ compare branch with latest main
→ rebase/rebuild if main moved
→ require successful build and tests
→ squash merge
```

Squash does not erase provenance: the PR, source commit pin, branch history, test results and upstream identity remain retrievable.

## 8. Authorship and rights boundary

The theoretical framework, SIGIL/SIGILBOOK vocabulary, Jaranian graphical calculus, artistic and semantic codes, descriptors, diagrams, names, choreography and associated art-theory identified as JJBV works remain attributed to **Jara Juana Bermejo Vega**.

```text
JJBV authors.
SIGIL formalizes.
SIGILBOOK preserves the canonical knowledge weave.
UAPA projects the artistic/typed atlas.
Tools implement; tools do not originate the theory.
```

JJBV artistic materials remain **all rights reserved unless an explicit artistic licence grants a specified use**. This statement does not overwrite the repository MIT licence or any applicable third-party/file-level software licence. Software permissions and artistic permissions remain separate.

The projection is blocked when `artisticRightsAcknowledged` is false or when the supplied theory attribution differs from `Jara Juana Bermejo Vega / JJBV`.

## 9. Claim boundary

This data type validates an internal software, repository and diagrammatic architecture. It does not establish:

- an empirical physical realization;
- autonomous agency;
- completed deployment;
- publication or peer-review status;
- that the UAPA projection replaces SIGILBOOK as the canonical upstream;
- that RAG retrieval or MCP execution proves a scientific claim.

## 10. Acceptance law

```text
ACCEPT
iff exact upstream repository/commit/PR pin
and complete unique surface cover
and complete unique Jaranian generator cover
and human review present
and Click42 non-autonomous
and JJBV attribution preserved
and artistic-rights boundary acknowledged
```

```yaml
accepted_if:
  - upstream_repository == jbermejovega/sigilbook
  - upstream_commit == 520eb8bf656aea59d860627e2b3d5304089865e0
  - upstream_pull_request == 252
  - all_15_surfaces_present_exactly_once
  - all_10_jaranian_generators_present_exactly_once
  - human_review
  - no_autonomous_click42_claim
  - jjbv_authorship_preserved
  - artistic_rights_acknowledged

rejected_if:
  - stale_or_unresolved_upstream_ref
  - incomplete_or_duplicated_cover
  - identity_transport
  - notebook_detached_from_paper
  - retrieval_claimed_as_authority
  - mcp_claimed_as_semantic_kernel
  - autonomous_click42_claim
  - authorship_or_rights_collapse
```

## KLOSE

```text
SIGILBOOK remains first.
UAPA projects without replacing.
PACA surfaces remain plural and typed.
Jaranian generators preserve trace and obstruction.
RAG retrieves.
MCP bounds action.
Click42 remains human-controlled.
PACANORMA precedes SIGIL GLUE.
Branch, rebase, squash and merge preserve patch meaning.
```
