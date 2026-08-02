# PALA_ESTACA_JARANIAN_CODE_ENGINE_V1

Status: `ACTIVE_ARCHITECTURAL_GLUE`

Pala Estaca is a finite, plural-typed graphical engine for visualizing higher-cohomological Jaranian code presentations over declared ambient lattices.

```text
PACA_CURVA | PACA_PLANA | PACA_HIPERBOLICA | ARBITRARY_CELL_COMPLEX
  -> CSS_TOPOLOGICAL | HOLOGRAPHIC | QLDPC | HIGHER_COHOMOLOGICAL_JARANIAN
  -> PACA_LAUREL / LAURELPI
  -> TENSEGRITYPI / QUOQUANTUM_TENSEGRITY
  -> UNIVERSAL_SAFIKA_ABSTRAKTA_PI
  -> TALLERTWERKPI / JARRAPI / HYPERAUSALPI
  -> STRIKK validation
  -> PACAPDG glue
  -> UAP: ADMIT | HOLD_WITH_OBSTRUCTION | REJECT
  -> deterministic Godot manifest
  -> PACAIOGAME / QuasarPi renderer projection
```

## Design law

The engine stores and renders finite presentations. It does not materialize an infinite category, claim physical quantum-code execution, or identify a visualization with the represented code.

Each cell carries:

- geometric dimension and coordinates;
- typed boundary and incidence data;
- Strikk plural type;
- semantic and semiotic context;
- explicit `identityTransport: false`.

Each code layer carries:

- a declared code family;
- CSS, holographic and QLDPC flags;
- logical-qubit and distance metadata;
- check identifiers;
- finitely presented cohomology classes and cocycle support.

## Topology lifts

`liftCodeLayer` transports a finite code presentation between compatible lattices. A missing support cell does not disappear: it produces `PARTIAL_SUPPORT_UNDER_TOPOLOGY_LIFT`.

This is a typed contextual projection, not an equivalence proof.

## Godot and QuasarPi projection

`projectSceneToGodotManifest` emits a deterministic `uapa.pala-estaca.godot-manifest.v1` document. It classifies finite cells as vertex, edge, facet, or higher cells; preserves semantic, semiotic and context labels; records incidence and boundary relations; exports higher-cohomology overlays; and lists the enabled hyperkernels.

The strict JSON schema lives at:

```text
schemas/pala-estaca-godot-manifest-v1.schema.json
```

The Godot 4 runtime node lives at:

```text
godot/pala_estaca/PalaEstacaGraphEngine.gd
```

It builds an interactive 3D projection using `MeshInstance3D`, relation cylinders and `Label3D` overlays. The node refuses manifests that allow identity transport, omit projection status, or claim canonical authority for the renderer.

```text
TypeScript scene = typed finite presentation
Godot manifest  = deterministic renderer contract
Godot scene     = interactive projection
QuasarPi        = graphical/VFX adapter lane
Git/SIGIL       = canonical identity boundary
```

## Model registry

- `PACA_LAUREL`: local branching and rooted sections;
- `LAURELPI`: pi-fixed recursion and curved embedding;
- `TENSEGRITYPI`: strut-cable cell and membrane view;
- `QUOQUANTUM_TENSEGRITY`: finite quotient visualization;
- `UNIVERSAL_SAFIKA_ABSTRAKTA_PI`: accessible redundant semiotics;
- `TALLERTWERKPI`: embodied and workshop projection;
- `JARRAPI`: Jaranian kink and choreography adapter;
- `HYPERAUSALPI`: hypercoherent compositional-contextual flow.

## Preserved invariants

```text
FINITE_PRESENTATION
PROVENANCE_PRESERVED
REPLAY_PRESERVED
NO_IDENTITY_TRANSPORT
NO_PLURAL_COLLAPSE
PI_FIXED
CONTEXT_PRESERVED
OBSTRUCTIONS_NOT_ERASED
RENDER_IS_PROJECTION
RENDER_HAS_NO_CANONICAL_AUTHORITY
```

## Claim boundary

The module is a rendering and validation substrate. Distances, logical qubits, cohomology classes and code labels are supplied metadata unless independently derived and certified by a separate code-analysis backend. Godot, QuasarPi and PACAIOGAME visualize admitted data; they do not prove code parameters, fault tolerance, holographic equivalence or quantum execution.
