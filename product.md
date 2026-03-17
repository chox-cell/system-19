# SYSTEM-19 PRODUCT — v0

## Product Definition
System-19 v0 is a GitHub Action that reviews AI-generated code changes and produces a deterministic merge recommendation.

## Inputs
- PR diff
- changed files
- optional test results

## Outputs
- decision
- blessing score
- score breakdown
- violations
- required actions

## What It Does
- checks policy violations
- estimates risk
- evaluates quality signals
- posts a structured PR review comment

## What It Does Not Do
- write code
- auto-fix code
- auto-merge
- auto-deploy

## Core Promise
Stop unsafe AI-generated changes before merge.
