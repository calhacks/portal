
import Home from '../client/pages/Home';
import SignIn from '../client/pages/SignIn';
import SignUp from '../client/pages/SignUp';
import ValidateEmail from '../client/pages/ValidateEmail';

import passport from 'passport';

import { User } from '../models/index';

export default {

    signIn: (req, res, next) => {
        req.page = SignIn;
        next();
    },

    signUp: (req, res, next) => {
        req.page = SignUp;
        next();
    },

    logout: (req, res, next) => {
        req.session.destroy(err => {
            res.redirect('/');
        });
    },

    submitLogin: passport.authenticate(
        'local-signin', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            session: true
        }
    ),

    submitSignup: passport.authenticate(
        'local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup',
            session: true
        }
    ),

    validate: (req, res, next) => {
        User.update({
            emailValidated: true
        }, {
            where: { emailCode: req.query.code }
        }).then(result => {
            if (result[0] == 0) {
                res.send('There was an error validating your email.');
            } else {
                req.page = ValidateEmail;
                next()
            }
        });
    }
};
