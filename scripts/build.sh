
# Builds the directory to ./dist.
# Run this script from the top directory (/portal)

# clean dist folder
if [ -d "./dist" ]; then
    echo "== CLEANING OUT DIST =="
    yes | rm -r dist
fi

# build node
echo "== TRANSPILING NODE =="
./node_modules/.bin/babel ./src -d dist

echo "== BUILT TO ./dist =="
