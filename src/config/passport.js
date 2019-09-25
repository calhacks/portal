import bcrypt from 'bcrypt-nodejs'
import { Strategy as LocalStrategy } from 'passport-local'
import sendgrid from '@sendgrid/mail'

import verify from '../emails/verify'

export default (passport, User) => {
	let mailPassword
	if (process.env.SENDGRID_APIKEY) {
		sendgrid.setApiKey(process.env.SENDGRID_APIKEY)
	} else {
		console.error('ERROR: Must define SENDGRID_APIKEY')
		return
	}

	passport.serializeUser((user, done) => {
		done(null, user.id)
	})

	passport.deserializeUser((id, done) => {
		User.findOne({
			where: { id }
		}).then(user => {
			if (user) {
				done(null, user.get())
			} else {
				done(false, null)
			}
		})
	})

	const genUUID = () => {
		const chars = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890'
		let result = ''
		for (let i = 0; i < 10; i++) {
			result = result + chars[Math.floor(Math.random() * 26)]
		}
		return result
	}

	const generateHash = pass => {
		return bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null)
	}

	passport.use(
		'local-signup',
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true
			},
			(req, email, password, done) => {
				if (password.length < 8) {
					return done(null, false, {
						message: 'Your password must be at least 8 characters.'
					})
				}

				User.findOne({
					where: { email }
				}).then(user => {
					if (user) {
						return done(null, false, {
							message: 'That email is already taken.'
						})
					}

					const pass = generateHash(password)
					const verifyCode = genUUID()
					const data = {
						email,
						password: pass,
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						emailCode: verifyCode,
						emailValidated: false,
						role: email.endsWith('@calhacks.io') ? 'admin' : 'hacker'
					}

					sendgrid.send({
						to: email,
						from: 'team@calhacks.io',
						subject: 'Verify your email with Cal Hacks',
						html: verify(
							req.body.firstname + ' ' + req.body.lastname,
							verifyCode
						)
					})

					User.create(data)
						.then((newUser, created) => {
							if (!newUser) {
								return done(null, false, {
									message: 'There was an unexpected error creating an account.'
								})
							} else {
								return done(null, newUser, {})
							}
						})
						.catch(result => {
							if (result) {
								const err = result.errors[0]
								const reason = err.validatorName

								if (reason === 'isEmail') {
									// Failed email test
									return done(null, false, {
										message: 'The email you provided was invalid.'
									})
								} else {
									return done(null, false, {
										message: 'There was an unexpected error creating the user.'
									})
								}
							}
						})
				})
			}
		)
	)

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
					return bcrypt.compareSync(pass, userPass)
				}

				User.findOne({
					where: { email }
				})
					.then(user => {
						if (!user || !isValidPassword(user.password, password)) {
							return done(null, false, {
								message: 'Incorrect username/password.'
							})
						}
						const userInfo = user.get()
						return done(null, userInfo)
					})
					.catch(err => {
						done(null, false, {
							message: 'Something went wrong.'
						})
					})
			}
		)
	)
}
