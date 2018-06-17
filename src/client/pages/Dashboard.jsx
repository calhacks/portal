
import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form action="/dashboard" method="post">
              First name: <input type="text" name="fname" /><br/>
              Last name: <input type="text" name="lname" /><br/>
              <button type="submit">Submit</button>
            </form>
        );
    }
};
