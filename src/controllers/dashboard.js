
import Dashboard from '../client/pages/Dashboard';

export default {
    dashboard: (req, res, next) => {
        req.page = Dashboard;
        next();
    }
};
