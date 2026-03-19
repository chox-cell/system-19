#!/bin/bash

echo "Running System-19 CrewAI Demo..."

npm run review:crewai -- tests/fixtures/crewai/authz-risk.json

echo ""
echo "CrewAI demo complete."
