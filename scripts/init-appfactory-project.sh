#!/usr/bin/env bash
# init-appfactory-project.sh - Initialize a new AppFactory project
# Usage: init-appfactory-project.sh <target_directory> <project_id>

set -euo pipefail

TARGET_DIR="$1"
PROJECT_ID="$2"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_FACTORY_HOME="${APP_FACTORY_HOME:-$(dirname "$SCRIPT_DIR")}"

echo "=== AppFactory Project Initialization ==="
echo "Project ID: $PROJECT_ID"
echo "Target Directory: $TARGET_DIR"
echo "AppFactory Home: $APP_FACTORY_HOME"

# Verify project YAML exists
PROJECT_YAML="$APP_FACTORY_HOME/projects/${PROJECT_ID}.yaml"
if [[ ! -f "$PROJECT_YAML" ]]; then
  echo "ERROR: Project YAML not found: $PROJECT_YAML"
  exit 1
fi
echo "Project YAML: $PROJECT_YAML"

# Create target directory structure
echo ""
echo "Creating directory structure..."
mkdir -p "$TARGET_DIR"
mkdir -p "$TARGET_DIR/.appfactory"
mkdir -p "$TARGET_DIR/ai/specs"
mkdir -p "$TARGET_DIR/ai/docs"

# Export variables for af-state.sh
export AF_PROJECT_ROOT="$TARGET_DIR"
export APP_FACTORY_HOME="$APP_FACTORY_HOME"
export AF_AGENT="claude"

# Source state utilities and initialize
source "$SCRIPT_DIR/af-state.sh"
af_state_init "$PROJECT_ID"

# Mark init stage as complete
af_state_stage_done "init"

echo ""
echo "=== Project Initialized Successfully ==="
echo "Target: $TARGET_DIR"
echo "State: $TARGET_DIR/.appfactory/state.yaml"
echo ""
echo "Next steps:"
echo "  cd $TARGET_DIR"
echo "  /af-be-build-prd"
