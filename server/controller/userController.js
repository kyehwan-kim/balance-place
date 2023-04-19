const mongooseConnect = require('./mongooseConnect');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { simpleNotification } = require('../config/naverApiTest');
const bcrypt = require('bcrypt');

const { ACCESS_SECRET } = process.env;

mongooseConnect();
const saltRounds = 10;

//유저 로그인시 데이터를 받기 위한 전역변수
let isNormalUserLogined = false;
let userID;

// 회원 가입
// 몽구스 삽입은 create, 뒤에 {} = One, 뒤에 [] = Many
const registerUser = async (req, res) => {
  let { email, phone, password, passwordCheck } = req.body;
  // 빈값이 오면 팅겨내기
  if (email === '' || phone === '' || password === '' || passwordCheck === '') {
    return res.json({ registerSuccess: false, message: '정보를 입력하세요' });
  }

  const sameEmailUser = await User.findOne({ email: email });
  if (sameEmailUser !== null) {
    return res.json({
      registerSuccess: false,
      message: '이미 존재하는 이메일입니다',
    });
  }

  const sameNickNameUser = await User.findOne({ phone });
  if (sameNickNameUser !== null) {
    return res.json({
      registerSuccess: false,
      message: '이미 존재하는 닉네임입니다.',
    });
  }

  // 솔트 생성 및 해쉬화 진행
  bcrypt.genSalt(saltRounds, async (err, salt) => {
    // 솔트 생성 실패시
    if (err)
      return res.status(500).json({
        registerSuccess: false,
        message: '비밀번호 해쉬화에 실패했습니다.',
      });
    // salt 생성에 성공시 hash 진행

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err)
        return res.status(500).json({
          registerSuccess: false,
          message: '비밀번호 해쉬화에 실패했습니다.',
        });

      // 비밀번호를 해쉬된 값으로 대체합니다.
      password = hash;

      try {
        const user = new User({
          email: email,
          phone,
          password,
        });
        await user.save();
        await User.create(user);
        return res.json({ registerSuccess: true });
      } catch (err) {
        return res.json({ registerSuccess: false, message: err.message });
      }
    });
  });
};

//로그인 미들웨어
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //알림 기능을 위한 전역변수 변경
  userID = email;
  isNormalUserLogined = true;
  try {
    // body에 담아서 보내준 email을 db에서 확인
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        loginSuccess: false,
        message: '해당되는 이메일이 없습니다.',
      });
    }

    // 해싱 암호화한 비밀번호 대조
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // 비밀번호가 일치하면 jwt토큰 씌우기
      const token = jwt.sign({ email: user.email }, ACCESS_SECRET, {
        expiresIn: '7d',
      });

      user.token = token;
      return res
        .status(200)
        .json({ loginSuccess: true, email: user.email, token });
    } else {
      return res.status(403).json({
        loginSuccess: false,
        message: '비밀번호가 틀렸습니다.',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'something wrong' });
  }
};

const kakaoLoginUser = async (req, res) => {
  //프론트에서 요청과 함께 보낸 카카오 엑세스 토큰을 변수에 저장
  const KAKAO_CODE = req.body.kakao_access_token;

  try {
    //카카오 엑세스 토큰을 사용하여 사용자 정보에 접근!
    const userResponese = await fetch(`https://kapi.kakao.com/v2/user/me`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KAKAO_CODE}`,
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
    if (userResponese.status === 200) {
      const userKaKaoInfo = await userResponese.json();

      //jwt accesstoken 발급
      const kakaoAccessToken = jwt.sign(
        {
          id: userKaKaoInfo.id,
          email: userKaKaoInfo.kakao_account.email,
        },
        ACCESS_SECRET,
        {
          expiresIn: 1000 * 60,
          issuer: 'About Tech',
        }
      );
      // 쿠키에 담아서 전송
      res.cookie('kakaoAccessToken', kakaoAccessToken, {
        secure: false,
        httpOnly: false,
      });
    }
    res.status(200).json('엑세스 토큰 받기 성공!');
  } catch (err) {
    console.error(err);
  }
};

// 로그인 유효성 검사 미들웨어
const checkLoggedIn = async (req, res, next) => {
  try {
    const token = req.body.token; // 세션에 저장된 토큰 값을 가져옴
    const decoded = jwt.verify(token, ACCESS_SECRET); // 토큰을 디코딩해서 검증
    const user = await User.findOne({ email: decoded.email }); // 검증된 사용자 정보를 가져옴

    if (user) {
      req.userInfo = user;
      next(); // 다음 미들웨어 실행
    } else {
      // 사용자 정보가 없으면 로그인 상태를 초기화
      res.redirect('/login');
    }
  } catch (err) {
    // 토큰 검증에 실패한 경우 로그인 상태를 초기화
    res.redirect('/login');
  }
};

// 로그인 유효성 검사 미들웨어
const checkToken = async (req, res) => {
  try {
    const token = req.body.token; // 세션에 저장된 토큰 값을 가져옴
    const decoded = jwt.verify(token, ACCESS_SECRET); // 토큰을 디코딩해서 검증
    const user = await User.findOne({ email: decoded.email }); // 검증된 사용자 정보를 가져옴

    if (user) {
      res.status(200).json("token 검증 성공");
      req.userInfo = user;
    } else {
      // 사용자 정보가 없으면 로그인 상태를 초기화
      res.redirect("/login");
    }
  } catch (err) {
    // 토큰 검증에 실패한 경우 로그인 상태를 초기화
    res.redirect("/login");
  }
};

// 로그아웃 미들웨어
const logout = (req, res) => {
  try {
    // 요청시 body에 보낸 token값을 받아 비교
    const token = req.body.token;
    if (!token) {
      return res.status(400).send('No token provided');
    }
    res.status(200).json('Logout Success');
  } catch (error) {
    res.status(500).json(error);
  }
};

const findPhoneNumber = async (req, res) => {
  const kakaoAccessToken = req.body.kakao_access_token;
  const area = req.body.area;

  //이메일 형식의 유저 아이디를 컨트롤러 상단의 전역변수에서 받아와서 DB에서 해당 유저정보를 가져옴
  const user = await User.findOne({ email: userID }).select('phone');
  const phone = user?.phone;

  if (isNormalUserLogined || userID !== undefined || kakaoAccessToken) {
    try {
      // 핸드폰 번호가 존재하면 알림문자전송 모듈에 인자로 전달
      if (phone || kakaoAccessToken) {
        simpleNotification(phone, kakaoAccessToken, area);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json('알 수 없는 오류가 발생했습니다.');
    }
  } else {
    const errorMessage =
      '로그인 미들웨어에서 처리가 안됐거나 카카오엑세스 토큰값 확인 불가';
    console.error(errorMessage);
    res.status(500).json(errorMessage);
  }
};

module.exports = {
  loginUser,
  registerUser,
  kakaoLoginUser,
  logout,
  findPhoneNumber,
  checkLoggedIn,
  checkToken,
};
