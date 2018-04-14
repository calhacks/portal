
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import template from './client/template';

import SignIn from './client/pages/SignIn';
import SignUp from './client/pages/SignUp';
import Dashboard from './client/pages/Dashboard';

import passport from 'passport';
// import authRoute from './routes/auth';

import session from 'express-session';

import path from 'path';

const app = express();
const models = require("./models");

app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport/passport.js')(passport, models.user);

// authRoute(app, passport);

app.get('/', (req, res) => {
	if (req.user == undefined) {
		const body = renderToString(
			React.createElement(SignUp)
		);
		res.send(template({body, title: 'Sign Up to Cal Hacks'}));
	}
});

app.get('/signup', (req, res) => {
	const body = renderToString(
        React.createElement(SignUp)
    );
    res.send(template({
        body,
        title: 'Sign Up to cal hacks'
    }));
});

app.get('/signin', (req, res) => {
    const body = renderToString(
        React.createElement(SignIn)
    );
    res.send(template({
        body,
        title: 'sign in'
    }));
});

app.get('/dashboard', (req, res) => {
    const body = renderToString(
        React.createElement(Dashboard)
    );
    res.send(template({
        body,
        title: 'sign in'
    }));
});

app.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});

app.post('/signup', passport.authenticate(
    'local-signup',
    {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }
));

app.post('/signin', passport.authenticate(
    'local-signin',
    {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }
));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

// attach routes

app.listen(8000, () => {
	console.log('App listening on 8000');
});
