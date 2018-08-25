
export default (sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
        phone: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        gender: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        school: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        year: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        major: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        transportation: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        allergies: {
            type: DataTypes.TEXT,
        },
        shirt: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        links: {
            type: DataTypes.TEXT,
        },
        hackathons: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        hearAbout: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },

        cubstart: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        cubstart1: {
            type: DataTypes.TEXT
        },
        cubstart2: {
            type: DataTypes.TEXT
        },
        cubstart3: {
            type: DataTypes.TEXT
        },
        cubstart4: {
            type: DataTypes.TEXT
        },

        question1: {
            type: DataTypes.TEXT
        },
        question2: {
            type: DataTypes.TEXT
        },
        question3: {
            type: DataTypes.TEXT
        },

        beginner: {
            type: DataTypes.TEXT
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
