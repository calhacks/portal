
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import chain from 'chain-middleware';

import routes from './routes';
import template from '../template';
import policies from '../policies'

import App from '../client/App';

export default [
    // Router
    (req, res, next) => {

        let match = undefined;

        for (let route in routes) {
            const m = matchPath(req.path, {
                path: route,
                exact: true
            });
            if (m != undefined && m != null) {
                match = m;
                break;
            }
        }

        const method = req.method.toLowerCase();

        if (!match) {
            return res.status(404).send('page not found');
        } else if (!routes[match.path][method]) {
            return res.status(404).send('cannot ' + method + ' ' + req.path);
        } else if (policies[match.path] && policies[match.path][method]) {
            let funcs;
            if (typeof policies[match.path][method] === 'object') {
                funcs = policies[match.path][method].concat([routes[match.path][method]]);
            } else {
                funcs = [
                    policies[match.path][method],
                    routes[match.path][method]
                ];
            }
            chain(...funcs)(req, res, next);
        } else {
            routes[match.path][method](req, res, next);
        }
    },

    // Render intended route
    (req, res) => {
        const Component = req.page;

        const css = new Set();
        const context = { };

        if (!Component) {
            // Dont need to render anything
            return res.end();
        }

        const body = renderToString(
            <StaticRouter context={context}>
                <App pageData={{...req.pageData}} />
            </StaticRouter>
        );

        res.status(200).send(
            template({
                title: req.pageTitle,
                body,
                state: req.pageData,
                css,
            })
        );
    }
];
