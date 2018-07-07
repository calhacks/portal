
export default (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        code: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            },
            allowNull: false
        }
    });

    Team.associate = models => {
        models.Team.hasMany(models.User, {
            foreignKey: 'id'
        });
    };

    return Team;
};
