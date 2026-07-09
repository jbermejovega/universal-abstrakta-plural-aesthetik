# HYPERQQUAPP MBQC-Typed HyperDAG Resource

**Identifier:** `HYPERQQUAPP_MBQC_TYPED_HYPERDAG_RESOURCE_V1`  
**Author and art-theory owner:** Jara Juana Bermejo Vega (`JJBV` / `JBV`)  
**Status:** foundational typed resource  
**Canon:** `PIORNALEGO_ES_CANON`

Copyright © 2026 Jara Juana Bermejo Vega (JJBV / JBV).

This document defines the foundational HyperDAG resource layer that precedes the Jaranian presheaf projection. It is a formal MBQC-inspired resource architecture, not a claim that the repository currently prepares, controls, or verifies a physical quantum device.

---

## 1. Build order

```text
MBQC-TYPED HYPERDAG RESOURCE
→ LOCAL MEASUREMENT CONTEXTS
→ FLOW / GFlow WITNESSES
→ CORRECTION DEPENDENCIES
→ REPLAY TRACE
→ JARANIAN PRESHEAF
→ NONABELIAN COCYCLE LAYER
→ PACAPDG GLOBAL GLUE
```

The HyperDAG resource is built first. The presheaf does not invent the resource; it exposes local sections, restrictions, and gluing data carried by this prior typed object.

---

## 2. Core declaration

```yaml
HYPERQQUAPP_MBQC_TYPED_HYPERDAG_RESOURCE_V1:
  status: FOUNDATIONAL_TYPED_RESOURCE
  author_owner: "Jara Juana Bermejo Vega / JJBV / JBV"

  stack:
    - HYPERQQUAPP
    - MBQC_TYPED
    - HYPERDAG_TYPED
    - RESOURCE_TYPED
    - GRAPH_STATE_TYPED
    - MEASUREMENT_CONTEXT_TYPED
    - FLOW_TYPED
    - GFLOW_TYPED
    - CORRECTION_DEPENDENCY_TYPED
    - CLASSICAL_CONTROL_TYPED
    - SIGIL_TYPED
    - QUNOTYPED
    - STRIKK_TYPED
    - SAFE_REPLAY

  invariants:
    no_transport: true
    no_identity_collapse: true
    no_authorship_collapse: true
    causal_order_preserved: true
    correction_dependencies_preserved: true
    measurement_trace_preserved: true
    replay_safe: true
    pi_fixed: true
```

---

## 3. Resource object

Define the resource as

\[
\mathcal R_{\mathrm{MBQC}}
=
(V,E,H,I,O,\Lambda,\mathsf M,\mathsf F,\mathsf C,\Gamma,\Pi).
\]

Here:

- \(V\): resource vertices or local quantum sites;
- \(E\): pairwise entanglement relations;
- \(H\): contextual hyperedges involving multiple sites or constraints;
- \(I\subseteq V\): input boundary;
- \(O\subseteq V\): output boundary;
- \(\Lambda\): local labels, planes, angles, bases, and semantic types;
- \(\mathsf M\): measurement commands;
- \(\mathsf F\): flow or generalized-flow witness;
- \(\mathsf C\): classically controlled correction dependencies;
- \(\Gamma\): complete execution and replay trace;
- \(\Pi\): fixed invariant family.

The object is a HyperDAG because a measurement or correction dependency can constrain several sites simultaneously and because causal dependencies must remain acyclic after compilation.

---

## 4. MBQC-typed vertices

```yaml
MBQC_VERTEX_TYPES:
  INPUT:
    role: logical_or_external_input_boundary

  RESOURCE:
    role: entangled_resource_site

  MEASURE:
    role: adaptive_measurement_site

  CORRECTION:
    role: classically_controlled_update_site

  OUTPUT:
    role: surviving_output_boundary

  WITNESS:
    role: trace_or_verification_site
```

Every vertex carries a typed record

\[
v_i
=
(\tau_i,\lambda_i,q_i,m_i,s_i,\gamma_i),
\]

where \(\tau_i\) is the vertex type, \(\lambda_i\) is local MBQC data, \(q_i\) is an optional resource-site identifier, \(m_i\) is the measurement command, \(s_i\) is the classical outcome symbol, and \(\gamma_i\) is the local replay witness.

No vertex is treated as an untyped dot.

---

## 5. Hyperedge classes

```yaml
MBQC_HYPEREDGE_TYPES:
  ENTANGLE:
    arity: 2_or_more
    role: graph_or_hypergraph_resource_coupling

  MEASUREMENT_CONTEXT:
    arity: 1_or_more
    role: jointly_declared_measurement_basis_or_context

  ADAPTIVITY:
    arity: 2_or_more
    role: prior_outcomes_control_later_measurements

  CORRECTION:
    arity: 2_or_more
    role: outcome_parity_controls_output_or_future_sites

  FLOW_WITNESS:
    arity: contextual
    role: causal_and_correctability_certificate

  OUTPUT_GLUE:
    arity: contextual
    role: typed_integration_into_surviving_boundary
```

A hyperedge is represented by

\[
h
=
(S_h,T_h,\tau_h,\chi_h,\gamma_h),
\]

with source set \(S_h\), target set \(T_h\), relation type \(\tau_h\), contextual constraint \(\chi_h\), and replay witness \(\gamma_h\).

---

## 6. Causal order

The compiled resource must carry a strict partial order

\[
\prec\;\subseteq V\times V
\]

such that adaptive dependencies point forward:

\[
i\prec j
\quad\text{whenever the outcome at }i
\text{ controls a command at }j.
\]

The directed dependency structure must be acyclic:

\[
\operatorname{cycle}(\prec)=\varnothing.
\]

```yaml
CAUSALITY_GATE:
  accepted_if:
    - every_adaptive_dependency_is_directed
    - every_controller_precedes_its_target
    - no_dependency_cycle
    - output_boundary_not_measured_unless_explicitly_typed

  rejected_if:
    - backward_untyped_control
    - cyclic_classical_dependency
    - hidden_measurement_dependency
    - output_erasure_without_witness
```

---

## 7. Flow and generalized flow

For an open graph-state-style sector \((G,I,O)\), a flow witness consists of a map

\[
f:O^c\to I^c
\]

and a strict partial order \(\prec\), subject to the declared MBQC flow conditions for the selected measurement model.

For a generalized-flow sector, use

\[
g:O^c\to\mathcal P(I^c),
\]

where each measured site may have a correction set rather than one correction vertex.

This scaffold does not assume that every HyperDAG admits flow or gflow. Instead, flow data is an explicit witness:

```yaml
FLOW_WITNESS:
  mode:
    - FLOW
    - GFLOW
    - DECLARED_NO_FLOW

  contains:
    - correction_map
    - partial_order
    - measurement_plane_constraints
    - dependency_trace

  must_not:
    - fabricate_flow
    - hide_failed_conditions
    - infer_physical_determinism_without_proof
```

---

## 8. Measurement commands

A local measurement command is

\[
M_i^{\lambda_i}(\alpha_i[\mathbf s_{<i}]),
\]

where:

- \(\lambda_i\) declares the measurement plane or basis type;
- \(\alpha_i\) is the base angle or parameter;
- \(\mathbf s_{<i}\) is the typed tuple of prior outcomes on which adaptivity depends.

```yaml
MEASUREMENT_COMMAND:
  site: vertex_id
  basis_type: declared
  base_parameter: declared
  dependencies: typed_prior_outcomes
  outcome_symbol: declared
  replay_record: required
```

A measurement parameter must never depend on an outcome that is absent from its causal past.

---

## 9. Correction dependencies

Classical correction dependencies are typed maps

\[
\mathsf C_X,
\mathsf C_Z:
\mathbb F_2^{|M|}
\longrightarrow
\mathbb F_2^{|V|},
\]

or a declared generalization appropriate to the resource model.

The formal resource records parity dependencies without claiming that the repository executes physical Pauli corrections.

```yaml
CORRECTION_DEPENDENCY:
  controller_outcomes: typed_set
  target_sites: typed_set
  correction_class:
    - X_LIKE
    - Z_LIKE
    - FRAME_UPDATE
    - ABSTRACT_REWRITE
  parity_rule: explicit
  trace_required: true
```

---

## 10. Resource boundary

The resource has a typed open boundary

\[
\partial\mathcal R_{\mathrm{MBQC}}
=
I\sqcup O.
\]

Input and output are roles, not identities. Boundary typing must not collapse local sections:

```text
INPUT  = admitted external/logical interface
OUTPUT = surviving compiled interface
```

The internal resource may be rewritten while the declared boundary contract and \(\Pi\) remain fixed.

---

## 11. HYPERQQUAPP resource interpretation

```yaml
HYPERQQUAPP_MBQC_RESOURCE:
  resource_body:
    - graph_state_or_hypergraph_state_schema
    - measurement_contexts
    - adaptive_dependencies
    - correction_dependencies

  plural_resource:
    - multiple_compatible_measurement_branches
    - multiple_local_contexts
    - multiple_flow_or_gflow_sectors

  witness_body:
    - causal_order
    - outcome_trace
    - correction_trace
    - boundary_trace
    - obstruction_report

  no_physical_overclaim:
    - no_device_execution_claim
    - no_quantum_advantage_claim
    - no_error_correction_implementation_claim
    - no_determinism_claim_without_flow_witness
```

The term “resource” means a typed formal object available to the compiler. It does not imply ownership or transport of identity.

---

## 12. Compilation judgment

The foundational judgment is

\[
\Gamma
\vdash_{\mathrm{MBQC}}
\mathcal R:
\mathsf{HyperDAGResource}
\triangleright
(\mathsf F,\mathsf C,\Pi,\mathcal O,\mathcal W).
\]

Here:

- \(\mathsf F\) is the flow/gflow status and witness;
- \(\mathsf C\) is the correction-dependency family;
- \(\Pi\) is the invariant family;
- \(\mathcal O\) is the obstruction report;
- \(\mathcal W\) is the replay witness.

Compilation does not erase failed conditions. A failed flow, causal, boundary, or typing check becomes a typed obstruction.

---

## 13. STRIKK resource gate

```yaml
STRIKK_MBQC_HYPERDAG_RESOURCE_CHECK:
  accepted_if:
    - every_vertex_is_typed
    - every_hyperedge_is_typed
    - input_output_boundary_declared
    - measurement_contexts_declared
    - causal_order_acyclic
    - adaptive_dependencies_visible
    - correction_dependencies_visible
    - flow_or_gflow_status_explicit
    - no_fake_determinism
    - replay_trace_reconstructible
    - authorship_preserved
    - no_transport
    - no_identity_collapse
    - pi_fixed

  rejected_if:
    - untyped_resource_site
    - hidden_classical_control
    - cyclic_dependency
    - fabricated_flow_witness
    - output_boundary_erasure
    - physical_claim_without_model
    - missing_trace
    - authorship_collapse
    - pi_drift
```

---

## 14. Projection into the Jaranian presheaf

Only after this resource exists do we define local Jaranian views:

\[
\mathcal P_{J,U}:
\mathcal R_{\mathrm{MBQC}}|_U
\longrightarrow
\mathcal F_J(U).
\]

The presheaf stalk over \(U\) contains the local MBQC-typed resource data visible in that region:

\[
\mathcal F_J(U)
=
\bigl(
V_U,E_U,H_U,\Lambda_U,
\mathsf M_U,\mathsf F_U,\mathsf C_U,
\Gamma_U,\Pi_U
\bigr).
\]

Restriction maps preserve causal predecessors, local measurement contexts, correction dependencies, and trace references. A restriction may hide data outside \(U\), but it may not falsify dependencies crossing the boundary.

---

## 15. KLOSE

```text
HYPERQQUAPP holds the foundational resource.
MBQC typing distinguishes sites, measurements, flow, and corrections.
The HyperDAG preserves multi-site contextual dependencies.
Causal order forbids cyclic adaptivity.
Flow and gflow are witnesses, never assumptions.
Measurement outcomes control only their declared future.
The replay trace records every dependency.
The Jaranian presheaf is projected only after the resource exists.
PACAPDG glues only compatible local views.
STRIKK rejects hidden control and fake determinism.
JJBV authorship remains preserved.

RESOURCE FIRST.
PRESHEAF SECOND.
NO TRANSPORT.
NO IDENTITY COLLAPSE.
NO AUTHORSHIP COLLAPSE.
TRACE PRESERVED.
SAFE REPLAY.
PI FIXED.
PIORNALEGO ES CANON.
```
