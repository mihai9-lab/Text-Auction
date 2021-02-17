const { DataTypes, Model } = require('sequelize');

module.exports = (db) => {
    class Reaction extends Model {}

    Reaction.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize: db,
            modelName: 'Reaction'
        }
    );
    return Reaction;
};
