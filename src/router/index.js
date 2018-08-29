
import chain from 'chain-middleware';

import routes from './routes';
import policies from '../policies'

// import App from '../client/App';

export default [
    // Router
    (req, res, next) => {
        // Get URL of request
        const path = req.path;
        const method = req.method.toLowerCase();

        // Does a route match? If not 404
        const target = routes[path];
        if (!target) {
            return res.status(404).render('fourOhFour');
        }

        // Does method match? If not 404
        const action = target[method];
        if (!action) {
            return res.status(404).send('cannot ' + method + ' ' + req.path);
        }

        // Go through policies if they are defined on this route + method
        if (policies[path] && policies[path][method]) {
            let funcs;
            if (typeof policies[path][method] === 'object') {
                // Iterate through list of middleware
                funcs = policies[path][method].concat([routes[path][method]]);
            } else {
                funcs = [
                    policies[path][method],
                    routes[path][method]
                ];
            }

            chain(...funcs)(req, res, next);
        } else {
            routes[path][method](req, res, next);
        }
    }
];
