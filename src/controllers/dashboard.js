
import Dashboard from '../client/pages/Dashboard';

export default {
    dashboard: (req, res, next) => {
        if (req.user) {
            req.page = Dashboard;
            req.pageData = {
                user: req.user
            }
            next();
        } else {
            res.redirect('/login');
        }
    }
};
