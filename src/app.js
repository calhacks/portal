
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Home from './client/pages/Home';
import template from './client/template';

const app = express();

app.get('/', (req, res) => {
	const body = renderToString(
		React.createElement(App)
	);
	res.send(template({body, title: 'Cal Hax Tech'}));
});

app.listen(8000, () => {
	console.log('App listening on 8000');
});
