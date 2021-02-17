const auth = require('../auth');
const userMiddleware = async (req, res, next, respond = false) => {
    let cookie = req.cookies['auction-secret'];
    if (cookie === null) {
        return res.status(401).send();
    }
    let token = JSON.parse(cookie);
    let jwt = await auth.validateJWT(token);
    if (jwt === false) {
        return res.status(401).send();
    }
    req.user = jwt;
    if (respond) {
        return res.status(200).send();
    }
    next();
};

module.exports = userMiddleware;
