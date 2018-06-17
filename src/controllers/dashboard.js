
import ValidateEmail from '../client/pages/ValidateEmail'
import Dashboard from '../client/pages/Dashboard';

import { User, Application } from '../models';

export default {
    dashboard: (req, res, next) => {
        if (req.user) {
            User.findOne({
                where: { id: req.user.id },
                include: { model: Application }
            }).then(user => {
                req.page = Dashboard;
                req.pageData = { user };
                next();
            });
        } else {
            res.redirect('/login');
        }
    }
};
