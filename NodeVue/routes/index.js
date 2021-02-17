const express = require('express');
const publicRouter = require('./public.router');
const authRouter = require('./auth.router');
const router = express.Router();

router.use('/public', publicRouter);

module.exports = router;
