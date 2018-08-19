
export default (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
        phone: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        gender: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        school: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        year: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        major: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        transportation: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        allergies: {
            type: DataTypes.STRING,
        },
        shirt: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        links: {
            type: DataTypes.STRING,
        },
        hackathons: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        hearAbout: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },

        cubstart: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        cubstart1: {
            type: DataTypes.STRING
        },
        cubstart2: {
            type: DataTypes.STRING
        },
        cubstart3: {
            type: DataTypes.STRING
        },
        cubstart4: {
            type: DataTypes.STRING
        },

        question1: {
            type: DataTypes.STRING
        },
        question2: {
            type: DataTypes.STRING
        },
        question3: {
            type: DataTypes.STRING
        },

        beginner: {
            type: DataTypes.STRING
        },
        question4: {
            type: DataTypes.STRING
        },

        status: {
            type: DataTypes.ENUM(
                'inreview',
                'accepted',
                'rejected',
                'waitlisted'
            ),
            defaultValue: 'inreview'
        }
    }, {});

    Application.associate = models => {
        models.Application.belongsTo(models.User);
    };
    return Application;
};
