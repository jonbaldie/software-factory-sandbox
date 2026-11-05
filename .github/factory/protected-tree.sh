#!/usr/bin/env bash
set -euo pipefail
export GIT_NO_REPLACE_OBJECTS=1

case "${1:-}" in
  capture-revision)
    git rev-parse --verify "$2^{tree}"
    ;;
  capture-index)
    if [ -n "$(git diff --name-only --diff-filter=U -- .github)" ]; then
      echo "Protected files have merge conflicts" >&2
      exit 1
    fi
    tmp=$(mktemp -d)
    trap 'rm -rf "$tmp"' EXIT
    export GIT_INDEX_FILE="$tmp/index"
    git read-tree --empty
    env -u GIT_INDEX_FILE git ls-files --stage -z -- .github | git update-index -z --index-info
    git write-tree
    ;;
  clean)
    [ -z "$(git status --porcelain -- .github)" ]
    ;;
  verify)
    git fsck --full --no-reflogs --no-dangling >/dev/null
    baseline=$2
    if [ "$#" -eq 4 ]; then
      current=$(git merge-base HEAD "$4")
      if git merge-base --is-ancestor "$3" "$current"; then
        baseline=$current
      fi
    fi
    if git diff --cached --quiet "$baseline" -- .github; then exit 0; fi
    git diff --cached --name-only "$baseline" -- .github
    exit 1
    ;;
  *)
    echo "Usage: protected-tree.sh capture-revision REV | capture-index | clean | verify TREE [BASE START]" >&2
    exit 2
    ;;
esac
