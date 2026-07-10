# UAPA graphical calculus presheaf release v1

`UAPA_GRAPHICAL_CALCULUS_PRESHEAF_RELEASE_V1` is the milestone data type for
using `jbermejovega/universal-abstrakta-plural-aesthetik` as the regular update
and release repository for safe-replay graphical-calculus work.

It unifies local graphical calculi as a presheaf-of-sheaves:

- Jaranian graphical calculus sections from the HYPERQQUAPP Jaranian presheaf.
- MBQC-typed HyperDAG resource sections.
- W3C/WCAG palette-pairing sections from the accessible palette engine.
- SIGIL RAG/MCP projection sections over GitHub as typed knowledge base.
- PACAPDG global-section candidates from the invariant renormalization flow.

The computational category basis follows the constructive reading of
Rydeheard and Burstall's *Computational Category Theory*: categories and
functors are represented computationally, finite colimits supply gluing, and
term unification can be read through a coequalizer-style construction. In this
package that vocabulary is used as typed release metadata, not as a claim that
the package implements all of category theory.

```ts
import { buildGraphicalCalculusPresheafRelease } from 'universal-abstrakta-plural-aesthetik'

const release = buildGraphicalCalculusPresheafRelease({
  namespace: 'uap.graphical.presheaf',
  sourceHex: '#1F7A54',
  theme: 'white',
  pairings: [{ foreground: '800', background: 'theme' }],
  injections: [],
  profilePairs: [
    {
      id: 'body.text',
      role: 'normalText',
      foreground: '#111827',
      background: '#ffffff',
    },
  ],
  milestone: {
    id: 'MILESTONE_SAFE_REPLAY_DATA_TYPE_V1',
    title: 'Compiled safe-replay graphical calculus data type',
    status: 'closed',
  },
  dataType: {
    name: 'GraphicalCalculusPresheafRelease',
    version: '0.2.0',
    kind: 'safe-replay-wcag-data-type',
  },
})

console.log(release.release.accepted)
console.log(release.presheaf.globalSectionId)
```

Release policy:

- Push regular updates when a deployment milestone is closed.
- Use branch-and-PR before `main`.
- Treat GitHub RAG as a typed knowledge base with source-path, claim-status,
  W3C/WCAG, safe-replay, data-type version, and invariant filters.
- Keep MCP read-first and mutation-gated.
- Treat OpenAPI/FastAPI, Composition API, OpenQASM, OpenMPI/HPC, Sigil4Godot,
  and PyPI/PYPL-style metadata as adapter surfaces that need explicit witnesses.

The PyPI/PYPL field is metadata compatibility for a future Python package
lineage. This TypeScript package does not claim to publish a Python wheel until
an actual Python packaging witness is added.
