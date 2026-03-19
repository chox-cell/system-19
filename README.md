# System-19

System-19 is an open-source enforcement layer for AI-generated software changes.

It runs inside GitHub Pull Requests and can also evaluate external agent-runtime artifacts, helping teams stop unsafe or low-quality changes before merge or release.

## Core Idea

AI can generate code.

System-19 decides whether that code is safe.

## What System-19 Does

- Reviews Pull Requests automatically
- Applies deterministic rule-based validation
- Computes:
  - Quality Score
  - Risk Score
  - Confidence Score
  - Blessing Score
- Returns a final decision:
  - APPROVE
  - REVISE
  - BLOCK

## Output Channels

System-19 publishes results through:

- Pull Request comment
- GitHub status check
- GitHub step summary
- JSON audit artifact
- PR labels

## Current Capabilities

- GitHub-native PR enforcement
- Config-aware rule engine
- Strict mode
- Local fixture runner
- Audit logging
- Rule packs
- Generic adapter base
- Adapter SDK
- OpenClaw-style runtime adapter
- LangGraph runtime adapter
- AutoGen runtime adapter
- CrewAI runtime adapter

## Rule Packs

System-19 uses modular rule packs:

- Core Pack → engineering safety rules
- Security Pack → secret exposure detection
- Performance Pack → large file heuristics

Rule packs are extensible and can evolve into domain-specific enforcement packs.

## Configuration

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
  - "docs/"

strictMode: false

labels:
  approve: "system-19:approve"
  revise: "system-19:revise"
  block: "system-19:block"                                                      Local Development                                                               npm install
npm run build
npm test
npm run review:fixture -- safe-refactor.json
npm run review:openclaw -- tests/fixtures/openclaw/auth-risk.json
npm run review:langgraph -- tests/fixtures/langgraph/api-risk.json
npm run review:autogen -- tests/fixtures/autogen/payment-risk.json
npm run review:crewai -- tests/fixtures/crewai/authz-risk.json                  GitHub Usage

Use System-19 as a GitHub Action on Pull Requests to publish a review comment, a status check, labels, and an audit artifact.

Adapter Strategy

System-19 is designed to sit above agent runtimes.

That means:
	•	OpenClaw / NemoClaw execute tasks
	•	LangGraph orchestrates graph-based flows
	•	AutoGen coordinates agent teams
	•	CrewAI coordinates specialized crews
	•	System-19 evaluates task output
	•	System-19 decides whether changes are safe enough to proceed

Adapter SDK

See:
	•	docs/sdk/adapter-sdk.md
	•	docs/contracts/

Philosophy

System-19 does not trust AI output.

System-19 verifies it.

Status

v0 includes:
	•	config-aware enforcement
	•	PR status checks
	•	audit artifacts
	•	smarter summaries
	•	decision labels
	•	strict mode
	•	local fixture review
	•	runtime adapter integration
	•	adapter SDK
	•	publish-ready OSS structure

Future Direction
	•	richer rule packs
	•	enterprise policy bundles
	•	cross-repo governance
	•	release gating and deployment policies

Contributing

See CONTRIBUTING.md.

Security

See SECURITY.md.

Support

See SUPPORT.md.

License

MIT
