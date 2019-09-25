import { User } from '../models/index'

// As a general rule, don't update req.page or req.pageData in the policies.
// They may get overwritten in middleware further downstream.

// Makes sure people are authenticated. We also want to
// specify particular roles later on, so make this
// extensible...
export const authenticateUser = roles => (req, res, next) => {
	if (req.user === undefined || !roles.includes(req.user.role)) {
		res.redirect('/login')
	} else {
		next()
	}
}

// Send info about whether user's email is verified yet.
export const emailVerify = (req, res, next) => {
	if (req.user.emailValidated) {
		next()
	} else {
		res.redirect('/inform_verify')
	}
}
