
import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('<h1>Cal Hacks 5.0</h1>');
});

app.listen(8000, () => {
	console.log('App listening on 8000');
});