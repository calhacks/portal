
export default {
    home: (req, res, next) => {
        res.render('index');
    },

    codeOfConduct: (req, res, next) => {
        res.render('codeOfConduct');
    },
};
