# System-19 Event Contract

This document defines how external agent runtimes integrate with System-19.

---

## Purpose

System-19 consumes a standardized artifact describing a code change and returns an enforcement decision.

---

## Required Fields

```json
{
  "runtime": "openclaw | nemoclaw | custom",
  "agentName": "string",
  "taskId": "string",
  "changedFiles": ["string"],
  "filePatches": [
    {
      "file": "string",
      "patch": "string"
    }
  ]
}


⸻

Optional Fields

{
  "repo": "string",
  "prNumber": "number",
  "testResults": {
    "status": "pass | fail | unknown",
    "summary": "string"
  },
  "metadata": {
    "key": "value"
  }
}


⸻

Output Contract

System-19 returns:

{
  "decision": "APPROVE | REVISE | BLOCK",
  "blessingScore": number,
  "violations": [],
  "requiredActions": []
}


⸻

Design Principles
	•	deterministic
	•	minimal required data
	•	runtime-agnostic
	•	no dependency on GitHub

⸻

Philosophy

System-19 does not execute tasks.

It evaluates their output.
