#!/bin/bash

# Check if a remote URL is provided
if [ -z "$1" ]; then
    echo "Error: No remote repository URL provided."
    echo "Usage: ./deploy_to_github.sh <YOUR_GITHUB_REPO_URL>"
    echo "Example: ./deploy_to_github.sh https://github.com/my-username/persona-v2-system.git"
    exit 1
fi

REMOTE_URL=$1

echo "Adding remote origin: $REMOTE_URL"
git remote add origin "$REMOTE_URL"

echo "Renaming branch to main..."
git branch -M main

echo "Pushing to remote..."
git push -u origin main

echo "Deployment complete!"
