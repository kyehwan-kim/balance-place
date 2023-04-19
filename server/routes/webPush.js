const express = require('express');
const { findPhoneNumber } = require('../controller/userController');

const router = express.Router();

router.post('/', findPhoneNumber);

module.exports = router;
