const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateJWT = (userId, email, name) => {
    return jwt.sign({ userId, email, name }, process.env.JWT_SECRET);
};

const validateJWT = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return false;
    }
};

const encrypt = async (pw) => {
    return bcrypt
        .hash(pw, 10)
        .then((enc) => {
            return enc;
        })
        .catch((err) => {
            return false;
        });
};

const compare = async (pw, enc) => {
    return await bcrypt.compare(pw, enc);
};
module.exports = { generateJWT, validateJWT, encrypt, compare };
