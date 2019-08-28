
# Builds the directory to ./public.
# Run this script from the top directory (/portal)

echo 'Building for:' $NODE_ENV
echo

# clean public folder
if [ -d "./public" ]; then
    echo "== CLEANING OUT PUBLIC =="
    yes | rm -r public
fi

# build node
echo "== TRANSPILING NODE =="
./node_modules/webpack/bin/webpack.js

echo "== BUILT TO ./public =="
