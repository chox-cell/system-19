# SYSTEM-19 — IMPLEMENTATION GUIDE v0
**GitHub-native AI Code Enforcement Layer**

---

# 1. Objective

Build the first working version of System-19 as a **free, open-source GitHub Action** that reviews AI-generated Pull Requests and returns a deterministic decision:

- APPROVE
- REVISE
- BLOCK

System-19 v0 must:

- run on Pull Requests
- inspect changed files and diff
- apply policy + quality + risk checks
- compute a Blessing Score
- post a structured PR review comment
- avoid modifying code
- avoid auto-merging
- remain deterministic and explainable

---

# 2. v0 Implementation Boundary

## In Scope

- GitHub Action
- TypeScript-first repositories
- PR diff analysis
- changed files inspection
- optional test summary ingestion
- structured scoring
- PR comment output
- audit logging

## Out of Scope

- auto-fix
- auto-merge
- autonomous code generation
- multi-agent orchestration
- MCP / A2A
- OpenClaw adapter
- dashboard
- multi-repo orchestration
- full memory system

---

# 3. Delivery Goal

The v0 release is successful if a developer can install System-19 in a GitHub repo and get:

1. PR analysis
2. decision output
3. score breakdown
4. required actions
5. reproducible review behavior

---

# 4. Recommended Stack

## Runtime
- Node.js 20+
- TypeScript

## GitHub Integration
- GitHub Actions
- GitHub REST API / Octokit

## Packaging
- npm
- optional Docker packaging later

## Testing
- Vitest or Jest
- fixture-based PR test cases

## Linting
- ESLint
- Prettier

---

# 5. Repository Structure

```text
system-19/
├── .github/
│   └── workflows/
│       └── release.yml
├── action.yml
├── package.json
├── tsconfig.json
├── README.md
├── LICENSE
├── docs/
│   ├── system-19-master.md
│   ├── review-spec.md
│   ├── implementation-guide.md
│   ├── laws-v0.md
│   ├── scoring-model.md
│   └── validation.md
├── src/
│   ├── index.ts
│   ├── github/
│   │   ├── pull-request.ts
│   │   ├── comment.ts
│   │   └── context.ts
│   ├── parser/
│   │   ├── diff-parser.ts
│   │   ├── changed-files.ts
│   │   └── classifiers.ts
│   ├── rules/
│   │   ├── rule-unsafe-typescript.ts
│   │   ├── rule-db-without-migration.ts
│   │   ├── rule-failing-tests.ts
│   │   ├── rule-sensitive-change-without-tests.ts
│   │   ├── rule-incomplete-change.ts
│   │   └── rule-breaking-risk.ts
│   ├── analysis/
│   │   ├── quality.ts
│   │   ├── risk.ts
│   │   ├── confidence.ts
│   │   └── scoring.ts
│   ├── engine/
│   │   ├── review-engine.ts
│   │   ├── decision-engine.ts
│   │   └── report-engine.ts
│   ├── types/
│   │   ├── input.ts
│   │   ├── output.ts
│   │   ├── violations.ts
│   │   └── review.ts
│   ├── logging/
│   │   └── audit-log.ts
│   └── utils/
│       ├── normalize.ts
│       ├── strings.ts
│       └── files.ts
└── tests/
    ├── fixtures/
    ├── unit/
    └── integration/
```

---

# 6. High-Level Execution Flow

```text
GitHub PR event
    ↓
GitHub Action starts
    ↓
Load PR metadata
    ↓
Fetch changed files + diff
    ↓
Parse and classify change set
    ↓
Run policy checks
    ↓
Run quality analysis
    ↓
Run risk analysis
    ↓
Run confidence analysis
    ↓
Compute Blessing Score
    ↓
Apply decision rules
    ↓
Generate structured report
    ↓
Post PR comment
    ↓
Store audit output
```

---

# 7. Core Modules

## 7.1 GitHub Context Layer
Responsible for:

- reading repo / PR / commit context
- fetching changed files
- fetching diff or patch data
- reading labels if available
- posting PR review comment

## 7.2 Parser Layer
Responsible for:

- parsing changed files
- reading patch fragments
- detecting file categories
- identifying critical areas

## 7.3 Classification Layer
Must classify PR into one or more of:

- CODE_CHANGE
- TEST_CHANGE
- CONFIG_CHANGE
- DB_CHANGE
- CRITICAL_SYSTEM_CHANGE

## 7.4 Rules Layer
Executes deterministic checks defined in `laws-v0.md`.

## 7.5 Analysis Layer
Computes:

- quality_score
- risk_score
- confidence_score

## 7.6 Decision Layer
Produces:

- APPROVE
- REVISE
- BLOCK

## 7.7 Reporting Layer
Builds:

- human-readable summary
- machine-readable JSON report
- PR comment

## 7.8 Logging Layer
Stores audit data for later review and validation.

---

# 8. GitHub Action Behavior

## Trigger Events

System-19 should trigger on:

- `pull_request.opened`
- `pull_request.synchronize`
- `pull_request.reopened`
- `pull_request.ready_for_review`

## Minimal Workflow Inputs

- GitHub token
- optional config path
- optional test status input
- optional label requirement

---

# 9. Input Model

## Required Data

System-19 must collect:

- repository name
- PR number
- PR title
- changed files list
- per-file patch content if available

## Optional Data

- labels
- author metadata
- AI-generated label
- test summary status

---

# 10. Detection Logic

## 10.1 DB Change Detection
A PR is considered `DB_CHANGE` if it touches:

- migration directories
- schema files
- `.sql` files
- ORM schema files

## 10.2 Critical System Detection
A PR is considered `CRITICAL_SYSTEM_CHANGE` if it touches:

- auth
- permissions
- payments
- secrets/config
- shared API boundaries

## 10.3 Test Change Detection
A PR is considered `TEST_CHANGE` if it touches:

- `__tests__`
- `*.spec.ts`
- `*.test.ts`
- Playwright test folders

---

# 11. Rule Implementation Plan

## RULE-01: Unsafe TypeScript
Detect patterns:

- `: any`
- `as any`
- `@ts-ignore`
- `@ts-nocheck`

Severity:
- MEDIUM by default
- HIGH if inside critical system files

## RULE-02: DB Change Without Migration
If DB-related files changed but no migration file detected:

- severity = CRITICAL
- decision override = BLOCK

## RULE-03: Failing Tests
If test status explicitly equals fail:

- severity = CRITICAL
- decision override = BLOCK

## RULE-04: Sensitive Change Without Tests
If critical files changed and no test files changed:

- severity = HIGH
- default decision = REVISE

## RULE-05: Incomplete Change
Detect likely logic change with no supporting test or adjacent updates.

Severity:
- HIGH

## RULE-06: Silent Breaking Risk
Detect changes to:

- shared contracts
- auth flow
- DB schema
- exported public types
- API route signatures

Severity:
- HIGH

---

# 12. Scoring Implementation

## 12.1 Quality Score
Start from 100 and reduce based on:

- unsafe TypeScript
- missing tests
- inconsistent changes
- incomplete logic updates

## 12.2 Risk Score
Start from 0 and increase based on:

- critical system touch
- DB impact
- possible breaking contract
- config/security sensitivity

## 12.3 Confidence Score
Derived from:

- clarity of scope
- presence of tests
- consistency of changes
- signal completeness

---

# 13. Blessing Score Implementation

## Formula

```text
raw = quality_score + confidence_score - risk_score
```

Clamp / normalize to 0–100.

## Thresholds

- `>= 85` → APPROVE
- `65–84` → REVISE
- `< 65` → BLOCK

## Hard Overrides

These rules override score:

- failing tests → BLOCK
- DB change without migration → BLOCK
- multiple HIGH violations → BLOCK
- one HIGH violation → REVISE
- incomplete analysis → REVISE

---

# 14. PR Comment Design

The PR comment must be:

- short enough to read quickly
- detailed enough to trust
- deterministic in structure

## Required Sections

- Decision
- Blessing Score
- Quality / Risk / Confidence
- Issues Detected
- Required Actions
- Final Status

---

# 15. Audit Log Design

Each run should produce a structured JSON artifact.

## Storage for v0

Use both:
- PR comment for human view
- artifact JSON for evidence

---

# 16. Configuration Strategy

v0 should support a minimal optional config file:

```text
.system19.yml
```

## Minimal Config Capabilities

- critical paths
- db paths
- test paths
- score thresholds
- ignored files

---

# 17. Development Phases

## Phase 1 — Skeleton
Build:

- action entrypoint
- GitHub context loader
- diff + changed files fetch
- console output only

## Phase 2 — Classification
Build:

- file classification
- critical path detection
- DB/test/config categorization

## Phase 3 — Rules
Implement first 6 rules.

## Phase 4 — Scoring + Decision
Add:

- quality/risk/confidence calculators
- blessing score
- decision engine

## Phase 5 — Reporting
Add:

- comment formatter
- JSON artifact
- audit logging

## Phase 6 — Validation
Test on real and synthetic PRs.

---

# 18. Testing Strategy

## Unit Tests
- file classification
- rule detection
- score computation
- decision engine
- comment generation

## Fixture Tests
Use sample PR fixtures:

- safe refactor
- auth change without tests
- schema change without migration
- failing tests case
- API breaking change case

## Integration Tests
Mock GitHub API and verify:

- comment is posted
- artifact is generated
- decision is stable

---

# 19. Validation Dataset

Create a small internal dataset of PR examples:

- 10 clean PRs
- 10 risky PRs
- 10 ambiguous PRs

---

# 20. Performance Constraints

v0 should aim for:

- under 30 seconds total runtime
- predictable output
- no network sprawl beyond GitHub APIs
- no external LLM dependency for core checks

---

# 21. Security Principles

- use least-privilege GitHub token
- never modify code
- never write to protected branches
- never access secrets beyond action scope
- never execute untrusted PR code during analysis
- treat patches as data, not executable content

---

# 22. Open Source Release Plan

## v0 License
Recommended default:
- Apache-2.0 or MIT

## Initial OSS Release Must Include

- README
- quickstart
- example workflow
- docs
- sample config
- sample outputs
- roadmap snapshot

---

# 23. README Must Communicate

- what System-19 is
- what problem it solves
- how to install
- what decisions mean
- what v0 does not do
- example review output

---

# 24. Minimum Launch Checklist

Before releasing v0, confirm:

- GitHub Action runs on PR events
- changed files and diff are fetched correctly
- all 6 rules are implemented
- blessing score is computed
- decision engine works
- PR comment is posted
- audit artifact is generated
- docs are aligned with behavior
- 10+ fixture PRs tested

---

# 25. Definition of Done

System-19 v0 is complete when:

1. a developer installs it in a repo
2. opens or updates a PR
3. System-19 analyzes the PR
4. System-19 posts a structured review
5. decision is understandable
6. result is reproducible
7. audit data is preserved

---

# 26. Build Order (Recommended)

```text
1. action.yml
2. src/index.ts
3. GitHub context loader
4. diff + changed files parser
5. classifiers
6. first 6 rules
7. scoring engine
8. decision engine
9. report formatter
10. PR comment publisher
11. audit artifact writer
12. tests + fixtures
13. README + docs polish
```

---

# 27. Final Implementation Principle

System-19 v0 must not try to be intelligent everywhere.

It must be:

- strict
- understandable
- deterministic
- useful inside GitHub
- easy to trust

The first job of System-19 is not to write software.

The first job of System-19 is to stop unsafe AI-generated software changes before merge.
