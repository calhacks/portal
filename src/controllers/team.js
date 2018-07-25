
import { User, Team } from '../models';

export default {
    submitTeam: (req, res, next) => {
        // Either the user wants to create a new team,
        // or they want to join an existing one. We have
        // to check for both

        Team.findOne({
            where: {
                name: req.body.name
            },
            include: {
                model: User
            }
        }).then(team => {
            if (team === null) {
                // No team found
                Team.create({
                    name: req.body.name
                }).then(newTeam => {
                    newTeam.addUser(req.user.id).then(result => {
                        res.redirect('/dashboard');
                    });
                });
            } else {
                // We gotta add to the team

            }
        });
    },

    teamPage: (req, res) => {
        User.findOne({
            where: { id: req.user.id },
            include: [
                { model: Team }
            ]
        }).then(user => {
            // res.render('team', { user: user.toJSON() })
            if (user.Team) {
                // user has a team
                Team.findOne({
                    where: { id: user.Team.id },
                    include: { model: User }
                }).then(team => {
                    res.render('team', {
                        user: {
                            ...user.toJSON(),
                            Team: team
                        }
                    });
                });
            }
        });
    }
};
