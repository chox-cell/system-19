# System-19 Adapter SDK

The Adapter SDK helps runtime authors integrate System-19 without duplicating enforcement logic.

## Goal

Convert runtime-specific artifacts into `ReviewInput`, then pass them into the System-19 core.

## Components

- `RuntimeAdapter<TArtifact>`
- `AdapterContext`
- `runAdapterFromFile()`

## Principle

Runtimes execute work.

System-19 evaluates the result.
