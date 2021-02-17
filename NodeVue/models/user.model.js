const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (db) => {
    class User extends Model {}

    User.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tokens: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: parseInt(process.env.DEFAULT_TOKENS)
            },
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            last_login:{
                type:DataTypes.DATE
            }
        },
        {
            sequelize: db,
            modelName: 'User'
        }
    );
    return User;
};
