
import fs from 'fs-extra';
import aws from 'aws-sdk';
import { Application, User } from '../models';

const homedir = require('os').homedir();

export default {

    types = {
        'pdf': 'application/pdf',
        'rtf': 'application/rtf',
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'txt': 'text/plain',
        'rtf': 'application/rtf',
        'doc': 'application/msword',
        'dot': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    },

    submitApp: (req, res, next) => {
        // TODO: Add field validation

        const resume = req.files.resume;
        const thumbnail = req.files.thumbnail;
        aws.config.update({
            accessKeyId: process.env.DO_ACCESS_KEY,
            secretAccessKey: process.env.DO_SECRET_KEY,
        })
        const endpoint = new aws.Endpoint(process.env.DO_MAIN_LOC);

        const s3 = new aws.S3({
            endpoint: endpoint,
            accessKeyId: process.env.DO_ACCESS_KEY,
            secretAccessKey: process.env.DO_SECRET_KEY,
        });
        
        const options = {
            partSize: 10 * 1024 * 1024, // 10 MB
            queueSize: 10
        };
        
        let resumeLink;
        let thumbnailLink;

        const uploadResume = (user) => {
            if (resume.size !== 0) {
                console.log('detected resume');
                const lst = resume.name.split('.');

                let extension;

                let newFilename;
                if (lst.length > 1) {
                    extension = lst[lst.length - 1];
                    newFilename = `resume-${req.user.id}.${extension}`;
                } else {
                    newFilename = `resume-${req.user.id}`;
                }

                const oldPath = resume.path;

                let contentType = 'application/octet-stream';
                if (extension in types) {
                    contentType = types[extension];
                }
                
                if (user.Application !== null && user.Application.resume !== null) {
                    const split = user.Application.resume.split('.');
                    if (split.length > 1) {
                        const oldExtension = split[split.length - 1];
                        if (oldExtension !== extension) {
                            const params = {
                                Bucket: process.env.DO_BUCKET,
                                Key: `resumes/resume-${req.user.id}.${oldExtension}`
                            };
                            s3.deleteObject(params, function(err, data) {
                                if (err) console.log(err, err.stack);  // error
                                else     console.log();                 // deleted
                            });
                        }
                    }
                }

                const params = {
                    Bucket: process.env.DO_BUCKET,
                    Key: 'resumes/' + newFilename,
                    Body: fs.createReadStream(oldPath),
                    ACL: 'public-read',
                    ContentType: contentType
                };
                s3.upload(params, options, function (err, data) {
                    if (!err) {
                        resumeLink = data.Location;
                        uploadThumbnail(user);
                    } else {
                        console.log(err); // an error occurred
                    }
                });
            } else {
                uploadThumbnail(user);
            }
        }

        const uploadThumbnail = (user) => {
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

                if (user.Application !== null && user.Application.thumbnail !== null) {
                    const split = user.Application.thumbnail.split('.');
                    if (split.length > 1) {
                        const oldExtension = split[split.length - 1];
                        if (oldExtension !== extension) {
                            const params = {
                                Bucket: process.env.DO_BUCKET,
                                Key: `thumbnails/thumbnail-${req.user.id}.${oldExtension}`
                            };
                            s3.deleteObject(params, function(err, data) {
                                if (err) console.log(err, err.stack);  // error
                                else     console.log();                 // deleted
                            });
                        }
                    }
                }
                const params = {
                    Bucket: process.env.DO_BUCKET,
                    Key: 'thumbnails/' + newFilename,
                    Body: fs.createReadStream(oldPath),
                    ACL: 'public-read'
                };
                s3.upload(params, options, function (err, data) {
                    if (!err) {
                        thumbnailLink = data.Location;
                        completeUpload(user);
                    } else {
                        console.log(err);
                    }
                });
            } else {
                completeUpload(user);
            }
        }

        const startApplicationUpload = () => {
            User.findOne({
                where: { id: req.user.id },
                include: { model: Application }
            }).then(user => {
                uploadResume(user);
            }).catch(err => {
                res.send(err);
            });
        }

        const completeUpload = (user) => {
            if (user.Application === null) {
                var data = req.body;
                data['resume'] = resume.name;
                data['thumbnail'] = thumbnail.name;
                Application.create({
                    ...data,
                    UserId: req.user.id
                });
            } else {
                var data = req.body;
                data['resume'] = resume.name;
                data['thumbnail'] = thumbnail.name;
                user.Application.updateAttributes(data);
            }
            res.redirect('/dashboard');
        }
        startApplicationUpload();
    },

    appPage: (req, res) => {
        User.findOne({
            where: { id: req.user.id },
            include: [
                { model: Application }
            ]
        }).then(user => {
            //school required because the school doesn't autofill, because it pulls them from a separate file in the frontend. would use user.Application.school there but ejs is erroring.
            res.render('application', { user: user.toJSON() , school: user.Application.school })
        });
    }
}
