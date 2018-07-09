
import { User, Application, Team } from '../models';

export default {
    dashboard: (req, res, next) => {
        if (req.user) {
            User.findOne({
                where: { id: req.user.id },
                include: [
                    { model: Application },
                    { model: Team }
                ]
            }).then(user => {
                req.pageData = { user };
                next();
            });
        } else {
            res.redirect('/login');
        }
    }
};
