
import Sequelize from 'sequelize';
import { User, Application, Team, CubStart, ApplicationScore } from '../models';
var config = require('../config/sequelize').default[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

export default {
    stats: (req, res, next) => {
        const queries = {
            numUsers: 'SELECT COUNT(*) FROM Users',
            numTeams: 'SELECT COUNT(*) FROM Teams',
            numCubStart: 'SELECT COUNT(*) FROM CubStarts',
            numApps: 'SELECT COUNT(*) FROM Applications',
        }

        // executes all queries and puts them in a promise
        Promise.all(Object.keys(queries).map(query => new Promise(resolve => {
            sequelize.query(queries[query]).spread((results, meta) => {
                resolve({
                    [query]: results[Object.keys(results)[0]],
                });
            });
        }))).then(results => {
            res.json(results);
        });
    },

    roster: (req, res, next) => {
        User.findAll({ where: { role: 'admin' } }).then(users => {
            res.json(users);
        });
    },

    deify: (req, res, next) => {
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    res.redirect('/dashboard#roster');
                } else {
                    user.updateAttributes({
                        role: 'admin',
                    }).then(user => {
                        res.redirect('/dashboard#roster');
                    });
                }

            });
    },

    postScore: (req, res, next) => {
        ApplicationScore.findOne({
            director: req.user.id,
            ApplicationId: req.body.ApplicationId
        }).then(score => {
            if (score) {
                score.updateAttributes({ ...req.body }).then(newScore => {
                    res.send(newScore);
                });
            } else {
                ApplicationScore.create({ ...req.body }).then(newScore =>{
                    res.send(newScore);
                });
            }
        });
    },

    getScore: (req, res, next) => {
        ApplicationScore.findOne({
            where: {
                director: req.user.id,
                ApplicationId: req.query.appId,
            }
        }).then(score => {
            res.json(score);
        }).catch(err => {
            res.send(err);
        });
    },

    findApp: (req, res, next) => {
        const val = req.query.query.toLowerCase();
        const to = parseInt(val);

        if (val.indexOf('@') != -1) {
            User.findOne({
                where: {
                    email: val.trim()
                }
            }).then(user => {
                Application.findOne({
                    where: {
                        UserId: user.id,
                    }
                }).then(app => {
                    if (app) {
                        sequelize.query(
                            'select id from Applications ' +
                            'where transportation="' + app.transportation + '" ' +
                            'order by id;'
                        ).spread((results, meta) => {
                            for (let i = 0; i < results.length; i++) {
                                if (results[i].id == app.id) {
                                    res.json({
                                        location: req.query.location,
                                        appIndex: i
                                    });
                                    return;
                                }
                            }
                            res.json({});
                            return;
                        })
                    } else {
                        res.json({});
                        return;
                    }
                });
            });
        } else if (isNaN(to)) {
            // searching "oos 5" or something
            const components = val.split(' ');
            if (components.length == 1 || components.length == 0) {
                res.json({});
                return;
            }
            if (
                components[0] == 'oos' ||
                components[0] == 'ooa' ||
                components[0] == 'berkeley'
            ) {
                // oos app
                const ix = parseInt(components[1]);
                if (isNaN(ix)) {
                    res.json({});
                    return;
                }

                res.json({
                    location: components[0],
                    appIndex: ix,
                });
            } else {
                res.json({});
            }
        } else {
            res.json({});
            return;
        }
    },

    scoring: (req, res, next) => {
        User.findOne({
            where: { id: req.user.id }
        }).then(user => {
            if (user.role === 'admin') {
                res.render('scoring', {
                    user: user.toJSON()
                });
            } else {
              console.log("FAIL");
              res.render('fourOhFour');
            }
        });
    },

    // Get a User's App
    getApp: (req, res, next) => {
        const conditions = [
            'u.id=a.UserId',
        ];

        if (!['oos', 'ooa', 'all', 'berkeley'].includes(req.query.location)) {
            res.json({});
            return;
        } else if (req.query.location !== 'all') {
            conditions.push(
                'a.transportation="' + req.query.location + '"',
            );
        }

        // hot query
        const query =
            'select ' +

            'u.id id,' +
            'u.firstname firstname, ' +
            'u.lastname lastname, ' +
            'u.email email, ' +
            'a.gender gender, ' +
            'a.genderOther genderOther, ' +
            'a.school school, ' +
            'a.year year, ' +
            'a.bday bday, ' +
            'a.race race, ' +
            'a.raceOther raceOther, ' +
            'a.major major, ' +
            'a.transportation transportation, ' +
            'a.links links, ' +
            'a.hackathons hackathons, ' +
            'a.hearAbout hearAbout, ' +
            'a.question1 question1, ' +
            'a.question2 question2, ' +
            'a.question3 question3, ' +
            'a.beginner beginner, ' +
            'a.createdAt createdAt ' +

            'from ' +
            'Users u, ' +
            'Applications a ' +

            'where ' +
            conditions.join(' and ') +

            ' order by a.id limit 1 offset ' + req.query.id + ';';

        console.log(query);

        sequelize.query(query).spread((results, meta) => {
            res.json(results);
        });
    },

    // POST to save scores/ data
};
