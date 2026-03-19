# System-19 Adapter Specification

---

## Goal

Define how to integrate any agent runtime with System-19.

---

## Adapter Responsibilities

An adapter must:

1. Extract runtime output
2. Convert it into System-19 event format
3. Call System-19
4. Handle response (log, block, retry, etc.)

---

## Adapter Flow

```text
Agent Runtime Output
        ↓
Adapter
        ↓
System-19 Input
        ↓
System-19 Review Engine
        ↓
Decision (APPROVE / REVISE / BLOCK)
        ↓
Adapter handles decision


⸻

Minimal Adapter Example

const input = mapRuntimeToSystem19(runtimeOutput)
const result = runReview(input)

if (result.decision === "BLOCK") {
  throw new Error("Blocked by System-19")
}


⸻

Supported Runtimes
	•	OpenClaw
	•	NemoClaw
	•	LangGraph
	•	Custom agent systems

⸻

Design Rule

Adapters should be thin.

System-19 owns enforcement logic.
