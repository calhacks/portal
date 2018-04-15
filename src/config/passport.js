
import bcrypt from 'bcrypt-nodejs';
import { Strategy as LocalStrategy } from 'passport-local';

export default (passport, User) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            (req, email, password, done) => {
                const generateHash = pass => {
                    return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);
                };

                User.findOne({
                    where: { email }
                }).then(user => {
                    if (user) {
                        return done(null, false, {
                            message: 'That email is already taken'
                        });
                    }

                    const pass = generateHash(password);
                    const data = {
                        email,
                        password: pass,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    };

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
