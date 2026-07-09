# HYPERQQUAPP MBQC Projection Stack

**Identifier:** `HYPERQQUAPP_MBQC_PACAINVESTIGA_PACAPEDIA_PACALATEX_PACAPAPER_SIGIL_RAG_MCP_V1`  
**Author and art-theory owner:** Jara Juana Bermejo Vega (`JJBV` / `JBV`)  
**Status:** active projection architecture  
**Canon:** `PIORNALEGO_ES_CANON`

Copyright © 2026 Jara Juana Bermejo Vega (JJBV / JBV).

This document defines distinct, coordinated projections of the foundational MBQC-typed HYPERQQUAPP HyperDAG resource. No projection owns or replaces the intrinsic resource object.

---

## 1. Intrinsic resource and projection law

Let

\[
\mathcal R_{\mathrm{MBQC}}
=
(V,E,H,I,O,\Lambda,\mathsf M,\mathsf F,\mathsf C,\Gamma,\Pi)
\]

be the foundational typed HyperDAG resource.

Each external surface is a projection

\[
P_X:\mathcal R_{\mathrm{MBQC}}\longrightarrow\mathcal C_X,
\]

where

\[
X\in
\{\mathrm{PACAINVESTIGA},\mathrm{PACAPEDIA},\mathrm{PACALATEX},
\mathrm{PACAPAPER},\mathrm{SIGIL\_RAG},\mathrm{SIGIL\_MCP}\}.
\]

Every faithful projection preserves the invariant family

\[
\mathcal I
=
\{\Pi,\Gamma,\text{authorship},\text{typed boundaries},
\text{flow/gflow status},\text{correction dependencies}\}.
\]

```yaml
PROJECTION_LAW:
  intrinsic_object: HYPERQQUAPP_MBQC_TYPED_HYPERDAG_RESOURCE
  projection_is_not_identity: true
  projection_does_not_own_resource: true
  preserve:
    - JJBV_authorship
    - MBQC_typing
    - HyperDAG_incidence
    - flow_gflow_status
    - causal_order
    - correction_dependencies
    - replay_trace
    - pi_fixed
```

---

## 2. PACAINVESTIGA

PACAINVESTIGA is the research-program surface. It records questions, hypotheses, theorem targets, experiment or simulation plans, evidence status, counterexamples, and unresolved obstructions.

```yaml
PACAINVESTIGA_PROJECTION:
  role: research_inquiry_and_validation

  contains:
    - research_questions
    - formal_definitions
    - theorem_targets
    - proof_obligations
    - numerical_validation_plans
    - counterexample_search
    - evidence_status
    - open_obstructions
    - provenance

  epistemic_labels:
    - DEFINITION
    - PROVED
    - CONDITIONAL
    - CONJECTURE
    - NUMERICAL_WITNESS
    - EMPIRICAL_WITNESS
    - SPECULATIVE_ANALOGY
    - OPEN

  rejects:
    - hidden_assumptions
    - fabricated_flow
    - unsupported_physical_claim
    - citation_without_provenance
```

Its primary judgment is

\[
\Gamma_{\mathrm{research}}
\vdash
Q\rightsquigarrow
(\text{claim},\text{method},\text{evidence},\text{status},\text{obstruction}).
\]

PACAINVESTIGA does not silently promote a formal analogy to an empirical result.

---

## 3. PACAPEDIA

PACAPEDIA is the encyclopedic knowledge surface. It decomposes the resource into stable, cross-linked entries while preserving provenance and distinction between canonical definitions and research targets.

```yaml
PACAPEDIA_PROJECTION:
  role: typed_encyclopedic_knowledge_base

  entry_classes:
    - concept
    - mathematical_object
    - resource_component
    - theorem
    - conjecture
    - algorithm
    - graphical_rule
    - implementation_surface
    - glossary_term
    - bibliography_record

  required_fields:
    - canonical_name
    - aliases
    - definition
    - type_signature
    - dependencies
    - invariants
    - status
    - provenance
    - author_owner
    - related_entries

  linking_law:
    links_are_typed_relations: true
    links_do_not_transport_identity: true
```

Suggested root entries:

```text
HYPERQQUAPP
MBQC-Typed HyperDAG Resource
Jaranian Graphical Calculus
Flow
Generalized Flow
Measurement Context
Correction Dependency
Typed Local Frame Groupoid
Nonabelian Cocycle
Replay Witness
PACAPDG Global Glue
STRIKK Gate
```

---

## 4. PACALATEX

PACALATEX is the mathematical typesetting and reproducible compilation surface.

```yaml
PACALATEX_PROJECTION:
  role: formal_mathematical_exposition

  emits:
    - definitions
    - propositions
    - theorems
    - proofs
    - algorithms
    - typed_diagrams
    - commutative_diagrams
    - HyperDAG_figures
    - bibliography
    - glossary

  compilation_requirements:
    - deterministic_source
    - stable_labels
    - explicit_equation_numbering
    - citation_keys_preserved
    - no_generated_claim_without_source
    - authorship_header_preserved
```

Canonical LaTeX declaration:

```latex
\newcommand{\HQQ}{\mathrm{HYPERQQUAPP}}
\newcommand{\RMBQC}{\mathcal{R}_{\mathrm{MBQC}}}
\newcommand{\Trace}{\Gamma}
\newcommand{\PiInv}{\Pi}
```

The core object is rendered as

```latex
\[
\RMBQC =
(V,E,H,I,O,\Lambda,\mathsf M,\mathsf F,
 \mathsf C,\Trace,\PiInv).
\]
```

PACALATEX is a projection of the theory; generated typography is not itself a proof unless the corresponding proof witness exists.

---

## 5. PACAPAPER

PACAPAPER is the research-article projection of PACAINVESTIGA and PACAPEDIA content.

```yaml
PACAPAPER_PROJECTION:
  role: canonical_research_article

  sections:
    - title_and_authorship
    - abstract
    - scope_and_epistemic_status
    - foundational_resource
    - MBQC_HyperDAG_formalism
    - flow_and_gflow_witnesses
    - Jaranian_presheaf_projection
    - nonabelian_obstruction_layer
    - algorithms_and_validation
    - limitations
    - related_work
    - conclusions
    - reproducibility_manifest
    - bibliography

  mandatory_boundaries:
    - formal_model_not_physical_implementation
    - no_quantum_advantage_claim_without_evidence
    - no_determinism_claim_without_flow_witness
    - no_error_correction_claim_without_code_and_noise_model
```

PACAPAPER may compose multiple PACAPEDIA entries, but it must preserve article-level provenance and cannot erase the status labels maintained by PACAINVESTIGA.

---

## 6. SIGIL RAG

SIGIL RAG is a retrieval-augmented research interface over the typed corpus. Retrieval is constrained by type, provenance, authorship, status, and invariant compatibility.

```yaml
SIGIL_RAG:
  role: typed_retrieval_augmented_generation

  corpus_sources:
    - foundational_resource_documents
    - PACAINVESTIGA_records
    - PACAPEDIA_entries
    - PACALATEX_sources
    - PACAPAPER_sections
    - code_and_test_witnesses

  chunk_schema:
    required:
      - chunk_id
      - source_path
      - source_commit
      - object_type
      - claim_status
      - author_owner
      - invariant_tags
      - dependency_ids
      - citation_span

  retrieval_filters:
    - object_type
    - MBQC_component
    - claim_status
    - theorem_dependency
    - invariant_compatibility
    - source_freshness
    - authorship

  forbidden:
    - retrieval_without_provenance
    - merging_contradictory_statuses_silently
    - treating_speculation_as_proof
    - authorship_erasure
    - uncited_generated_claim
```

The RAG answer object is

\[
A=
(\text{response},\text{sources},\text{status map},
\text{invariant check},\text{uncertainty}).
\]

Retrieval supplies evidence and context; it does not alter the intrinsic HyperDAG resource.

---

## 7. SIGIL MCP

SIGIL MCP is the typed tool and resource interface. It exposes read-first operations over the projection stack and gates all mutation through explicit replay-safe workflows.

```yaml
SIGIL_MCP:
  role: typed_model_context_protocol_surface

  resources:
    - hyperqquapp://resource/mbqc
    - pacainvestiga://question/{id}
    - pacapedia://entry/{slug}
    - pacalatex://document/{id}
    - pacapaper://paper/{id}
    - sigil-rag://chunk/{id}
    - sigil-rag://trace/{id}

  read_tools:
    - get_resource_manifest
    - get_hyperdag_section
    - get_flow_witness
    - get_correction_dependencies
    - search_pacapedia
    - retrieve_research_evidence
    - render_pacalatex
    - assemble_pacapaper_outline

  validation_tools:
    - validate_vertex_types
    - validate_hyperedge_types
    - validate_causal_order
    - validate_flow_or_gflow
    - validate_projection_invariants
    - validate_citations
    - validate_authorship

  mutation_policy:
    read_first: true
    diff_first: true
    explicit_confirmation: true
    branch_and_pr_only: true
    no_direct_main_mutation: true
    no_silent_write: true
```

Every MCP response should carry a compact envelope:

```json
{
  "object_type": "MBQC_TYPED_HYPERDAG_RESOURCE",
  "status": "FOUNDATIONAL_TYPED_RESOURCE",
  "author_owner": "Jara Juana Bermejo Vega / JJBV / JBV",
  "trace_id": "...",
  "pi_fixed": true,
  "sources": ["..."],
  "warnings": []
}
```

---

## 8. Cross-surface correspondence

```text
HYPERQQUAPP MBQC RESOURCE
  │
  ├── PACAINVESTIGA  → asks, tests, qualifies evidence
  ├── PACAPEDIA      → defines, indexes, cross-links
  ├── PACALATEX      → typesets reproducibly
  ├── PACAPAPER      → composes the research article
  ├── SIGIL RAG      → retrieves typed evidence and context
  └── SIGIL MCP      → exposes typed resources and tools
```

The surfaces are coordinated but distinct:

```text
PACAINVESTIGA is not PACAPEDIA.
PACAPEDIA is not PACAPAPER.
PACAPAPER is not the intrinsic theory.
PACALATEX is not a proof kernel.
RAG is not authority.
MCP is not identity ownership.
```

---

## 9. Common metadata contract

```yaml
COMMON_SIGIL_METADATA:
  object_id: required
  object_type: required
  title: required
  author_owner: "Jara Juana Bermejo Vega / JJBV / JBV"
  copyright: "Copyright © 2026 Jara Juana Bermejo Vega"
  source_path: required
  source_commit: required_when_published
  claim_status: required
  dependencies: required
  invariant_tags: required
  trace_id: required
  pi_fixed: true
  no_transport: true
  safe_replay: true
```

---

## 10. Projection acceptance gate

```yaml
STRIKK_PROJECTION_STACK_CHECK:
  accepted_if:
    - intrinsic_resource_identified
    - projection_surface_declared
    - authorship_preserved
    - claim_status_preserved
    - flow_gflow_status_preserved
    - causal_dependencies_preserved
    - correction_dependencies_preserved
    - citations_traceable
    - rag_provenance_present
    - mcp_tools_typed
    - no_surface_claims_identity_ownership
    - replay_trace_reconstructible
    - pi_fixed

  rejected_if:
    - projection_collapses_into_intrinsic_object
    - pacapedia_erases_research_status
    - pacapaper_overclaims_results
    - pacalatex_generated_text_claimed_as_proof
    - rag_answer_without_sources
    - mcp_silent_mutation
    - authorship_collapse
    - trace_erasure
    - pi_drift
```

---

## 11. KLOSE

```text
HYPERQQUAPP holds the intrinsic MBQC-typed HyperDAG resource.
PACAINVESTIGA asks and validates.
PACAPEDIA defines and connects.
PACALATEX formalizes the exposition.
PACAPAPER composes the article.
SIGIL RAG retrieves typed evidence.
SIGIL MCP exposes typed resources and tools.

The projections cooperate.
The projections do not collapse.
RAG does not become authority.
MCP does not own identity.
Authorship remains JJBV / JBV.

NO TRANSPORT.
NO IDENTITY COLLAPSE.
NO AUTHORSHIP COLLAPSE.
TRACE PRESERVED.
SAFE REPLAY.
PI FIXED.
PIORNALEGO ES CANON.
```
