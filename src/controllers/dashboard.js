
import Dashboard from '../client/pages/Dashboard';

import { Application } from '../models/index';
import formidable from 'formidable';

var form = new formidable.IncomingForm();

export default {
    dashboard: (req, res, next) => {
        if (req.user) {
            req.page = Dashboard;
            req.pageData = {
                user: req.user
            };
            next();
        } else {
            res.redirect('/login');
        }
    },

    submitApp: (req, res, next) => {
        // parse the incoming request containing the form data
        form.parse(req, function(err, fields, files) {
          console.log(fields)
        });
        // Log errors
        form.on('error', function(err) {
          console.log('An error has occured: \n' + err);
        });

        console.log("TESTING");
        res.redirect('/dashboard');
        next();
    }
};
