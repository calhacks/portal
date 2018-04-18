
import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';

import routes from './routes';
import template from '../template';

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
            res.status(404).send('page not found');
        } else if (!routes[match.path][method]) {
            res.status(404).send('cannot ' + method + ' ' + req.path);
        } else {
            routes[match.path][method](req, res, next);
        }
    },

    // Render intended route
    (req, res) => {
        const Component = req.page;
        const context = {};

        if (!Component) {
            // Dont need to render anything
            return res.end();
        }

        const body = renderToString(
            <StaticRouter context={context} location={req.url}>
                <Component data={{...req.pageData}} />
            </StaticRouter>
        );

        res.status(200).send(
            template({
                title: req.pageTitle,
                body,
                state: req.pageData
            })
        );
    }
];
