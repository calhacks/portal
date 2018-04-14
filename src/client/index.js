
import React from 'react';
import { render } from 'react-dom';

import App from './App';

render(
    <App initialState={ window.__PRELOADED_STATE__ } />,
    document.getElementById('app')
);
