
import { User, Application, Team } from '../models';

export default {
    cubstart: (req, res, next) => {
        User.findOne({
            where: { id: req.user.id },
            include: [
                { model: Application },
                { model: Team, include: [User] }
            ]
        }).then(user => {
            res.render('cubstart', { user: user.toJSON() })
        });
    },

    submitApp: (req, res, next) => {
        User.findOne({
            where: { id: req.user.id },
            include: { model: Application }
        }).then(user => {
            if (user.Application === null) {
                Application.create({
                    ...req.body,
                    UserId: req.user.id
                }).then(newApp => {
                    // App has been created.
                    res.redirect('/dashboard');
                })
            } else {
                user.Application.updateAttributes(req.body).then(newApp => {
                    // App has been saved.
                    console.log(req.body)
                    res.redirect('/dashboard');
                })
            }
        });
    }
};
