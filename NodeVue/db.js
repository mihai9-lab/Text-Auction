const models = {};
let db = null;
const initialize = async () => {
    const { Sequelize } = require('sequelize');
    db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mariadb'
    });
    try {
        await db.authenticate();
        console.log('Successfully connected to db');
    } catch (err) {
        console.log('Connection to db failed: ' + err);
    }
    models.user = require('./models/user.model')(db);
    models.text = require('./models/text.model')(db);
    models.reaction = require('./models/reaction.model')(db);
    models.user.hasMany(models.text, {
        onDelete: 'SET NULL'
    });
    models.user.hasMany(models.reaction, {
        onDelete: 'SET NULL'
    });
    models.text.hasMany(models.reaction, {
        onDelete: 'SET NULL'
    });
    db.sync();
};

module.exports = {
    initialize,
    models
};
