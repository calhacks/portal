
import React from 'react';

import ApplicationForm from '../components/ApplicationForm';

import s from '../styles/dashboard.sass';

export default class extends React.Component {
    render() {
        return (
            <div>
                <div className='dashboard'>
                    <div className='content'>
                        <h1>Welcome to the dashboard, {this.props.pageData.user.firstname}!</h1>
                        <h2>Application Form:</h2>
                        <ApplicationForm appData={this.props.pageData.user.Application} />
                    </div>
                </div>
            </div>
        );
    }
}
