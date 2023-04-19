const mongooseConnect = require("./mongooseConnect");
const Board = require("../models/board");

// 클라이언트측에서 post요청 보내면 로그인유효성 검사후 이동
const getArticles = async (req, res) => {
  try {
    const selectArticle = await Board.find();
    res.status(200).json(selectArticle);
  } catch (err) {
    console.log(err);
  }
};

// 클라이언트측에서 post 요청 시
// db에 저장
const writeArticle = async (req, res) => {
  const { email, content } = req.body;
  try {
    const newComment = new Board({ email, content });
    await newComment.save();
    await Board.create(newComment);
    res.status(200).json({ text: "댓글 성공" });
    console.log("댓글 저장 성공");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getArticles,
  writeArticle,
};
