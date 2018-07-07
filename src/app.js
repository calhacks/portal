
import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import formidable from 'express-formidable';

import router from './router/index';
import models from './models/index';

import passportConfig from './config/passport';

const app = express();

require('babel-register')({ presets: ['env'] })

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./dist'));
app.use(formidable({ maxFileSize: 10 * 1024 * 1024 }));

// formidable -> body parser
app.use((req, res, next) => { req.body = req.fields; next(); });

passportConfig(passport, models.User);

app.use('/', router);

app.listen(8000, () => {
    console.log('listening on 8000');
});
