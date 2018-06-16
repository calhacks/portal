
import React from 'react';

export default class SignIn extends React.Component {
    render() {
        return (
            <form id="signin" name="signin" method="post" action="/login">
                <label htmlFor="email">Email Address</label>
                <input className="text" name="email" type="text" /><br/>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" /><br/>
                <input className="btn" type="submit" value="Sign In" />
            </form>
        );
    }
};
