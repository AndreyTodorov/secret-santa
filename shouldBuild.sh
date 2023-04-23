#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"
echo "VERCEL_GIT_COMMIT_MESSAGE: $VERCEL_GIT_COMMIT_MESSAGE"

if [[ "$VERCEL_GIT_COMMIT_REF" == "main" && echo "$VERCEL_GIT_COMMIT_MESSAGE" | grep -v "chore(release)"  ]] ; then
  # Proceed with the build
  echo "✅ - Building main can proceed"
  exit 1;

elif [[ "$VERCEL_GIT_COMMIT_REF" == "dev" ]] ; then
  # Proceed with the build
  echo "✅ - Build dev can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi