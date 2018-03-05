
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from './client/App';
import Html from './client/Html';

const app = express();

app.get('/', (req, res) => {
	const body = renderToString(
		React.createElement(App)
	);
	res.send(Html({body, title: 'Cal Hax Tech'}));
});

app.listen(8000, () => {
	console.log('App listening on 8000');
});
