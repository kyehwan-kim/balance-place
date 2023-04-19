const express = require('express');
const { fetchData } = require('../controller/fetchData');

const router = express.Router();

router.post('/getdata', fetchData);

module.exports = router;
