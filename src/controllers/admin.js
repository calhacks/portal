
import Sequelize from 'sequelize';
import { User, Application, Team, CubStart } from '../models';
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

    // GET to Scoring Tool Page
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

            ' order by u.id limit 1 offset ' + req.query.id + ';';

        console.log(query);

        sequelize.query(query).spread((results, meta) => {
            res.json(results);
        });
    },

    // POST to save scores/ data
};
