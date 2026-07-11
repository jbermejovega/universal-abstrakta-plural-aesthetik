# QQUAPP_KOKOMPIWEAVER_PROVENANCE_GLUE_V1

Author-owner: **Jara Juana Bermejo Vega / JJBV**  
Status: `ACTIVE_TYPED_SCAFFOLD`  
Canon: `PIORNALEGO_ES_CANON`

## Scope

This repository develops an original JJBV graphical calculus and typed integration layer while preserving the provenance, license, authorship, and citation of every upstream component.

Work acknowledgement is non-negotiable.

## Upstream acknowledgement

`ceciCoding/accessible-color-palette` is an upstream project and inspiration source. Its code and authorship remain its own. This repository cites and consumes upstream work through published dependency interfaces and does not collapse upstream authorship into JJBV authorship.

JJBV authorship applies to original JJBV contributions, including the graphical calculus, PACAPDG/QQUAPP relations, HyperDAG models, documentation, diagrams, choreography-derived abstractions, adapters, and new code written in this repository, subject to file-level provenance and license declarations.

## Typed dependency law

```text
CeciCoding / accessible-color-palette
  → published dependency surface
  → typed adapter
  → UAPA local section
  → QQUAPP relation witness
  → KokompiWeaver normalization
  → JJBV graphical-calculus global candidate
```

The arrow means dependency, citation, or adaptation under license. It never means transfer of identity or authorship.

## CPython and PyPI boundary

CPython and PyPI are external ecosystem nodes.

Compatibility or publication may be claimed only after concrete witnesses exist:

- supported Python versions;
- package metadata;
- a Python build artifact;
- tests against declared interpreters;
- dependency and license metadata;
- reproducible build or release trace;
- explicit release approval.

Until those witnesses exist, references to CPython or PyPI are compatibility or roadmap metadata only.

## Provenance tuple

Every imported or adapted component must preserve:

```text
(author, project, source, license, version_or_commit, citation, integration_relation)
```

Every derived artifact must list its parents. Provenance accumulates through the HyperDAG and is never overwritten by a downstream author field.

## Kink normalization

Repository and dependency kinks are normalized through one of these explicit modes:

- exact inverse;
- gauge inverse;
- replay-equivalent inverse;
- compensating action;
- bounded obstruction.

No compensating action may be presented as an exact inverse. No adapter may silently weaken an upstream license or permission boundary.

## Acceptance gate

```yaml
KOKOMPIWEAVER_PROVENANCE_GATE:
  accepted_if:
    - upstream_author_acknowledged
    - upstream_project_cited
    - source_declared
    - license_declared
    - version_or_commit_declared
    - dependency_relation_typed
    - original_jjbv_work_distinguished
    - derived_parents_recorded
    - no_identity_transport
    - no_provenance_erasure
    - trace_preserved
    - pi_fixed

  rejected_if:
    - missing_cecicoding_acknowledgement
    - copied_upstream_code_presented_as_jjbv_original
    - upstream_license_removed
    - pypi_release_claim_without_artifact
    - cpython_compatibility_claim_without_tests
    - silent_upstream_mutation
    - compensating_action_called_inverse
```

## KLOSE

```text
CeciCoding is acknowledged.
Upstream code remains upstream code.
JJBV graphical calculus remains JJBV original work.
QQUAPP relates without owning.
KokompiWeaver normalizes without erasing.
PACAPDG glues provenance-preserving relations.
STRIKK rejects attribution drift.
KAPSYLA seals only after accepted trace.

WORK ACKNOWLEDGEMENT NON-NEGOTIABLE.
NO PROVENANCE ERASURE.
NO SILENT UPSTREAM WRITE.
NO IDENTITY TRANSPORT.
TRACE PRESERVED.
Π FIXED.
```
