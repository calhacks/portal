import Sequelize from 'sequelize'
import {
  User,
  Application,
  Team,
  CubStart,
  ApplicationScore
} from '../models'
var config = require('../config/sequelize').default[
  process.env.NODE_ENV || 'development'
]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

import fs from 'fs'
import path from 'path'

const homedir = require('os').homedir()

export default {
  stats: (req, res, next) => {
    const queries = {
      numUsers: 'SELECT COUNT(*) FROM "Users"',
      numTeams: 'SELECT COUNT(*) FROM "Teams"',
      numCubStart: 'SELECT COUNT(*) FROM "CubStarts"',
      numApps: 'SELECT COUNT(*) FROM "Applications"'
    }

    // executes all queries and puts them in a promise
    Promise.all(
      Object.keys(queries).map(
        query =>
        new Promise(resolve => {
          sequelize.query(queries[query]).spread((results, meta) => {
            resolve({
              [query]: results[Object.keys(results)[0]]
            })
          })
        })
      )
    ).then(results => {
      res.json(results)
    })
  },

  roster: (req, res, next) => {
    User.findAll({
      where: {
        role: 'admin'
      }
    }).then(users => {
      res.json(users)
    })
  },

  deify: (req, res, next) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (!user) {
        res.redirect('/dashboard#roster')
      } else {
        user
          .updateAttributes({
            role: 'admin'
          })
          .then(user => {
            res.redirect('/dashboard#roster')
          })
      }
    })
  },

  postScore: (req, res, next) => {
    for (let cat = 1; cat <= 3; cat++) {
      if (
        req.body[`category${cat}`] === null ||
        req.body[`category${cat}`] === undefined
      )
        return res.status(400)
    }
    ApplicationScore.findOne({
      where: {
        director: req.user.id.toString(10),
        ApplicationId: req.body.ApplicationId
      }
    }).then(score => {
      if (score) {
        score.updateAttributes({
          ...req.body
        }).then(newScore => {
          res.send(newScore)
        })
      } else {
        ApplicationScore.create({
          ...req.body
        }).then(newScore => {
          res.send(newScore)
        })
      }
    })
  },

  getScore: (req, res, next) => {
    ApplicationScore.findOne({
        where: {
          director: req.user.id.toString(),
          ApplicationId: req.query.appId
        }
      })
      .then(score => {
        res.json(score)
      })
      .catch(err => {
        res.send(err)
      })
  },

  // Serve resumes from the ../resumes/ directory
  loadResume: (req, res, next) => {
    const resumePath = path.resolve(homedir, 'converted_resumes')
    const filenames = fs.readdirSync(resumePath)
    const resumeId = req.query.id

    let filename
    for (var i = filenames.length - 1; i >= 0; i--) {
      if (filenames[i].startsWith('resume-' + resumeId + '.')) {
        filename = filenames[i]
      }
    }

    // Guess what the MIME type is based on the resume
    // find . | sed s/..resume-[0-9]*\.//g | tr A-Z a-z | sort | uniq -c
    // gets the distribution of file types

    const types = {
      '.pdf': 'application/pdf',
      '.rtf': 'application/rtf',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.txt': 'text/plain',
      '.rtf': 'application/rtf'
    }
    // Anything else is handled as application/octet-stream

    if (!filename) {
      res.send(404)
    } else {
      let type = types[path.extname(filename)]
      if (type === undefined) {
        type = 'application/octet-stream'
      }

      const info = fs.statSync(resumePath + '/' + filename)
      res.writeHead(200, {
        'Content-Type': type,
        'Content-Length': info.size
      })

      const stream = fs.createReadStream(resumePath + '/' + filename)
      stream.pipe(res)
    }
  },

  findApp: (req, res, next) => {
    const val = req.query.query.toLowerCase()
    const to = parseInt(val)

    if (val.indexOf('@') != -1) {
      User.findOne({
        where: {
          email: val.trim()
        }
      }).then(user => {
        if (!user) return res.json({})
        Application.findOne({
          where: {
            UserId: user.id
          }
        }).then(app => {
          if (app) {
            sequelize
              .query(
                'select * from "Applications" ' +
                "where transportation='" +
                app.transportation +
                "' " +
                'order by id;'
              )
              .spread((results, meta) => {
                let index = results
                  .filter(r => r)
                  .findIndex(r => r.id == app.id)
                if (index >= 0)
                  return res.json({
                    location: app.transportation,
                    appIndex: index
                  })
                return res.json({})
              })
          } else {
            return res.json({})
          }
        })
      })
    } else if (isNaN(to)) {
      // searching "oos 5" or something
      const components = val.split(' ')
      if (components.length == 1 || components.length == 0) {
        res.json({})
        return
      }
      if (
        components[0] == 'oos' ||
        components[0] == 'california' ||
        components[0] == 'berkeley'
      ) {
        // oos app
        const ix = parseInt(components[1])
        if (isNaN(ix)) {
          res.json({})
          return
        }

        res.json({
          location: components[0],
          appIndex: ix
        })
      } else {
        res.json({})
      }
    } else {
      res.json({})
      return
    }
  },

  scoring: (req, res, next) => {
    User.findOne({
      where: {
        id: req.user.id
      }
    }).then(user => {
      if (user.role === 'admin') {
        res.render('scoring', {
          user: user.toJSON()
        })
      } else {
        console.log('FAIL')
        res.render('fourOhFour')
      }
    })
  },

  // Get a User's App
  getApp: (req, res, next) => {
    const conditions = ['u.id=a."UserId"']

    if (
      !['oos', 'california', 'all', 'berkeley'].includes(req.query.location)
    ) {
      res.json({})
      return
    } else if (req.query.location !== 'all') {
      conditions.push("a.transportation='" + req.query.location + "'")
    }
    console.log(req.query)
    // hot query
    const query =
      'select ' +
      'u.id id,' +
      'a.id "appId", ' +
      'u.firstname firstname, ' +
      'u.lastname lastname, ' +
      'u.email email, ' +
      'a.gender gender, ' +
      'a."genderOther" "genderOther", ' +
      'a.school school, ' +
      'a.year "year", ' +
      'a.bday bday, ' +
      'a.race race, ' +
      'a."raceOther" "raceOther", ' +
      'a.major major, ' +
      'a.transportation transportation, ' +
      'a.links links, ' +
      'a.hackathons hackathons, ' +
      'a."hearAbout" "hearAbout", ' +
      'a.question1 question1, ' +
      'a.question2 question2, ' +
      'a.question3 question3, ' +
      'a.beginner beginner, ' +
      'a."createdAt" "createdAt", ' +
      'a.resume resume ' +
      'from ' +
      '"Users" u, ' +
      '"Applications" a ' +
      'where ' +
      conditions.join(' and ') +
      ' order by a.id limit 1 offset ' +
      req.query.id +
      ';'
    sequelize.query(query).spread((results, meta) => {
      if (!results || results.length < 1) return res.json({})
      const uid = results[0].id

      if (results[0].resume) {
        const lst = results[0].resume.split('.')
        let extension = ''
        if (lst.length > 1) {
          extension = '.' + lst[lst.length - 1]
        }
        results[0].resume =
          'https://' +
          process.env.DO_BUCKET +
          '.' +
          process.env.DO_MAIN_LOC +
          '/resumes/resume-' +
          results[0].id +
          extension
      }

      let teammates = []
      User.findOne({
        where: {
          id: uid
        },
        include: [{
          model: Team,
          include: [User]
        }]
      }).then(userRaw => {
        // team id is user.TeamId
        const user = userRaw.toJSON()
        if (user.Team) {
          teammates = user.Team.Users.map(user => user.email).sort()
          console.log(teammates)
        }

        res.json({
          ...results[0],
          teammates
        })
      })
    })
  },

  // Get a User's Cubstart App
  getCubstart: (req, res, next) => {
    const conditions = ['u.id=c."UserId"']
    const query =
      'select ' +
      'u.id id,' +
      'c.cubstart1 cubstart1,' +
      'c.cubstart2 cubstart2,' +
      'c.cubstart3 cubstart3' +
      'c.cubstart4 cubstart4' +
      'c.cubstart5 cubstart5' +
      'c.cubstart5Other cubstart5Other' +
      'from ' +
      '"Users" u, ' +
      '"CubStart" c ' +
      'where ' +
      conditions.join(' and ') +
      ' order by a.id limit 1 offset ' +
      req.query.id +
      ';'
    sequelize.query(query).spread((results, meta) => {
      res.json({
        ...results[0]
      })
    })
  },

  accumulate: (req, res, next) => {
    ApplicationScore.findAll({}).then(scores => {
      const lists = {}
      const norms = {}

      for (let i = 0; i < scores.length; i++) {
        if (lists[scores[i].director] !== undefined) {
          for (let c of [1, 2, 3]) {
            lists[scores[i].director]['cat' + c].push(scores[i]['category' + c])
          }
        } else {
          for (let c of [1, 2, 3]) {
            lists[scores[i].director] = {
              ...lists[scores[i].director],
              ['cat' + c]: [scores[i]['category' + c]]
            }
          }
        }
      }

      for (let director in lists) {
        let results = {
          mean1: 0,
          mean2: 0,
          mean3: 0,
          ssm1: 0,
          ssm2: 0,
          ssm3: 0
        }

        for (let c of [1, 2, 3]) {
          const l = lists[director]['cat' + c]
          for (let i = 0; i < l.length; i++) {
            results['mean' + c] += l[i] / l.length
            results['ssm' + c] += (l[i] * l[i]) / l.length
          }
        }

        for (let c of [1, 2, 3]) {
          results['stdev' + c] = Math.sqrt(
            results['ssm' + c] - results['mean' + c] * results['mean' + c]
          )
        }

        norms[director] = results
      }

      let normalizedScores = []

      for (let score of scores) {
        const applicant = score.ApplicationId
        const director = score.director
        const n = norms[director]

        const cat1 = score.category1
        const cat2 = score.category2
        const cat3 = score.category3

        const z1 = (cat1 - n.mean1) / n.stdev1
        const z2 = (cat2 - n.mean2) / n.stdev2
        const z3 = (cat3 - n.mean3) / n.stdev3

        normalizedScores.push({
          hacker: applicant,
          score: z1 + z2 + z3
        })
      }

      let finalScores = {}

      for (let score of normalizedScores) {
        if (finalScores[score.hacker]) {
          finalScores[score.hacker].push(score.score)
        } else {
          finalScores[score.hacker] = [score.score]
        }
      }

      for (let hacker of Object.keys(finalScores)) {
        let total = 0
        for (let i = 0; i < finalScores[hacker].length; i++) {
          total += finalScores[hacker][i]
        }
        const avg = total / finalScores[hacker].length
        finalScores[hacker] = avg
      }

      const final = Object.keys(finalScores)
        .sort((h1, h2) => {
          return finalScores[h2] - finalScores[h1]
        })
        .map(h => ({
          score: finalScores[h],
          id: h
        }))

      const proms = []
      for (let i = 0; i < final.length; i++) {
        proms.push(
          new Promise(resolve => {
            sequelize
              .query(
                'select ' +
                'u.email email, ' +
                'a.transportation transportation, ' +
                'a.id "appId", ' +
                'u.firstname firstname, ' +
                'u.lastname lastname, ' +
                'u.email email, ' +
                'u."TeamId" team, ' +
                'a.gender gender, ' +
                'a."genderOther" "genderOther", ' +
                'a.school school, ' +
                'a.year "year", ' +
                'a.bday bday, ' +
                'a.race race, ' +
                'a."raceOther" "raceOther", ' +
                'a.major major, ' +
                'a.transportation transportation, ' +
                'a.links links, ' +
                'a.hackathons hackathons, ' +
                'a."hearAbout" "hearAbout", ' +
                'a.question1 question1, ' +
                'a.question2 question2, ' +
                'a.question3 question3, ' +
                'a.beginner beginner, ' +
                'a."createdAt" "createdAt" ' +
                'from "Applications" a, "Users" u ' +
                'where u.id=a."UserId" and a.id=' +
                final[i].id +
                ';'
              )
              .spread((results, meta) => {
                resolve({
                  ...results[0],
                  location: results[0].transportation,
                  normalizedScore: final[i].score
                })
              })
          })
        )
      }

      Promise.all(proms).then(result => {
        res.render('results', {
          results: result
        })
      })
    })
  },

  scoringStats: (req, res, next) => {
    sequelize
      .query(
        'select u.email, count(*) from "Users" u, "ApplicationScores" s, "Applications" a' +
        " where u.id::varchar=s.director and a.transportation='" +
        req.query.location +
        '\' and s."ApplicationId"=a.id' +
        ' group by s.director, u.email order by -count(*);'
      )
      .spread((results, meta) => {
        res.render('scoringStats', {
          results
        })
      })
  }
}