
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
                        res.redirect('/dashboard#team');
                    });
                });
            } else {
                // We gotta add to the team
                if (team.Users.length < 4) {
                    // We can add to the team.
                    team.addUser(req.user.id).then(result => {
                        res.redirect('/dashboard#team');
                    });
                } else {
                    // Team has too many members.
                    req.flash('error', 'That team is already at the maximum of 4 members.');
                }
            }
        });
    },

    leaveTeam: (req, res, next) => {
        // User leaves team.

        User.findOne({
            where: { id: req.user.id },
            include: { model: Team }
        }).then(user => {
            user.setTeam(null).then(teams => {
                res.redirect('/dashboard#team');
            });
        })
    }
};
