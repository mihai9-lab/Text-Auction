const Joi = require('joi');

module.exports = Joi.object({
    auctionId: Joi.number().required(),
    type: Joi.string().valid('like', 'dislike', 'love', 'poop').required()
});
