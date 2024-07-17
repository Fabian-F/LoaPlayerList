#!/bin/bash

git checkout gh-pages

git merge master

npm run build-ghpages

current_date=$(date +"%d_%m")

mv ./docs/browser/* ./docs

rmdir ./docs/browser

git add .
git commit -m "Build $current_date"

git push

git checkout master
