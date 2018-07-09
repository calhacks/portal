
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
                    name: req.body.name,
                    UserId: req.user.id
                }).then(newTeam => {
                    console.log(newTeam);
                    res.send('/dashboard');
                });
            } else {
                res.send('/dashboard');
            }
        });
    }
};
