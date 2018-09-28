
import { User, Application, Team, CubStart } from '../models';

export default {
    dashboard: (req, res, next) => {
        User.findOne({
            where: { id: req.user.id },
            include: [
                { model: Application },
                { model: Team, include: [User] },
                { model: CubStart },
            ]
        }).then(user => {
            if (user.role === 'hacker') {
                res.render('dashboard', { user: user.toJSON() });
            } else if (user.role === 'admin') {
                res.render('adminDashboard', {
                    user: user.toJSON()
                });
            }
        });
    }
};
