
import fs from 'fs-extra';
import path from 'path';
import { Application, User } from '../models';

const homedir = require('os').homedir();

export default {
    submitApp: (req, res, next) => {
        // TODO: Add field validation

        const saveFile = () => {
            const resume = req.files.resume;
            const thumbnail = req.files.thumbnail;

            const result = [];

            if (resume.size !== 0) {
                console.log('detected resume');
                const lst = resume.name.split('.');
                let newFilename;
                if (lst.length > 1) {
                    newFilename = `resume-${req.user.id}.${lst[lst.length - 1]}`;
                } else {
                    newFilename = `resume-${req.user.id}`;
                }

                const oldPath = resume.path;
                const newPath = path.resolve(homedir, `resumes/${newFilename}`);

                result.push(fs.move(oldPath, newPath, { overwrite: true }));
            }

            if (thumbnail.size !== 0) {
                console.log('detected thumb');
                const lst = thumbnail.name.split('.');
                let newFilename;
                if (lst.length > 1) {
                    newFilename = `pic-${req.user.id}.${lst[lst.length - 1]}`;
                } else {
                    newFilename = `pic-${req.user.id}`;
                }

                const oldPath = thumbnail.path;
                const newPath = path.resolve(homedir, `pics/${newFilename}`);

                result.push(fs.move(oldPath, newPath, { overwrite: true }));
            }

            return Promise.all(result);
        }

        User.findOne({
            where: { id: req.user.id },
            include: { model: Application }
        }).then(user => {
            if (user.Application === null) {
                var data = req.body;
                data['resume'] = req.files.resume.name;
                Application.create({
                    ...data,
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
                console.log(req.files.resume.name);
                var data = req.body;
                data['resume'] = req.files.resume.name;
                if (req.files.thumbnail.size !== 0) {
                    data['thumbnail'] = req.files.thumbnail.name;
                }
                
                user.Application.updateAttributes(data).then(newApp => {
                    // App has been saved.
                    console.log(req.body)
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
