
import bcrypt from 'bcrypt-nodejs';
import { Strategy as LocalStrategy } from 'passport-local';
import sendgrid from '@sendgrid/mail';

import verify from '../emails/verify';

export default (passport, User) => {

    if (process.env.SENDGRID_APIKEY) {
        sendgrid.setApiKey(process.env.SENDGRID_APIKEY);
    } else {
        console.error('ERROR: Must define SENDGRID_APIKEY');
        return
    }

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id }
        }).then(user => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    const genUUID = () => {
        const chars = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890';
        let result = '';
        for (let i = 0; i < 10; i++) {
            result = result + chars[Math.floor(Math.random() * 26)];
        }
        return result;
    }

    const generateHash = pass => {
        return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
    };

    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, email, password, done) => {
                User.findOne({
                    where: { email }
                }).then(user => {
                    if (user) {
                        return done(null, false, {
                            message: 'That email is already taken'
                        });
                    }

                    const pass = generateHash(password);
                    const verifyCode = genUUID();
                    const data = {
                        email,
                        password: pass,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        emailCode: verifyCode,
                        emailValidated: false,
                        role: 'hacker'
                    };

                    sendgrid.send({
                        to: email,
                        from: 'team@calhacks.io',
                        subject: 'Verify your email with Cal Hacks',
                        html: verify(
                            req.body.firstname + ' ' + req.body.lastname,
                            verifyCode
                        )
                    });

                    User.create(data).then((newUser, created) => {
                        if (!newUser) {
                            return done(null, false);
                        } else {
                            return done(null, newUser);
                        }
                    }).catch(err => console.log(err));
                });
            }
        )
    );

    passport.use(
        'local-signin',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, email, password, done) => {
                const isValidPassword = (userPass, pass) => {
                    return bcrypt.compareSync(pass, userPass);
                }

                User.findOne({
                    where: { email }
                }).then(user => {
                    if (!user || !isValidPassword(user.password, password)) {
                        return done(null, false, {
                            message: 'Incorrect username/password'
                        });
                    }
                    const userInfo = user.get();
                    return done(null, userInfo);
                })
                .catch(err => {
                    console.log('Something went wrong:');
                    console.log(err);

                    done(null, false, {
                        message: 'Something went wrong'
                    });
                });
            }
        )
    );
};
