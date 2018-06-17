
export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        email: {
            type: DataTypes.STRING,
            notEmpty: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailCode: {
            type: DataTypes.STRING,
            notEmpty: true,
            unique: true
        },
        emailValidated: {
            type: DataTypes.BOOLEAN
        },
        role: {
            type: DataTypes.ENUM('hacker', 'admin'),
            notEmpty: true
        }
    }, {});

    User.associate = models => {
        models.User.hasOne(models.Application, {
            foreignKey: 'id'
        });
    };
    return User;
};
