# System-19 v0

System-19 is a GitHub-native enforcement layer for AI-generated software changes.

## What it does

- Reviews Pull Requests
- Applies deterministic policy checks
- Computes quality, risk, and confidence
- Returns:
  - APPROVE
  - REVISE
  - BLOCK
- Publishes a PR comment
- Publishes a GitHub status check
- Writes a step summary
- Generates an audit artifact

## v0 Scope

- GitHub Action
- TypeScript-first repositories
- PR diff analysis
- Configurable via `.system19.yml`
- No auto-fix
- No auto-merge
- Human remains final authority

## Core Idea

System-19 does not generate code.

System-19 judges code.

## Config

```yaml
criticalPaths:
  - "src/auth/"
  - "src/permissions/"
  - "src/billing/"
  - "src/middleware/"
  - "src/api/"

dbPaths:
  - "prisma/"
  - "drizzle/"
  - "migrations/"
  - "db/"

testPaths:
  - "__tests__"
  - ".spec.ts"
  - ".test.ts"

thresholds:
  approve: 85
  revise: 65

ignoredFiles:
  - "docs/"                                                                     Output Channels

System-19 publishes results through:
	•	PR comment
	•	GitHub Check
	•	GitHub Step Summary
	•	JSON audit artifact

Local Development                                                               npm install
npm run build
npm test                                                                        Status

v0 includes config-aware enforcement, status checks, audit artifacts, and smarter summaries.
