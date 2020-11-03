#!/bin/bash

if [ -z "$(git status --porcelain)" ]; then
    git checkout master
    git pull
    yarn release
else
    git status --porcelain
    echo "🔼 Working directory not clean";
    exit 1
fi
