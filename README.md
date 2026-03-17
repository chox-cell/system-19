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

## Install

Add the workflow:

```yaml
name: System-19 PR Review

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

permissions:
  contents: read
  pull-requests: write

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install
      - run: npm run build

      - uses: ./
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          test-status: unknown
          comment-mode: pr-comment                                              Local Development                                                               npm install
npm run build
npm test                                                                        Project Structure
	•	docs/ → strategy and SSOT
	•	src/ → enforcement engine
	•	tests/ → fixtures and validation

Status

v0 real GitHub PR integration in progress.
