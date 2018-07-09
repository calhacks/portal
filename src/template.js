
export default ({ title, body, state, css = [] }) => {
    state = state || {};
    return `
        <!doctype html>
        <html>
        <head>
            <title>${title}</title>
            <style type='text/css'>
                /* Jank way to prevent fouc */
                #root { display: none; }
            </style>
        </head>
        <body>
            <div id="root">${body}</div>
            <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
            </script>
            <script src="bundle.js"></script>
        </body>
        </html>
    `
};
