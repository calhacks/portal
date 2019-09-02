
import { User, Application, Team, CubStart } from '../models';
import { isNullOrUndefined } from 'util';

export default {
    cubstart5pts: {
        'Cal Hacks Website': 'Website',
        'Facebook': 'Facebook',
        'Instagram': 'Instagram',
        'LinkedIn': 'LinkedIn',
        'Twitter': 'Twitter',
        'Piazza': 'Piazza',
        'In-class announcement': 'IC Announcement',
        'A friend told me about it': 'Friend',
        'Other': 'other'
    },

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
        const createCubstartApp = (data) => {
            var cubstartApp = {};
            for (var i = 0; i < 5; i++) {
                cubstartApp['cubstart'+i.toString()] = data['cubstart'+i.toString()];
            }
            cubstartApp['cubstart5'] = [];
            for (var key in cubstart5pts) {
                if (!isNullOrUndefined(data['cubstart5-' + cubstart5pts[key]])) {
                    cubstartApp['cubstart5'].push(data['cubstart5-' + cubstart5pts[key]]);
                }
            }
            if (!isNullOrUndefined(data['cubstart5-other'])) {
                cubstartApp['cubstart5Other'] = data['cubstart5-other-text'];
            } else {
                cubstartApp['cubstart5Other'] = null;
            }
            return cubstartApp;
        };

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
                var cubstartApp = createCubstartApp(data);
                CubStart.create({
                    ...cubstartApp,
                    UserId: req.user.id
                }).then(newApp => {
                    // App has been created.
                    res.redirect('/dashboard');
                })
            } else {
                var cubstartApp = createCubstartApp(data);
                user.CubStart.updateAttributes(cubstartApp).then(newApp => {
                    // App has been saved.
                    res.redirect('/dashboard');
                })
            }
        });
    }
};
