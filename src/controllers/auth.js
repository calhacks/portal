
import Home from '../client/pages/Home';
import SignIn from '../client/pages/SignIn';
import SignUp from '../client/pages/SignUp';

import passport from 'passport';

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
            failureRedirect: '/login'
        }
    ),

    submitSignup: passport.authenticate(
        'local-signup', {
            successRedirect: '/dashboard',
            failureRedirect: '/signup'
        }
    )
};
