export default (sequelize, DataTypes) => {
    const ApplicationScore = sequelize.define('ApplicationScore', {
        director: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        UserId: {
          type: DataTypes.INTEGER
        },
        experience: {
          type: DataTypes.BOOLEAN
        },
        category1: {
          type: DataTypes.FLOAT
        },
        category2: {
          type: DataTypes.FLOAT
        },
        category3: {
          type: DataTypes.FLOAT
        }
    });

    /*ApplicationScore.associate = models => {
        models.ApplicationScore.hasOne(models.User);
    };*/

    return ApplicationScore;
};
