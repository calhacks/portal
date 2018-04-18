
import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.data.user.emailValidated) {
            return(<p>Hello from dashbaord</p>);
        } else {
            return(<p>You have not validated your email yet.</p>);
        }
    }
};
