
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
            res.render('dashboard', { user: user.toJSON() })
        });
    }
};
