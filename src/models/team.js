
export default (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            },
            allowNull: false
        }
    });

    Team.associate = models => {
        models.Team.hasMany(models.User);
    };

    return Team;
};
