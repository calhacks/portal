import { User, Application, Team, CubStart } from '../models'

export default {
	dashboard: (req, res, next) => {
		User.findOne({
			where: { id: req.user.id },
			include: [
				{ model: Application },
				{ model: Team, include: [User] },
				{ model: CubStart }
			]
		}).then(user => {
			if (user.role === 'hacker') {
				res.render('dashboard', { user: user.toJSON() })
			} else if (user.role === 'admin') {
				Application.count().then(count => {
					Application.count({
						where: { school: 'The University of California, Berkeley' }
					}).then(berkeleyCount => {
						res.render('adminDashboard', {
							user: user.toJSON(),
							count,
							berkeleyCount
						})
					})
				})
			}
		})
	}
}
