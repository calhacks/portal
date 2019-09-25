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
				Application.findAll().then(apps => {
					let count = apps.length
					let berkeleyCount = apps.filter(a => a.transportation === 'berkeley')
						.length
					let californiaCount = apps.filter(
						a => a.transportation === 'california'
					).length
					let oosCount = apps.filter(a => a.transportation === 'oos').length

					res.render('adminDashboard', {
						user: user.toJSON(),
						count,
						berkeleyCount,
						californiaCount,
						oosCount
					})
				})
			}
		})
	}
}
