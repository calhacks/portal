
import passport from 'passport';

import { User } from '../models/index';

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
                res.render('verify', { success: false });
            } else {
                res.render('verify', { success: true });
            }
        });
    },

    informVerify: (req, res, next) => {
        return res.render('informVerify');
    }
};
