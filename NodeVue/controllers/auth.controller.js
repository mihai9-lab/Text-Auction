const loginValidate = require('../validation/login.validate');
const adminLoginValidate = require('../validation/adminLogin.validate');
const registerValidate = require('../validation/register.validate');
const { models } = require('../db');
const auth = require('../auth');
const loginUser = async (req, res, next) => {
    let validation = await loginValidate.validateAsync(req.body).catch((err) => err);
    if (validation instanceof Error) {
        return res.status(400).json(validation.details.map((val) => val.message));
    }
    let user = await models.user.findOne({
        where: {
            email: req.body.email
        }
    });
    if (user === null) {
        return res.status(400).json(['Email incorrect']);
    }
    if ((await auth.compare(req.body.password, user.password)) === false) {
        return res.status(400).json(['Password incorrect']);
    }
    const jwt = auth.generateJWT(user.id, user.email, user.name);
    res.cookie('auction-secret', JSON.stringify(jwt), {
        maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
    });
    res.status(200).send();
};
const registerUser = async (req, res, next) => {
    let validation = await registerValidate.validateAsync(req.body).catch((err) => err);
    if (validation instanceof Error) {
        return res.status(400).json(
            validation.details.map((val) => {
                if (val.path[0] === 'confirmationPassword') {
                    return 'Passwords do not match';
                }
                return val.message;
            })
        );
    }
    let user = req.body;
    delete user.confirmationPassword;
    user.password = await auth.encrypt(user.password);
    await models.user.create(user);
    res.status(200).send();
};

const loginAdmin = async (req, res, next) => {
    let validation = await adminLoginValidate.validateAsync(req.body).catch((err) => err);
    if (validation instanceof Error) {
        return res.status(400).json({
            success: false,
            messages: validation.details.map((val) => {
                if (val.path[0] === 'confirmationPassword') {
                    return 'Passwords do not match';
                }
                return val.message;
            })
        });
    }
    let user = await models.user.findOne({
        where: {
            email: req.body.email
        }
    });
    if (user === null) {
        return res.status(400).json(['Email incorrect']);
    }
    if ((await auth.compare(req.body.password, user.password)) === false) {
        return res.status(400).json(['Password incorrect']);
    }
    if (user.admin === false) {
        return res.status(401).send();
    }

    res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name
    });
};
module.exports = {
    loginUser,
    registerUser,
    loginAdmin
};
