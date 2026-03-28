#!/bin/bash
# App: app-factory
# File: list-profiles.sh
# Version: 0.1.0
# Turns: 7
# Author: AI Coding Agent (Claude Opus 4.5)
# Date: 2026-03-28T21:15:00Z
# Description: List tech-stack-profiles with optional category filter
# Log:
# 7, 0.1.0, 2026/03/28, 09:15 PM, Claude Opus 4.5

set -euo pipefail

PROFILES_DIR="${1:-./tech-stack-profiles}"
CATEGORY="${2:-all}"

if [ ! -d "$PROFILES_DIR" ]; then
  echo "Error: tech-stack-profiles directory not found at $PROFILES_DIR"
  exit 1
fi

# Function to extract YAML field using grep/sed (no yq dependency)
extract_field() {
  local file="$1"
  local field="$2"
  grep -E "^\s*${field}:" "$file" 2>/dev/null | head -1 | sed "s/.*${field}:\s*//" | tr -d '"' | tr -d "'"
}

# Function to list profiles in a category
list_category() {
  local cat_name="$1"
  local cat_dir="$PROFILES_DIR/$cat_name"

  if [ ! -d "$cat_dir" ]; then
    return
  fi

  local count=$(ls -1 "$cat_dir"/*.yaml 2>/dev/null | wc -l | tr -d ' ')

  if [ "$count" -eq 0 ]; then
    return
  fi

  echo ""
  echo "## $cat_name ($count profiles)"
  echo ""

  case "$cat_name" in
    backend)
      echo "| ID | Platform | Language | Framework |"
      echo "|----|----------|----------|-----------|"
      ;;
    ui)
      echo "| ID | Framework | Bundler |"
      echo "|----|-----------|---------|"
      ;;
    persistence)
      echo "| ID | Engine | Model |"
      echo "|----|--------|-------|"
      ;;
    iac)
      echo "| ID | Tool | Platform |"
      echo "|----|------|----------|"
      ;;
    stacks)
      echo "| ID | Backend Ref | UI Ref |"
      echo "|----|-------------|--------|"
      ;;
  esac

  for file in "$cat_dir"/*.yaml; do
    [ -f "$file" ] || continue

    local id=$(extract_field "$file" "id")
    [ -z "$id" ] && id=$(basename "$file" .yaml)

    case "$cat_name" in
      backend)
        local platform=$(extract_field "$file" "platform")
        local language=$(extract_field "$file" "language")
        local framework=$(extract_field "$file" "framework")
        echo "| $id | $platform | $language | $framework |"
        ;;
      ui)
        local framework=$(extract_field "$file" "framework")
        local bundler=$(extract_field "$file" "bundler")
        echo "| $id | $framework | $bundler |"
        ;;
      persistence)
        local engine=$(extract_field "$file" "engine")
        local model=$(extract_field "$file" "model")
        echo "| $id | $engine | $model |"
        ;;
      iac)
        local tool=$(extract_field "$file" "tool")
        local platform=$(extract_field "$file" "platform")
        echo "| $id | $tool | $platform |"
        ;;
      stacks)
        local backend=$(extract_field "$file" "backendProfileRef")
        local ui=$(extract_field "$file" "uiProfileRef")
        echo "| $id | $backend | $ui |"
        ;;
    esac
  done
}

# Header
echo "═══════════════════════════════════════════════════════════════════════"
if [ "$CATEGORY" = "all" ]; then
  echo "  TECH STACK PROFILES"
else
  echo "  TECH STACK PROFILES — ${CATEGORY^}"
fi
echo "═══════════════════════════════════════════════════════════════════════"

# List categories
if [ "$CATEGORY" = "all" ]; then
  for cat in backend ui persistence iac stacks; do
    list_category "$cat"
  done
else
  list_category "$CATEGORY"
fi

# Footer with total count
echo ""
echo "═══════════════════════════════════════════════════════════════════════"
if [ "$CATEGORY" = "all" ]; then
  total=$(find "$PROFILES_DIR" -name "*.yaml" -type f | wc -l | tr -d ' ')
  echo "  Total: $total profiles across 5 categories"
else
  total=$(find "$PROFILES_DIR/$CATEGORY" -name "*.yaml" -type f 2>/dev/null | wc -l | tr -d ' ')
  echo "  $total $CATEGORY profiles"
fi
echo "═══════════════════════════════════════════════════════════════════════"
