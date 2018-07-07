
import Home from '../client/pages/Home';
import SignIn from '../client/pages/SignIn';
import SignUp from '../client/pages/SignUp';
import ValidateEmail from '../client/pages/ValidateEmail';
import InformVerifyEmail from '../client/pages/InformVerifyEmail';

import passport from 'passport';

import { User } from '../models/index';

export default {

    signIn: (req, res, next) => {
        next();
    },

    signUp: (req, res, next) => {
        next();
    },

    logout: (req, res, next) => {
        req.session.destroy(err => {
            res.redirect('/');
        });
    },

    submitLogin: (req, res, next) => {
        passport.authenticate('local-signin', (err, user, info) => {
            if (err !== null) {
                // Something went wrong.
                return next(err);
            } else if (!user) {
                return res.redirect('/login');
            } else {
                req.logIn(user, err => {
                    if (err) {
                        return next(err);
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
                return next(err);
            } else if (!user) {
                return res.redirect('/login');
            } else {
                req.logIn(user, err => {
                    if (err) {
                        return next(err);
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
                res.send('There was an error validating your email.');
            } else {
                next();
            }
        });
    },

    informVerify: (req, res, next) => {
        next();
    }
};
