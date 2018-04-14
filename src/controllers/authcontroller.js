
import SignUp from '../client/pages/SignUp';
import SignIn from '../client/pages/SignIn';
import Dashboard from '../client/pages/Dashboard';
import template from '../client/template';

import renderToString from 'react-dom/server';
import React from 'react';

export const signup = (req, res) => {
    const body = renderToString(
        React.createElement(SignUp)
    );
    res.send(template({
        body,
        title: 'Sign Up to cal hacks'
    }));
}

export const signin = (req, res) => {
    const body = renderToString(
        React.createElement(SignIn)
    );
    res.send(template({
        body,
        title: 'sign in'
    }));
}

export const dashboard = (req, res) => {
    const body = renderToString(
        React.createElement(Dashboard)
    );
    res.send(template({
        body,
        title: 'sign in'
    }));
};

export const logout = (req, res) => {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}
