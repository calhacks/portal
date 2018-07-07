
import React from 'react';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import PropTypes from 'prop-types';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ValidateEmail from './pages/ValidateEmail';
import InformVerifyEmail from './pages/InformVerifyEmail';

import './styles/main.sass';

class App extends React.Component {
    render() {
        const routes = [
            <Route path='/' exact component={Home} />,
            <Route path='/login' exact component={SignIn} />,
            <Route path='/dashboard' exact component={Dashboard} />,
            <Route path='/verify' exact component={ValidateEmail} />,
            <Route path='/signup' exact component={SignUp} />,
            <Route path='/inform_verify' exact component={InformVerifyEmail} />,
        ];

        // This is how we send page data simultaneously to both the client
        // and server DOM. Define routes in the "routes" array above.
        const drilled = routes.map(route => {
            const { component, ...noComp } = route.props;
            return React.createElement(Route, {
                ...noComp,
                render: props => React.createElement(component, {
                    pageData: this.props.pageData
                }),
                key: route.props.path,
            });
        });

        return (
            <div>
                <Switch>
                    { drilled }
                </Switch>
            </div>
        );
    }
};

export default App;
