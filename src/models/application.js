
export defaultValue(sequelize, DataTypes) => {
    const Application = sequelize.define('Application', {
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
        dob: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW,
            validate: {
                isDate: true,
                notEmpty: true
            }
        },
        reimbursement: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        diet: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        resume: {                   // 1. Optional? 2.String object id of file ??
            type: DataTypes.STRING,
            allowNull: true,
        },
        linkedin: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        github: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        devpost: { // ??
            type: DataTypes.STRING,
            notEmpty: true,
            validate: {
                isUrl: true
            }
        },
        question1: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        question2: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        question3: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },

    }, {});

    Application.associate = models => {

    };
    return Application;
};
