const express = require("express");
const { seoulData } = require("../controller/excelFileRead");

const router = express.Router();

router.get("/", seoulData);

module.exports = router;
