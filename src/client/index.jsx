
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

render(
    <App initialState={window.__PRELOADED_STATE__}></App>,
    document.getElementById('root')
);
