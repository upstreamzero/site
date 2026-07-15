#!/bin/sh
# Install repository git hooks (one-time per clone).
cd "$(dirname "$0")/.." || exit 1
cp scripts/git-hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
echo "pre-commit safety hook installed."
