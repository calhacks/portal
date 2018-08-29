
import { User, Application, Team, CubStart } from '../models';

export default {
    cubstart: (req, res, next) => {
        User.findOne({
            where: { id: req.user.id },
            include: [
                { model: Application },
                { model: CubStart },
                { model: Team, include: [User] }
            ]
        }).then(user => {
            res.render('cubstart', { user: user.toJSON() })
        });
    },

    submitApp: (req, res, next) => {
        var data = req.body;
        User.findOne({
            where: { id: req.user.id },
            include: { model: CubStart }
        }).then(user => {
            if (data['toggle-cubstart'] == 'no') {
                // If there's a CubStart app associated with this
                // user, delete it
                user.setCubStart(null).then(() => {
                    res.redirect('/dashboard');
                });
            } else if (user.CubStart === null) {
                CubStart.create({
                    ...data,
                    UserId: req.user.id
                }).then(newApp => {
                    // App has been created.
                    res.redirect('/dashboard');
                })
            } else {
                user.CubStart.updateAttributes(data).then(newApp => {
                    // App has been saved.
                    res.redirect('/dashboard');
                })
            }
        });
    }
};
