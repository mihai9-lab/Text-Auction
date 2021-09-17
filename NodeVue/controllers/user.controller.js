const { models } = require('../db');

const tokenCount = async (req, res) => {
    const user = await models.user.findOne({
        where: {
            id: req.user.userId
        }
    });
    res.status(200).json({ tokens: user.tokens });
};

module.exports = {
    tokenCount
};
