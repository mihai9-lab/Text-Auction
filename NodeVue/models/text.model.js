const { DataTypes, Model } = require('sequelize');

module.exports = (db) => {
    class Text extends Model {}

    Text.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement:true
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            price: {
                type: DataTypes.BIGINT,
                allowNull: false
            }
        },
        {
            sequelize: db,
            modelName: 'Text'
        }
    );
    return Text;
};
