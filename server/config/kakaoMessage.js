const request = require('request');

const sendKakaoMessage = (kakao_access_token, area) => {
  //카카오 나에게 보내는 메시지 템플릿
  let testObj = {
    object_type: 'text',
    text: `현재 인구밀도 '혼잡'인 ${area}지역에 있습니다! 안전에 유의하세요!`,
    link: {
      web_url: 'https://localhost:3000/login',
      mobile_web_url: 'https://localhost:3000/login',
    },
    button_title: '바로 확인',
  };
  let testObjStr = JSON.stringify(testObj);

  //요청 옵션
  let options = {
    url: 'https://kapi.kakao.com/v2/api/talk/memo/default/send',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${kakao_access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      template_object: testObjStr,
    },
  };
  function callback(error, response, body) {
    if (response) {
      console.log(body);
    }
  }
  request(options, callback);
};

module.exports = { sendKakaoMessage };
