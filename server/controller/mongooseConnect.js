const mongoose = require('mongoose');

const { MONGO_DB_URL } = process.env;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL, {
      dbName: '2023_Project',
      // url 정상적으로 접근가능
      useNewUrlParser: true,
    });
    console.log('몽구스 접속 성공!');

    mongoose.connection.on('error', (err) => {
      console.error('몽고 디비 연결 에러', err);
    });
    mongoose.connection.on('disconnected', () => {
      console.error('몽고 디비 연결이 끊어졌습니다. 연결을 재시도 합니다.');
      // 함수 재실행
      connect();
    });
  } catch (err) {
    console.log(err);
  }
};

connect();

module.exports = connect;
