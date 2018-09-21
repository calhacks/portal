
export default (sequelize, DataTypes) => {
    const CubStart = sequelize.define('CubStart', {
        cubstart1: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        cubstart2: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        cubstart3: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        cubstart4: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: true
            }
        },
        cubstart5: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: false
            }
        },
        cubstart6: {
            type: DataTypes.TEXT,
            validate: {
                notEmpty: false
            }
        }
    }, {});

    CubStart.associate = models => {
        models.CubStart.belongsTo(models.User);
    };
    return CubStart;
};
