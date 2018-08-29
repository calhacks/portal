require('dotenv').config();
var Sequelize = require('sequelize');
var config = require('../config/sequelize').default[process.env.NODE_ENV || 'development'];

let models = {};
let sequelize;

(function(config) {
    if (Object.keys(models).length && !force) {
        return models;
    }

    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );

    let modules = [
        require('./user'),
        require('./application'),
        require('./team'),
        require('./cubstart'),
    ];

    modules.forEach(module => {
        const model = module.default(sequelize, Sequelize, config);
        models[model.name] = model;
    });

    Object.keys(models).forEach(key => {
        if ('associate' in models[key]) {
            models[key].associate(models);
        }
    });

    models.sequelize = sequelize;
    models.Sequelize = Sequelize;

    sequelize.sync();

    return models;
})(config);

module.exports = {
    ...models,
    sequelize
};
