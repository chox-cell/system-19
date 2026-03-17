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

## v0 Scope

- GitHub Action
- TypeScript-first repositories
- PR diff analysis
- No auto-fix
- No auto-merge
- Human remains final authority

## Core Idea

System-19 does not generate code.

System-19 judges code.

## Planned Checks

- No unsafe TypeScript
- No DB change without migration
- No merge if tests fail
- No sensitive system change without tests
- No incomplete change
- No silent breaking risk

## Project Structure

- `docs/` → strategy and SSOT
- `src/` → enforcement engine
- `tests/` → fixtures and validation

## Status

v0 scaffold in progress.
