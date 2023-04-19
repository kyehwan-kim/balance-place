const CryptoJS = require('crypto-js');
const axios = require('axios');
const { sendKakaoMessage } = require('./kakaoMessage');

require('dotenv').config();

const { NCP_serviceID, NCP_access_key, NCP_secret_key, DEFAULT_PHONE } =
  process.env;

const date = Date.now().toString();
const myPhone = DEFAULT_PHONE;
const method = 'POST';
const space = ' ';
const newLine = '\n';
const url = `https://sens.apigw.ntruss.com/sms/v2/services/${NCP_serviceID}/messages`;
const url2 = `/sms/v2/services/${NCP_serviceID}/messages`;

const simpleNotification = async (phone, kakao_access_token, area) => {
  try {
    if (phone) {
      const hmac = CryptoJS.algo.HMAC.create(
        CryptoJS.algo.SHA256,
        NCP_secret_key
      );
      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      hmac.update(NCP_access_key);
      const hash = hmac.finalize();
      const signature = hash.toString(CryptoJS.enc.Base64);

      const smsResponse = await axios({
        method: method,
        url: url,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-apigw-timestamp': `${date}`,
          'x-ncp-iam-access-key': `${NCP_access_key}`,
          'x-ncp-apigw-signature-v2': `${signature}`,
        },
        data: {
          type: 'SMS',
          countryCode: '82',
          from: `${myPhone}`,
          content: `[북적북적] 현재 인구밀집 '혼잡'인 ${area}지역에 위치해 있습니다. 안전에 유의해주세요!`,
          messages: [{ to: `${phone}` }],
        },
      });

      console.log(smsResponse.data);
    } else {
      sendKakaoMessage(kakao_access_token, area);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { simpleNotification };
