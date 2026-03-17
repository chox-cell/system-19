# SYSTEM-19 — REVIEW SPEC v0
**AI Code Enforcement Review Engine**

---

# 1. Purpose

Define how System-19 evaluates AI-generated code changes and produces a deterministic decision:

- APPROVE
- REVISE
- BLOCK

This spec governs **how a Pull Request is analyzed, scored, and judged**.

---

# 2. Trigger

System-19 is triggered when:

- A Pull Request (PR) is opened
- A PR is updated (new commits)
- A PR is marked ready for review

---

# 3. Input Specification

## Required Inputs

```json
{
  "repo": "string",
  "pr_number": "number",
  "diff": "string",
  "changed_files": ["string"],
  "file_patches": [
    {
      "file": "string",
      "patch": "string"
    }
  ]
}
```

## Optional Inputs

```json
{
  "test_results": {
    "status": "pass | fail | unknown",
    "summary": "string"
  },
  "labels": ["ai-generated", "manual"],
  "author_type": "ai | human | unknown"
}
```

---

# 4. Processing Pipeline

```text
1. Parse Input
2. Classify Changes
3. Run Policy Checks
4. Run Quality Analysis
5. Run Risk Analysis
6. Compute Scores
7. Apply Overrides
8. Generate Decision
9. Generate Report
10. Post PR Comment
```

---

# 5. Change Classification

System-19 must classify the PR into categories:

- CODE_CHANGE
- TEST_CHANGE
- CONFIG_CHANGE
- DB_CHANGE
- CRITICAL_SYSTEM_CHANGE

## Detection Rules

- DB_CHANGE → schema files, migrations, SQL
- CRITICAL_SYSTEM_CHANGE → auth, payments, permissions, env
- TEST_CHANGE → test directories/files
- CONFIG_CHANGE → env/config files

---

# 6. Policy Checks (Hard Rules)

## RULE-01: Unsafe TypeScript
Detect:
- `any`
- `@ts-ignore`
- `@ts-nocheck`

→ Violation: MEDIUM

## RULE-02: DB Change Without Migration
If DB_CHANGE detected and no migration file present:

→ Violation: CRITICAL
→ Force: BLOCK

## RULE-03: Failing Tests
If test_results.status == "fail":

→ Violation: CRITICAL
→ Force: BLOCK

## RULE-04: Sensitive System Change Without Tests
If CRITICAL_SYSTEM_CHANGE and no TEST_CHANGE:

→ Violation: HIGH

## RULE-05: Incomplete Change
If logic change detected but:
- no tests
- no related updates

→ Violation: HIGH

## RULE-06: Silent Breaking Risk
If change affects:
- shared types
- APIs
- DB schema

→ Violation: HIGH

---

# 7. Quality Analysis

## Metrics

- Type Safety Score
- Test Coverage Presence
- Code Consistency
- Change Completeness

## Output

```json
{
  "quality_score": "0-100"
}
```

---

# 8. Risk Analysis

## Metrics

- Breaking Change Risk
- DB Risk
- Security Risk
- Critical System Impact

## Output

```json
{
  "risk_score": "0-100"
}
```

---

# 9. Confidence Score

Derived from:

- clarity of changes
- presence of tests
- consistency of logic

```json
{
  "confidence_score": "0-100"
}
```

---

# 10. Scoring Model

## Formula

```text
raw_score = quality_score + confidence_score - risk_score
blessing_score = normalize(raw_score, 0 → 100)
```

---

# 11. Decision Engine

## Thresholds

| Score | Decision |
|------|--------|
| ≥ 85 | APPROVE |
| 65–84 | REVISE |
| < 65 | BLOCK |

## Override Rules (Priority)

- CRITICAL violation → BLOCK
- Multiple HIGH violations → BLOCK
- HIGH violation → REVISE

---

# 12. Violations Format

Each violation must include:

```json
{
  "rule": "RULE-XX",
  "severity": "LOW | MEDIUM | HIGH | CRITICAL",
  "file": "string",
  "message": "string",
  "suggested_fix": "string"
}
```

---

# 13. Output Report

## Final Output

```json
{
  "decision": "APPROVE | REVISE | BLOCK",
  "blessing_score": "0-100",
  "quality_score": "0-100",
  "risk_score": "0-100",
  "confidence_score": "0-100",
  "violations": [],
  "summary": "string",
  "required_actions": []
}
```

---

# 14. PR Comment Format

System-19 posts a structured comment:

```text
System-19 Review

Decision: REVISE
Blessing Score: 72

Quality: 81
Risk: 38
Confidence: 76

Issues Detected:
- Unsafe TypeScript usage in auth.ts
- Missing test for login flow

Required Actions:
- Replace `any` with strict types
- Add regression test for login

Status: Changes required before merge
```

---

# 15. Execution Constraints

- Must run under 30 seconds
- Must not modify code
- Must not auto-merge
- Must not auto-fix
- Must be deterministic

---

# 16. Failure Handling

## If analysis fails:
- Return REVISE
- Add message: "System-19 could not fully evaluate this PR"

## If input is incomplete:
- Return REVISE

---

# 17. Logging (Audit)

Each run must log:

```json
{
  "pr_number": "",
  "decision": "",
  "scores": {},
  "violations": [],
  "timestamp": ""
}
```

---

# 18. Definition of Done

System-19 review is complete when:

- All checks executed
- Decision generated
- PR comment posted
- Audit log stored

---

# 19. Final Statement

System-19 does not generate code.
System-19 judges code.

Every PR must pass through System-19 before merge.
