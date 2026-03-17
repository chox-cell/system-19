# SYSTEM-19 LAWS — v0

## LAW-01: No Unsafe TypeScript
Flag `any`, `@ts-ignore`, and `@ts-nocheck`.

## LAW-02: No DB Change Without Migration
If schema-related files change, a migration must exist.

## LAW-03: No Merge On Failing Tests
Explicit failing tests force BLOCK.

## LAW-04: Sensitive Change Requires Validation
Changes to auth, billing, permissions, or config require stronger scrutiny and usually test coverage.

## LAW-05: No Incomplete Logic Changes
Logic changes without related tests or supporting updates must be flagged.

## LAW-06: No Silent Breaking Risk
Changes affecting shared contracts, public API surface, or schema boundaries must be flagged when risk is not explicitly addressed.

## Enforcement Rule
Critical violations override score and force BLOCK.
