#!/usr/bin/env bash
set -euo pipefail

AWS_PROFILE="${AWS_PROFILE:-rainer}"
AWS_REGION="${AWS_REGION:-eu-central-1}"
export AWS_PROFILE
export AWS_REGION

APP_DIR="$(cd "$(dirname "$0")/../app/.output/public" && pwd)"
INFRA_DIR="$(cd "$(dirname "$0")/../infra" && pwd)"
STACK_NAME="SmoothOperatorStack"

get_output() {
  local key="$1"
  aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$AWS_REGION" \
    --query "Stacks[0].Outputs[?OutputKey=='$key'].OutputValue" \
    --output text
}

deploy_infra() {
  echo "Deploying infrastructure..."
  cd "$INFRA_DIR"
  npx cdk deploy --require-approval never
}

sync_site() {
  local bucket_name
  bucket_name=$(get_output SiteBucketName)
  echo "Syncing static site to s3://$bucket_name ..."
  aws s3 sync "$APP_DIR/" "s3://$bucket_name/" --delete --region "$AWS_REGION"
}

invalidate_cache() {
  local distribution_id
  distribution_id=$(get_output DistributionId)
  echo "Invalidating CloudFront distribution $distribution_id ..."
  aws cloudfront create-invalidation \
    --distribution-id "$distribution_id" \
    --paths "/*" \
    --region us-east-1 \
    --no-cli-pager
}

case "${1:-}" in
  infra)
    deploy_infra
    ;;
  sync)
    sync_site
    ;;
  invalidate)
    invalidate_cache
    ;;
  deploy)
    deploy_infra
    sync_site
    invalidate_cache
    echo "Deploy complete."
    ;;
  *)
    echo "Usage: $0 {infra|sync|invalidate|deploy}"
    exit 1
    ;;
esac
