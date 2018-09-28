
# Watches for changes in src directory.
# Run this script from the top directory (/portal)

yes | rm -r dist
npx npm-run-all --parallel watch:client watch:server
