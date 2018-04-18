
import Home from '../client/pages/Home';

export default {
    home: (req, res, next) => {
        req.page = Home;
        next();
    }
};
