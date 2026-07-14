# SIGIL Rule Zero — Resource-Relative Commutation

**Capsule:** `SIGIL_RULEZERO_RESOURCE_RELATIVE_COMMUTATION_V1`  
**Author/owner:** Jara Juana Bermejo Vega (JJBV)  
**Status:** publishing update following PR #14

## Boundary correction

The Connes embedding problem does **not** define orbifolds. It concerns finite-dimensional approximation and embedding questions for tracial von Neumann algebras. Orbifolds are locally quotient geometries, typically modeled by `U/G` with finite local isotropy. SIGIL may relate both through a typed obstruction registry, but must not identify them.

## Rule Zero

Let `A` and `B` be typed operations and let `R` be a declared resource relation carrying context, active Jaranian ideal, lower-dimensional orbifold reference, renormalization map, replay trace, and fixed invariant.

\[
A \Join_R B
\quad\Longleftrightarrow\quad
\operatorname{NF}_{I_R}\!\left(\rho_{\mathcal O}[A,B]\right)=0.
\]

This means that `A` and `B` commute in the `R`-localized Jaranian quotient. It does **not** assert unrestricted equality `A \circ B = B \circ A`.

## Typed resource cost

The cost map is monotone and submultiplicative:

\[
X \preceq_R Y \Longrightarrow \mathsf C_R(X) \leq \mathsf C_R(Y),
\]

\[
\mathsf C_R(A\circ B)
\leq
\mathsf C_R(A)\mathsf C_R(B).
\]

Costs are partially ordered and vector-valued by default:

\[
\mathbf C_R(X)=
(c_{ctx},c_{orb},c_{cob},c_I,c_{ord},c_{trace},c_{compute},c_{fan}).
\]

Scalarization is admissible only after weights are explicitly declared. No hidden scalar cost is canonical.

## Orbifold-relative renormalization

For a lower-dimensional orbifold sector `O`, relative cost is the least multiplier required to dominate the high-dimensional cost:

\[
\mathsf C_R^{rel}(X\mid\mathcal O)
=
\inf\{c:\mathsf C_R(X)\leq c\odot\mathsf C_R(\mathcal O)\}.
\]

Orbifold reduction preserves quotient symmetry, finite isotropy, singular-sector typing, and replay provenance.

## Jarramplas Orbifold Kernel

\[
\mathbb J_{orb}(X)
=
\operatorname{NF}_{I_\bullet}(\rho(X)).
\]

Hence the operational kernel law is:

\[
A\Join_R B
\iff
\mathbb J_{orb}(A\circ B)
=
\mathbb J_{orb}(B\circ A).
\]

The kernel glues the following projections without collapsing them:

- operator-algebraic approximation obstructions;
- orbifold quotient geometry and isotropy;
- higher cobordism witnesses;
- nonabelian sheaf/cohomology obstructions;
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
- **SIGIL** types admissibility and relative commutation.
- **NORMA** records schemas, provenance, and cost coordinates.
- **JARRA** composes resource objects.
- **KHOREO** executes ordered paths and preserves path dependence.
- **Jarramplas Orbifold Kernel** performs quotient-aware renormalization.
- **Π** fixes the invariant.
- **KAPSYLA** accepts only after replay-safe validation.

## STRIKK gate

```yaml
SIGIL_RULEZERO:
  commutation:
    absolute: false
    resource_relative: true
    algebraic_test: "[A,B] in I_R after orbifold renormalization"

  cost:
    monotone: true
    submultiplicative: true
    partially_ordered: true
    vector_valued_by_default: true
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

## Irreducible form

\[
\boxed{
A\Join_RB
\iff
\operatorname{NF}_{I_R}
\!\left(
\rho_{\mathcal O}[A,B]
\right)=0
}
\]

with

\[
\boxed{
\mathsf C_R(A\circ B)
\leq
\mathsf C_R(A)\mathsf C_R(B)
}
\]

and comparison always performed inside a declared typed partial preorder.

## KLOSE

```text
A and B do not commute absolutely.
They commute relative to a typed resource relation,
a Jaranian ideal, an orbifold reduction,
a cost preorder, and a replay witness.

Connes does not define orbifolds.
Orbifolds provide quotient geometry and isotropy.
Higher cobordisms relate typed boundary sectors.
SIGIL registers the obstructions without collapsing their types.

NO IDENTITY TRANSPORT.
NO OBSTRUCTION COLLAPSE.
NO HIDDEN SCALARIZATION.
TRACE PRESERVED.
Π FIXED.
SAFE REPLAY.
PIORNALEGO ES CANON.
```
