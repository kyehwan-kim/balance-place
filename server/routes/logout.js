const express = require("express");
const { logout } = require("../controller/userController");

const router = express.Router();

// router.post("/kakaologin", logout);
router.post("/", logout);

module.exports = router;

// router.get('/logout', async (req, res) => {
//   req.session.destroy((err) => {
//     if (err) throw err;
//     res.clearCookie('user');
//     res.redirect('/login');
//   });
// });
