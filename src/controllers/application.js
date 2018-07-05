
import { Application, User } from '../models';

export default {
    submitApp: (req, res, next) => {
        // TODO: Add field validation
        console.log(req.files);
        const { resume, ...fields } = req.body;
        User.findOne({
            where: { id: req.user.id },
            include: { model: Application }
        }).then(user => {
            if (user.Application === null) {
                Application.create({
                    ...fields,
                    UserId: req.user.id
                }).then(newApp => {
                    // App has been created.
                    res.redirect('/dashboard');
                })
            } else {
                user.Application.updateAttributes(fields).then(newApp => {
                    // App has been saved.
                    res.redirect('/dashboard');
                })
            }
        });
    }
}
