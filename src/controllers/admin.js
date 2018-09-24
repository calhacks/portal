
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
      // console.log("-----------------------------------");
      // console.log(req['body']['id']);
      // console.log(req['body']['location']);
      if (req['body']['location'] == '') {
        var app_str = "SELECT A.*, U.firstname, U.lastname, U.email FROM Applications as A INNER JOIN Users as U ON A.userId = U.id WHERE U.id = " + req['body']['id'];
      } else {
        var app_str = "SELECT A.*, U.firstname, U.lastname, U.email FROM Applications as A INNER JOIN Users as U ON A.userId = U.id WHERE U.id = " + req['body']['id'] + " AND A.transportation = '" + req['body']['location'] + "'";
      }
      console.log(app_str);
      const queries = {
          app: app_str,
      };
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

    // POST to save scores/ data
};
