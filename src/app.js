
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './client/App';
import template from './client/template';

import routes from './routes';

const app = express();


app.get('/', (req, res) => {
	const body = renderToString(
		React.createElement(App)
	);
	res.send(template({body, title: 'Cal Hax Tech'}));
});

// attach routes

app.listen(8000, () => {
	console.log('App listening on 8000');
});
