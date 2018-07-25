
import { User, Application, Team } from '../models';

export default {
    dashboard: (req, res, next) => {
        User.findOne({
            where: { id: req.user.id },
            include: [
                { model: Application },
                { model: Team }
            ]
        }).then(user => {
            res.render('dashboard', { user: user.toJSON() })
        });
    }
};
