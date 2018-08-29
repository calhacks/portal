
import passport from 'passport';
import sendgrid from '@sendgrid/mail';
import { User } from '../models/index';
import reset from '../emails/reset';
import bcrypt from 'bcrypt-nodejs';
var Sequelize = require('sequelize');

const genUUID = () => {
    const chars = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    let result = '';
    for (let i = 0; i < 10; i++) {
        result = result + chars[Math.floor(Math.random() * 26)];
    }
    return result;
}
const generateHash = pass => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
};

export default {
    signIn: (req, res, next) => {
        return res.render('login');
    },

    signUp: (req, res, next) => {
        return res.render('signup');
    },

    logout: (req, res, next) => {
        return req.session.destroy(err => {
            res.redirect('/');
        });
    },

    submitLogin: (req, res, next) => {
        passport.authenticate('local-signin', (err, user, info) => {
            if (err !== null) {
                // Something went wrong.
                req.flash('error', 'There was an unexpected error signing in.');
                return res.redirect('/login');
            } else if (!user) {
                req.flash('error', 'Invalid email/password combination.');
                return res.redirect('/login');
            } else {
                req.logIn(user, err => {
                    if (err) {
                        req.flash('error', 'There was an unexpected error signing in.');
                        return res.redirect('/login');
                    } else {
                        return res.redirect('/dashboard');
                    }
                });
            }
        })(req, res, next);
    },

    submitSignup: (req, res, next) => {
        passport.authenticate('local-signup', (err, user, info) => {
            if (err !== null) {
                // Something went wrong.
                req.flash('error', JSON.stringify(err));
                return res.redirect('/signup');
            } else if (!user) {
                req.flash('error', info.message);
                return res.redirect('/signup');
            } else {
                req.logIn(user, err => {
                    if (err) {
                        req.flash('error', 'There was an unexpected error creating an account.');
                        return res.redirect('/signup');
                    } else {
                        return res.redirect('/dashboard');
                    }
                });
            }
        })(req, res, next);
    },

    validate: (req, res, next) => {
        User.update({
            emailValidated: true
        }, {
            where: { emailCode: req.query.code }
        }).then(result => {
            console.log(result);
            if (result[0] == 0) {
                res.render('verify', { success: false });
            } else {
                res.render('verify', { success: true });
            }
        });
    },

    informVerify: (req, res, next) => {
        return res.render('informVerify', { user: req.user });
    },

    informReset: (req, res, next) => {
        return res.render('informReset', { user: req.user });
    },

    resetPassword: (req, res, next) => {
        return res.render('resetPassword')
    },

    submitReset: (req, res, next) => {
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (!(user)) {
          req.flash('error', 'There is no user associated with that email.');
          return res.redirect('/reset_password');
        }
        else {
          const resetCode = genUUID();
          const email = req.body.email;
          sendgrid.send({
            to: email,
            from: 'team@calhacks.io',
            subject: 'Reset your password for Cal Hacks',
            html: reset(
                user.firstname + ' ' + user.lastname,
                resetCode
            )
          })
          User.update({
              resetPasswordCode: resetCode,
              resetPasswordExpiration: new Date()
          }, {
              where: { email: email }
          }).then(result => {
              res.render('informReset', { user: user })
          });
        }
      })
    },

    changePassword: (req, res, next) => {
      return res.render('changePassword', {code: req.query.code});
    },

    submitPassword: (req, res, next) => {
      console.log(req.query);
        var curr_date = new Date();
        curr_date.setHours(curr_date.getHours() - 1);
        console.log('hello');
        User.update({
            password: generateHash(req.body.password)
        }, {
            where: {
              resetPasswordCode: req.query.code,
              resetPasswordExpiration: {
                [Sequelize.Op.gt]: curr_date
              }
            }
        }).then(result => {
            if (result[0] == 0) {
                res.render('newPassword', { success: false });
            } else {
                res.render('newPassword', { success: true });
            }
        });
    },

    newPassword: (req, res, next) => {
      return res.render('newPassword');
    }
};
