
import Dashboard from '../client/pages/Dashboard';

export default {
    dashboard: (req, res, next) => {
        req.page = Dashboard;
        req.pageData = {
            user: req.user
        };
        next();
    }
};
