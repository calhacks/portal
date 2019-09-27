import fs from 'fs-extra'
import aws from 'aws-sdk'
import { Application, User } from '../models'
import { isNullOrUndefined } from 'util'

const homedir = require('os').homedir()

export default {
	submitApp: (req, res, next) => {
		// TODO: Add field validation

		const types = {
			pdf: 'application/pdf',
			rtf: 'application/rtf',
			jpg: 'image/jpeg',
			png: 'image/png',
			txt: 'text/plain',
			rtf: 'application/rtf',
			doc: 'application/msword',
			dot: 'application/msword',
			docx:
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		}

		const resume = req.files.resume
		aws.config.update({
			accessKeyId: process.env.DO_ACCESS_KEY,
			secretAccessKey: process.env.DO_SECRET_KEY
		})
		const endpoint = new aws.Endpoint(process.env.DO_MAIN_LOC)

		const s3 = new aws.S3({
			endpoint: endpoint,
			accessKeyId: process.env.DO_ACCESS_KEY,
			secretAccessKey: process.env.DO_SECRET_KEY
		})

		const options = {
			partSize: 10 * 1024 * 1024, // 10 MB
			queueSize: 10
		}

		let resumeLink

		const uploadResume = user => {
			if (resume.size !== 0 && resume.size < 5 * 1024 * 1024) {
				console.log('detected resume')
				const lst = resume.name.split('.')

				let extension

				let newFilename
				if (lst.length > 1) {
					extension = lst[lst.length - 1]
					newFilename = `resume-${req.user.id}.${extension}`
				} else {
					newFilename = `resume-${req.user.id}`
				}

				const oldPath = resume.path

				let contentType = 'application/octet-stream'
				if (extension in types) {
					contentType = types[extension]
				}

				if (user.Application !== null && user.Application.resume !== null) {
					const split = user.Application.resume.split('.')
					if (split.length > 1) {
						const oldExtension = split[split.length - 1]
						if (oldExtension !== extension) {
							const params = {
								Bucket: process.env.DO_BUCKET,
								Key: `resumes/resume-${req.user.id}.${oldExtension}`
							}
							s3.deleteObject(params, function(err, data) {
								if (err) console.log(err, err.stack)
								// error
								else console.log() // deleted
							})
						}
					}
				}

				const params = {
					Bucket: process.env.DO_BUCKET,
					Key: 'resumes/' + newFilename,
					Body: fs.createReadStream(oldPath),
					ACL: 'public-read',
					ContentType: contentType
				}
				s3.upload(params, options, function(err, data) {
					if (!err) {
						resumeLink = data.Location
						completeUpload(user)
					} else {
						console.log(err) // an error occurred
					}
				})
			} else {
				if (resume.size < 5 * 1024 * 1024) {
					completeUpload(user)
				}
			}
		}

		const startApplicationUpload = () => {
			User.findOne({
				where: { id: req.user.id },
				include: { model: Application }
			})
				.then(user => {
					uploadResume(user)
				})
				.catch(err => {
					res.send(err)
				})
		}

		const completeUpload = user => {
			const hearAboutpts = {
				'Cal Hacks Website': 'Website',
				Facebook: 'Facebook',
				Instagram: 'Instagram',
				LinkedIn: 'LinkedIn',
				Twitter: 'Twitter',
				Piazza: 'Piazza',
				Flyer: 'Flyer',
				'In-class announcement': 'IC Announcement',
				'A friend told me about it': 'Friend',
				Other: 'other'
			}
			if (user.Application === null) {
				var data = req.body
				data['resume'] = resume.name
				data['hearAbout'] = []
				for (var key in hearAboutpts) {
					if (!isNullOrUndefined(data['hearAbout-' + hearAboutpts[key]])) {
						data['hearAbout'].push(data['hearAbout-' + hearAboutpts[key]])
					}
				}
				if (!isNullOrUndefined(data['hearAbout-other'])) {
					data['hearAboutOther'] = data['hearAbout-other-text']
				} else {
					data['hearAboutOther'] = null
				}
				Application.create({
					...data,
					UserId: req.user.id
				})
			} else {
				var data = req.body
				data['resume'] = resume.name
				data['hearAbout'] = []
				if (data['trans']) {
					data['gender'] += ' (trans)'
				}
				for (var key in hearAboutpts) {
					if (!isNullOrUndefined(data['hearAbout-' + hearAboutpts[key]])) {
						data['hearAbout'].push(data['hearAbout-' + hearAboutpts[key]])
					}
				}
				if (!isNullOrUndefined(data['hearAbout-other'])) {
					data['hearAboutOther'] = data['hearAbout-other-text']
				} else {
					data['hearAboutOther'] = null
				}
				user.Application.updateAttributes(data)
			}
			res.redirect('/dashboard')
		}
		startApplicationUpload()
	},

	appPage: (req, res) => {
		User.findOne({
			where: { id: req.user.id },
			include: [{ model: Application }]
		}).then(user => {
			//school required because the school doesn't autofill, because it pulls them from a separate file in the frontend. would use user.Application.school there but ejs is erroring.
			if (user.Application !== null) {
				res.render('application', {
					user: user.toJSON(),
					school: user.Application.school
				})
			} else {
				res.render('application', { user: user.toJSON(), school: null })
			}
		})
	}
}
