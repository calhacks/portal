
import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import formidable from 'formidable';
import ejsLocals from 'ejs-mate';
import sass from 'node-sass-middleware';
import flash from 'req-flash';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import Sequelize from 'sequelize';
import sequelizeSession from 'connect-session-sequelize';

import router from './router';
import models from './models';

import passportConfig from './config/passport';

require('dotenv').config();

const app = express();

// sequelize session storage causes a massive pain w/ local development
if (process.env.NODE_ENV === 'production') {
    var config = require('./config/sequelize')
        .default[process.env.NODE_ENV || 'development'];
    
    var SequelizeStore = sequelizeSession(session.Store);
    const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
    var myStore = new SequelizeStore({
        db: sequelize
    });
    myStore.sync();
    app.use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        store: myStore
    }));
} else {
    app.use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
    }))
}

require('babel-register')({ presets: ['env'] })

app.use(cookieParser());
app.use(flash({ locals: 'flash' }));
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

if (process.env.NODE_ENV === 'production') {
    require('./client/assets/css/main.sass');
    app.use(express.static('dist/assets'));
} else {
    app.use(express.static('dist/assets'));
    app.use(
        sass({
            src: 'src/client/assets',
            dest: 'dist/assets',
            indentedSyntax: true,
            debug: true,
            force: true,
        })
    );
}
app.use('/', router);

if (process.env.NODE_ENV === 'production') {
    if (process.env.TARGET === 'aws') {
        app.listen(8000, () => { console.log('Serving on 80') });
    } else {
        fs.unlink(process.env.PORT, () => {
    		console.log('cleared old socket');

            app.listen(process.env.PORT, () => {
            	console.log('listening on unix socket');

            	fs.chmodSync(process.env.PORT, '777');
            	console.log('set permissions of socket to 777');
            });
    	});
    }
} else {
	app.listen(8000, () => {
		console.log('listening on 8000');
	});
}
