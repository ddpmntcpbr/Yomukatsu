#!/bin/bash
set -e

# デバッグ用コメント
echo "Start /api/entrypoint.staging.sh"
rm -f /myapp/tmp/pids/server.pid
bin/setup
bundle exec pumactl start
curl -I localhost:3000/api/v1/health_check
