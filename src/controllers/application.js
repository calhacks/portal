
import fs from 'fs-extra';
import { Application, User } from '../models';

export default {
    submitApp: (req, res, next) => {
        // TODO: Add field validation

        const saveFile = () => {
            const resume = req.files.resume;
            if (resume.size !== 0) {
                const lst = resume.name.split('.');
                let newFilename;
                if (lst.length > 1) {
                    newFilename = `${req.user.id}.${lst[lst.length - 1]}`;
                } else {
                    newFilename = `${req.user.id}`;
                }

                const oldPath = resume.path;
                const newPath = `/tmp/calhacks/portal/resumes/${newFilename}`;
                return fs.move(oldPath, newPath, { overwrite: true });
            }
            return Promise.resolve();
        }

        User.findOne({
            where: { id: req.user.id },
            include: { model: Application }
        }).then(user => {
            if (user.Application === null) {
                Application.create({
                    ...req.body,
                    UserId: req.user.id
                }).then(newApp => {
                    // App has been created.
                    saveFile().then(() => {
                        console.log('File moved successfully!');
                        res.redirect('/dashboard');
                    }).catch(err => {
                        console.log(err);
                        res.redirect('/dashboard');
                    });
                })
            } else {
                user.Application.updateAttributes(req.body).then(newApp => {
                    // App has been saved.
                    saveFile().then(() => {
                        console.log('File moved successfully!');
                        res.redirect('/dashboard');
                    }).catch(err => {
                        console.log(err);
                        res.redirect('/dashboard');
                    });
                })
            }
        });
    },

    appPage: (req, res) => {
        User.findOne({
            where: { id: req.user.id },
            include: [
                { model: Application }
            ]
        }).then(user => {
            res.render('application', { user: user.toJSON() })
        });
    }
}
