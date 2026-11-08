#!/bin/sh
set -eu
cd "$(dirname "$0")/../../.."
evidence=docs/exploratory-testing/2026-11-08-textkit
cleanup() {
  printf '%s\n' 'No background processes, browsers, listeners, containers, images, or volumes were started by this run.' > "$evidence/teardown.txt"
}
trap cleanup EXIT HUP INT TERM
node "$evidence/replay.mjs" > "$evidence/run-1.jsonl"
node "$evidence/replay.mjs" > "$evidence/run-2.jsonl"
cmp "$evidence/run-1.jsonl" "$evidence/run-2.jsonl"
