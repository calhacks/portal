
import formidable from 'formidable';

import { Application, User } from '../models';

export default {
    submitApp: (req, res, next) => {
        // TODO: Add field validation
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
                    res.redirect('/dashboard');
                })
            } else {
                user.Application.updateAttributes(req.body).then(newApp => {
                    // App has been saved.
                    res.redirect('/dashboard');
                })
            }
        });
    }
}
