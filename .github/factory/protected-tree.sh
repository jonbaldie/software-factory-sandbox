#!/usr/bin/env bash
set -euo pipefail
export GIT_NO_REPLACE_OBJECTS=1

history_digest() {
  git -c core.commitGraph=false rev-list --parents "$1" | sha256sum | cut -d' ' -f1
}

case "${1:-}" in
  capture-revision)
    git rev-parse --verify "$2^{tree}"
    ;;
  capture-history)
    history_digest "$2"
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
    if [ "$#" -ne 2 ] && [ "$#" -ne 5 ]; then exit 2; fi
    baseline=$2
    if [ "$#" -eq 5 ]; then
      [ "$(history_digest "$4")" = "$5" ]
      current=$(git -c core.commitGraph=false merge-base HEAD "$4")
      if git -c core.commitGraph=false merge-base --is-ancestor "$3" "$current"; then
        [ "$(git cat-file commit "$current" | git hash-object -t commit --stdin)" = "$current" ]
        baseline=$current
      fi
    fi
    root=$(git rev-parse --verify "$baseline^{tree}")
    verify_tree() {
      [ "$(git cat-file tree "$1" | git hash-object -t tree --stdin)" = "$1" ]
    }
    verify_tree "$root"
    objects=$(git ls-tree -r -t --format='%(objecttype) %(objectname)' "$root" -- .github)
    while read -r type oid; do
      if [ "$type" = tree ]; then verify_tree "$oid"; fi
    done <<< "$objects"
    if git diff --cached --quiet "$baseline" -- .github; then exit 0; fi
    git diff --cached --name-only "$baseline" -- .github
    exit 1
    ;;
  *)
    echo "Usage: protected-tree.sh capture-revision REV | capture-history REV | capture-index | clean | verify TREE [BASE START HISTORY]" >&2
    exit 2
    ;;
esac
