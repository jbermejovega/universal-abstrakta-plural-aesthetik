# SIGIL Rule Zero — Resource-Relative Commutation

**Capsule:** `SIGIL_RULEZERO_RESOURCE_RELATIVE_COMMUTATION_V1`  
**Author/owner:** Jara Juana Bermejo Vega (JJBV)  
**Status:** post-merge theoretical note following PR #14  
**Boundary:** no modification of the merged PR #14 patch; no claim that Rule Zero was implemented or tested by PR #14

## Boundary correction

The Connes embedding problem does **not** define orbifolds. It concerns embedding and finite-dimensional approximation questions for tracial von Neumann algebras, and its negative answer follows from `MIP*=RE`. Orbifolds are locally quotient geometries, typically modeled by `U/G` with finite local isotropy, with the usual refinements through effective or ineffective orbifolds, proper étale groupoids, and differentiable stacks. SIGIL may relate both through a typed obstruction registry, but must not identify them.

## Declared Rule-Zero datum

Let `A` and `B` be typed composable operations. A Rule-Zero resource datum is

\[
R=(\Gamma,\mathcal A_R,\prec_R,I_R,G_R,\mathcal O,\rho_{\mathcal O},\Pi,\tau,\mathsf C_R,\mathcal K_R),
\]

where:

- `Γ` is the typing context;
- `A_R` is the ambient algebra or module representing processes;
- `≺_R` is a fixed admissible monomial or reduction order;
- `I_R ⊆ A_R` is the active Jaranian ideal;
- `G_R` is a fixed Gröbner basis for `I_R`, or an explicitly declared equivalent confluent reduction system;
- `O` is the lower-dimensional orbifold reference sector;
- `ρ_O` is the typed renormalization map;
- `Π` is the fixed invariant;
- `τ` is the replay trace;
- `C_R` is the process-cost monotone;
- `K_R` is the ordered monoidal cost codomain.

## Algebraic criterion

The algebraic core of Rule Zero is

\[
\boxed{
\operatorname{NF}_{G_R}
\!\left(
\rho_{\mathcal O}(A\circ B)-\rho_{\mathcal O}(B\circ A)
\right)=0.
}
\]

This formula remains valid without assuming that `ρ_O` is linear. The compressed notation

\[
\operatorname{NF}_{G_R}\!\left(\rho_{\mathcal O}([A,B])\right)=0
\]

is admissible only when `ρ_O` is linear. If `ρ_O` is an algebra homomorphism, then additionally

\[
\rho_{\mathcal O}([A,B])
=
[\rho_{\mathcal O}(A),\rho_{\mathcal O}(B)].
\]

The normal form is computationally meaningful only relative to the declared ambient algebra, reduction order, and Gröbner basis or equivalent confluent reducer.

## Full Rule-Zero admission

The algebraic criterion is necessary but is not, by itself, the complete admission condition. Define

\[
A\Join_R B
\]

iff all of the following hold:

\[
\begin{cases}
\operatorname{NF}_{G_R}
\!\left(
\rho_{\mathcal O}(A\circ B)-\rho_{\mathcal O}(B\circ A)
\right)=0,\\[1mm]
\operatorname{type}(A\circ B)=\operatorname{type}(B\circ A),\\
\Pi(A\circ B)=\Pi(B\circ A),\\
\tau(A\circ B)\simeq_R\tau(B\circ A),\\
\mathsf C_R(A\circ B)\asymp_R\mathsf C_R(B\circ A).
\end{cases}
\]

Thus `A` and `B` commute only in the declared `R`-localized Jaranian quotient. Rule Zero does **not** assert unrestricted equality

\[
A\circ B=B\circ A.
\]

The short equation may be used as a capsule only when the remaining type, invariant, replay, and cost clauses are explicitly understood as part of `R`.

## Typed resource preorder and quotient order

Resource convertibility is a typed preorder:

\[
X\preceq_R Y.
\]

It is reflexive and transitive, but need not be antisymmetric. Operational equivalence is

\[
X\sim_R Y
\iff
X\preceq_R Y
\land
Y\preceq_R X.
\]

The quotient classes inherit a partial order:

\[
\boxed{
\text{typed preorder on processes}
\longrightarrow
\text{partial order on operational-equivalence classes}.
}
\]

The phrase “partial preorder” is not used.

## Ordered monoidal cost

The cost codomain is a declared ordered monoidal object

\[
(\mathcal K_R,\preceq_R^{\mathcal K},\otimes_R,\mathbf 1_R).
\]

The process-cost map is

\[
\mathsf C_R:\operatorname{Mor}(\mathsf{Res}_R)\to\mathcal K_R.
\]

Monotonicity and sequential submultiplicativity are

\[
f\preceq_R g
\Longrightarrow
\mathsf C_R(f)\preceq_R^{\mathcal K}\mathsf C_R(g),
\]

\[
\boxed{
\mathsf C_R(A\circ B)
\preceq_R^{\mathcal K}
\mathsf C_R(A)\otimes_R\mathsf C_R(B).
}
\]

For positive scalar costs, `⊗_R` may be multiplication. For multicriteria costs, both `⊗_R` and the comparison relation must be declared. A typical cost vector is

\[
\mathbf C_R(X)=
(c_{\rm ctx},c_{\rm orb},c_{\rm cob},c_I,c_{\rm order},c_{\rm trace},c_{\rm compute},c_{\rm fan}).
\]

Scalarization is admissible only after weights and aggregation rules are declared. No hidden universal scalar cost is canonical.

## Orbifold-relative renormalization

For a lower-dimensional orbifold sector `O`, relative cost may be defined residually in the ordered monoidal codomain:

\[
\mathsf C_R^{\rm rel}(X\mid\mathcal O)
=
\inf\left\{
kappa\in\mathcal K_R:
\mathsf C_R(X)
\preceq_R^{\mathcal K}
\kappa\otimes_R\mathsf C_R(\mathcal O)
\right\},
\]

whenever this infimum exists. Orbifold reduction retains quotient symmetry, local isotropy, singular-sector typing, and replay provenance.

## Jarramplas Orbifold Kernel

With the reduction data declared, define

\[
\mathbb J_{\rm orb}(X)
=
\operatorname{NF}_{G_R}\!\left(\rho_{\mathcal O}(X)\right).
\]

The kernel supplies the algebraic projection

\[
\mathbb J_{\rm orb}(A\circ B)
=
\mathbb J_{\rm orb}(B\circ A),
\]

but full Rule-Zero admission still requires the type, `Π`, replay, and cost clauses above.

The kernel glues these projections without collapsing their mathematical types:

- operator-algebraic approximation and correlation-model obstructions;
- orbifold quotient geometry and isotropy;
- higher cobordism witnesses;
- nonabelian sheaf or stacky obstruction classes;
- contextual resource costs;
- replay and invariant checks.

## NORMA–JARRA–KHOREO placement

```text
PACA
→ MOOG
→ SIGIL
→ NORMA
→ JARRA
→ KHOREO
→ JARRAMPLAS ORBIFOLD KERNEL
→ Π
→ KAPSYLA
```

- **PACA** holds the plural local resource ecology.
- **MOOG** renders resonance, synchronization, and obstruction.
- **SIGIL** types admissibility and resource-relative commutation.
- **NORMA** declares schemas, provenance, reduction data, and cost contracts.
- **JARRA** composes contextual resource objects.
- **KHOREO** executes ordered paths and records path dependence.
- **Jarramplas Orbifold Kernel** performs quotient-aware dimensional renormalization.
- **Π** fixes invariant meaning.
- **KAPSYLA** accepts only after the complete replay-safe admission test.

## STRIKK gate

```yaml
SIGIL_RULEZERO:
  publication_relation_to_pr14:
    kind: post_merge_theoretical_note
    modifies_merged_patch: false
    claims_implemented_by_pr14: false
    claims_tested_by_pr14: false

  reduction:
    ambient_algebra_required: true
    reduction_order_required: true
    ideal_required: true
    groebner_basis_or_confluent_reducer_required: true
    compressed_commutator_form_requires_linearity: true
    commutator_preservation_requires_algebra_homomorphism: true

  admission:
    algebraic_normal_form: required
    type_preserved: required
    pi_preserved: required
    replay_equivalent: required
    cost_comparable: required

  resource_order:
    process_level: typed_preorder
    quotient_level: partial_order

  cost:
    codomain: ordered_monoidal
    monotone: true
    sequentially_submultiplicative: true
    vector_valued_allowed: true
    hidden_scalarization: forbidden

  connes_boundary:
    defines_orbifolds: false
    role:
      - finite_approximation_obstruction
      - correlation_model_gap
      - operator_algebraic_realization_warning

  invariants:
    no_identity_transport: true
    no_obstruction_collapse: true
    trace_preserved: true
    pi_fixed: true
    safe_replay: true
```

## Publication form

The irreducible **algebraic criterion** is

\[
\boxed{
\operatorname{NF}_{G_R}
\!\left(
\rho_{\mathcal O}(A\circ B)-\rho_{\mathcal O}(B\circ A)
\right)=0.
}
\]

The general cost law is

\[
\boxed{
\mathsf C_R(A\circ B)
\preceq_R^{\mathcal K}
\mathsf C_R(A)\otimes_R\mathsf C_R(B).
}
\]

Full Rule Zero is the conjunction of that algebraic criterion with type preservation, `Π` preservation, replay equivalence, and cost comparability.

## KLOSE

```text
A and B do not commute absolutely.
They commute only relative to declared Rule-Zero data.

Normal form requires an ambient algebra,
a reduction order, and a fixed Gröbner basis
or equivalent confluent reduction system.

The algebraic test is not the whole admission gate.
Type, Π, replay, and cost remain explicit.

Processes form a typed preorder.
Operational-equivalence classes form a partial order.

Cost lives in an ordered monoidal codomain.
No hidden scalarization is canonical.

Connes does not define orbifolds.
Orbifolds provide quotient geometry and isotropy.
SIGIL registers typed relations without collapsing them.

NO IDENTITY TRANSPORT.
NO OBSTRUCTION COLLAPSE.
TRACE PRESERVED.
Π FIXED.
SAFE REPLAY.
PIORNALEGO ES CANON.
```
