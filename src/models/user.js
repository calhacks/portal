
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
        },
        resetPasswordCode: {
            type: DataTypes.STRING
        },
        resetPasswordExpiration: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM('noresult', 'rejected', 'accepted_oos_ooa_reimbursed', 'accepted_oos_ooa_noreimbursed', 'accepted_berkeley_wave1', 'accepted_berkeley_wave2a', 'accepted_berkeley_wave2b'),
            notEmpty: true
        },

    }, {});

    User.associate = models => {
        models.User.hasOne(models.Application);
        models.User.hasOne(models.CubStart);
        models.User.belongsTo(models.Team);
    };
    return User;
};
