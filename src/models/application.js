
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
        genderOther: {
            type: DataTypes.TEXT,
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
        bday: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true,
            },
        },
        race: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true,
            },
        },
        raceOther: {
            type: DataTypes.TEXT,
        },
        major: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        thumbnail: {
            type: DataTypes.TEXT
        },
        transportation: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        requireTransportation: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        chCodeOfConduct: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        mlhCodeOfConduct: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        mlhAffiliation: {
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
            type: DataTypes.ARRAY(DataTypes.TEXT),
            validate: {
                notEmpty: true
            }
        },
        hearAboutOther: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: false
            }
        },
        spotlightBlurb: {
            type: DataTypes.TEXT,
        },

        resume: {
            type: DataTypes.TEXT,
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
        }
    }, {});

    Application.associate = models => {
        models.Application.belongsTo(models.User);
        models.Application.hasMany(models.ApplicationScore);
    };
    return Application;
};
