
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

hydrate(
    <BrowserRouter>
        <App pageData={window.__PRELOADED_STATE__}></App>
    </BrowserRouter>,
    document.getElementById('root')
);
