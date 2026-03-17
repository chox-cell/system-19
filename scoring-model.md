# SYSTEM-19 SCORING MODEL — v0

## Dimensions
- Quality: 0–100
- Risk: 0–100
- Confidence: 0–100

## Core Formula
```text
raw_score = quality_score + confidence_score - risk_score
blessing_score = normalize(raw_score, 0 → 100)
```

## Thresholds
- 85+ → APPROVE
- 65–84 → REVISE
- below 65 → BLOCK

## Hard Overrides
- failing tests → BLOCK
- missing migration for DB change → BLOCK
- multiple HIGH violations → BLOCK
- single HIGH violation → REVISE

## Scoring Intent
The score supports the decision but does not replace rule-based enforcement.
