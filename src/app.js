
import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';

import router from './router/index';
import models from './models/index';

import passportConfig from './config/passport';

const app = express();

app.use(session({
    secret: 'keyboard cat'
}));
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport, models.User);

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.listen(8000, () => {
    console.log('listening on 8000');
});
