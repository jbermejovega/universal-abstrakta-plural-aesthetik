# Rights and provenance ledger V1

| Scope | Recorded source | Current conclusion | Requirement before release |
| --- | --- | --- | --- |
| Repository root `LICENSE` | MIT text; © 2026 Ceci Olivera | Existing source license, retain | Confirm source lineage and required notices |
| Package `accessible-color-palette` | `package.json` dependency | External package, not rebranded | Verify exact resolved version/license from lock + npm installation |
| Other npm dependencies | `package-lock.json` | Rights not assessed | Dependency license/SBOM scan |
| `src/`, `tests/`, `test/` | Mixed history | Unverified authorship by file | Git/source inventory; no proprietary reclassification without title |
| `demo/*.html`, `demo/screenshots/` | AI coding agent gallery per `demo/README.md` | Mixed agent/asset history, HOLD | Determine rights for embedded media, typography, generated imagery, sample brands |
| `godot/` | Existing implementation | Not audited | Engine license, third-party plugin notices and permissions |
| PACA SIGIL canonical/private core | Out of showcase scope | **MUST NOT BUNDLE** | Interface-only demonstration, no hidden private artifacts |
| SIGIL RPG · MY ORB 42 | Standalone prototype external to this repository | **HOLD_PUBLIC_RELEASE** | Originality, content/age review, security, accessibility, QA and manifest |
| CODICEX / Quarto cover | Candidate original portfolio artwork | **NOT CLEARED / NOT LICENSED** | Authorship, source font/image review, asset-by-asset designation |

This is an **incomplete** inventory on purpose: neither rights nor compatibility can be inferred from a filename, Git history alone, a screenshot or an AI-produced artifact. Unlisted items remain HOLD. Do not assume all `demo/` files are copyrighted by the PACA portfolio owner or are wholly MIT.
