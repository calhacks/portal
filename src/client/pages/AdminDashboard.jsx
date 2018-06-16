
import React from 'react';

export default class AdminDashboard extends React.Component {
    render() {
        return (
            <div>
                Hello {this.props.data.user.firstname}!
                <br/><br/>
                <strong>Add users manually:</strong><br/>
                <form name="manualSignup" method="post" action="/manualSignup">
                    <label htmlFor="email">Email Address</label>
                    <input className="text" name="email" type="email" />
                    <label htmlFor="firstname">Firstname</label>
                    <input className="firstname" name="firstname" type="text" />
                    <label htmlFor="lastname">Lastname</label>
                    <input className="lastname" name="lastname" type="text" />
                    <label htmlFor="password">Password</label>
                    <input className="password" name="password" type="password" />
                    <label htmlFor="type">User type:</label>
                    <select className="typeSelect" name="userType">
                        <option value="hacker">Hacker</option>
                        <option value="admin">Admin</option>
                        <option value="sponsor">Sponsor</option>
                    </select>
                    <br/>
                    <input className="btn" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
};
