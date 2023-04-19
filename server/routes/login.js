const express = require("express");
const {
  loginUser,
  kakaoLoginUser,
  // isLoggedIn,
  checkToken,
} = require("../controller/userController");

const router = express.Router();

router.post("/kakaologin", kakaoLoginUser);
router.post("/", loginUser);
router.post("/checkToken", checkToken);

module.exports = router;
