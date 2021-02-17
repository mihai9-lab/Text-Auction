const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const userMiddleware = require('../middleware/user.middleware');
router.route('/auth').get((req, res, next) => {
    userMiddleware(req, res, next, true);
});
router.route('/auth/django').post(authController.loginAdmin);
router.route('/register').post(authController.registerUser);
router.route('/login').post(authController.loginUser);
module.exports = router;
