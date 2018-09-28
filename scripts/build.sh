
# Builds the directory to ./dist.
# Run this script from the top directory (/portal)

echo 'Building for:' $NODE_ENV
echo

# clean dist folder
if [ -d "./dist" ]; then
    echo "== CLEANING OUT DIST =="
    yes | rm -r dist
fi

# build node
echo "== TRANSPILING NODE =="
./node_modules/webpack/bin/webpack.js

echo "== BUILT TO ./dist =="
