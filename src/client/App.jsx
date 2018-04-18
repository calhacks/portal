
import React from 'react';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <p>App!</p>
                <Switch>
                    // Home route
                    <Route path="/" exact component={Home} />

                    // Auth routes
                    <Route path="/login" render={
                        () => <SignIn></SignIn>
                    } />
                </Switch>
            </div>
        );
    }
};
