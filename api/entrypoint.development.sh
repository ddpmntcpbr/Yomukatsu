#!/bin/bash
set -e

# デバッグ用コメント
echo "Start /api/entrypoint.development.sh"

# Remove a potentially pre-existing server.pid for Rails.
rm -f /myapp/tmp/pids/server.pid

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"