
# Watches for changes in src directory.
# Run this script from the top directory (/portal)

# Side-effect: this actually builds to ./dist, so it's not
# like webpack-dev-server. SSR doesn't play nice with that
# so we're just shoving it into a dist folder and watching
# for changes

./node_modules/parallelshell/index.js \
"./node_modules/.bin/babel ./src -d dist --watch" \
"./node_modules/.bin/webpack --watch" \
"./node_modules/nodemon/bin/nodemon.js --delay 1 ./dist/app.js"