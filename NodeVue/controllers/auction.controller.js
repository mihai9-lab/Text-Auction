const { Op } = require('sequelize');
const { models } = require('../db');
const auctionBuyValidate = require('../validation/auctionBuy.validate');
const auctionReactValidate = require('../validation/auctionReact.validate');
const userAuctionsValidate = require('../validation/userAuctions.validate');

const allAuctions = async (req, res, next) => {
    const auctions = await models.text.findAll({
        where: {
            UserId: null
        },
        attributes: ['id', 'text', 'price']
    });
    res.status(200).json({ auctions });
};
const buyAuction = async (req, res, next) => {
    const validation = await auctionBuyValidate.validateAsync(req.body).catch((err) => err);
    if (validation instanceof Error) {
        return res.status(400).json(validation.details.map((val) => val.message));
    }
    const user = await models.user.findOne({
        where: {
            id: req.user.userId
        }
    });
    const auction = await models.text.findOne({
        where: {
            id: validation.id
        }
    });
    if (auction === null || auction === null) {
        return res.status(400).json(['Auction not found']);
    }
    if (auction.UserId !== null || user.tokens < auction.price) {
        return res.status(400).json(['Not enough tokens']);
    }
    await user.decrement({
        tokens: auction.price
    });
    auction.UserId = user.id;
    await auction.save();
    return res.status(200).send();
};
const latestBoughtAuctions = async (req, res, next) => {
    const latestBoughtAuctions = await models.text.findAll({
        where: {
            UserId: {
                [Op.not]: null
            }
        },
        include: [
            {
                model: models.user,
                attributes: ['id', 'name']
            },
            {
                model: models.reaction
            }
        ],
        order: [['updatedAt', 'DESC']],
        limit: 10
    });
    const userId = req.user.userId;
    const auctions = parseAuctions(latestBoughtAuctions, userId);
    return res.status(200).json({ auctions: auctions });
};
const parseAuctions = (auctions, userId) => {
    return auctions.map((auction) => {
        const reactionCounts = {};
        let userHasReacted = auction.UserId === userId;
        let reactedWith;
        auction.Reactions.forEach((reaction) => {
            if (reaction.UserId === userId) {
                userHasReacted = true;
                reactedWith = reaction.type;
            }
            if (reactionCounts[reaction.type] === undefined) {
                reactionCounts[reaction.type] = 0;
            }
            reactionCounts[reaction.type]++;
        });
        return {
            id: auction.id,
            text: auction.text,
            User: auction.User,
            userHasReacted,
            reactedWith,
            reactions: reactionCounts
        };
    });
};
const doReaction = async (req, res) => {
    const validation = await auctionReactValidate.validateAsync(req.body).catch((err) => err);
    if (validation instanceof Error) {
        return res.status(400).json(validation.details.map((val) => val.message));
    }

    const reaction = await models.reaction.findOne({
        where: {
            TextId: validation.auctionId,
            UserId: req.user.userId
        }
    });
    const auction = await models.text.findOne({
        where: {
            id: validation.auctionId
        }
    });
    if (reaction !== null || auction === null) {
        return res.status(400).json(['Already reacted']);
    }
    let tokensToAdd = 0;
    if (validation.type === 'like' || validation.type === 'dislike') {
        tokensToAdd = 100;
    } else {
        tokensToAdd = 200;
    }
    const user = await models.user.findOne({
        where: {
            id: auction.UserId
        }
    });
    console.log(tokensToAdd, auction.UserId, user);
    await user
        .increment({
            tokens: tokensToAdd
        })
        .catch((err) => {
            console.log(err);
        });
    await models.reaction.create({
        UserId: req.user.userId,
        TextId: validation.auctionId,
        type: validation.type
    });
    return res.status(200).send();
};
const userAuctions = async (req, res, next) => {
    const validation = await userAuctionsValidate.validateAsync(req.query).catch((err) => err);
    if (validation instanceof Error) {
        return res.status(400).json(validation.details.map((val) => val.message));
    }
    const auctions = await models.text.findAll({
        where: {
            UserId: validation.id
        },
        include: [
            {
                model: models.user,
                attributes: ['id', 'name']
            },
            {
                model: models.reaction
            }
        ]
    });
    return res.status(200).json({ auctions: parseAuctions(auctions, req.user.userId) });
};
const userProfile = async (req, res, next) => {
    const auctions = await models.text.findAll({
        where: {
            UserId: req.user.userId
        },
        include: [
            {
                model: models.user,
                attributes: ['id', 'name']
            },
            {
                model: models.reaction
            }
        ]
    });
    return res.status(200).json({ auctions: parseAuctions(auctions, req.user.userId) });
};
module.exports = {
    allAuctions,
    buyAuction,
    latestBoughtAuctions,
    doReaction,
    userAuctions,
    userProfile
};
