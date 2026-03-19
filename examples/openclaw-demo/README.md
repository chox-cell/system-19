# System-19 OpenClaw Demo

This demo shows how System-19 evaluates an agent-generated code change.

## Run

```bash
npm install
npm run build

cd examples/openclaw-demo
./run-demo.sh

What happens
	•	loads OpenClaw-style artifact
	•	runs System-19 review
	•	prints decision

Expected Output

You should see:
	•	Decision (APPROVE / REVISE / BLOCK)
	•	Issues detected
	•	Required actions
