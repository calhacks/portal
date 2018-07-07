
# Watches for changes in src directory.
# Run this script from the top directory (/portal)

# Side-effect: this actually builds to ./dist, so it's not
# like webpack-dev-server. SSR doesn't play nice with that
# so we're just shoving it into a dist folder and watching
# for changes

parallelshell "webpack --watch --display verbose" "nodemon --delay 1 ./dist/server.js"
