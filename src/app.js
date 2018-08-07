
import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import formidable from 'formidable';
import ejsLocals from 'ejs-mate';
import sass from 'node-sass-middleware';

import router from './router';
import models from './models';

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

// express-formidable is really trash so this is the fix
app.use((req, res, next) => {
    const form = new formidable.IncomingForm({
        maxFileSize: 10 * 1024 * 1024
    });
    form.once('error', console.log); // TODO: do better
    form.parse(req, (err, fields, files) => {
        Object.assign(req, { fields, files });

        // formidable -> body parser
        req.body = req.fields;
        next();
    });
});

app.engine('ejs', ejsLocals);
app.set('view engine', 'ejs');
app.set('views', 'src/client/views');

passportConfig(passport, models.User);

app.use(
    sass({
        src: 'src/client/assets',
        dest: 'dist/assets',
        indentedSyntax: true,
        debug: true
    })
);
app.use(express.static('dist/assets'));
app.use('/', router);

app.listen(8000, () => {
    console.log('listening on 8000');
});
