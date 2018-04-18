
import React from 'react';

export default class extends React.Component {
    render() {
        return (
            <form id="signup" name="signup" method="post" action="/signup">
                <label htmlFor="email">Email Address</label>
                <input className="text" name="email" type="email" />
                <label htmlFor="firstname" name="firstname">Firstname</label>
                <input className="firstname" type="text" />
                <label htmlFor="lastname" name="lastname">Lastname</label>
                <input className="lastname" type="text" />
                <label htmlFor="password">Password</label>
                <input className="password" name="password" type="password" />
                <br/>
                <input className="btn" type="submit" value="Sign Up" />
            </form>
        );
    }
};
