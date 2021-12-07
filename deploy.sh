#/!bin/bash

lerna run build --scope=molecule-demo

echo "Build molecule-demo success"

lerna run build --scope=online-code-formatting

echo "Build online-code-formatting success"

yarn gh-pages

echo "Deploy gh-pages success"

