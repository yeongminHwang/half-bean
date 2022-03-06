const express  = require('express');
const path     = require('path'); 
const morgan   = require('morgan');

// index.js에 있는 db.sequelize 객체 모듈을 불러옴
const { sequelize } = require('./models');

const app = express();

// configuration =========================
app.set('port', process.env.PORT || 5000);

// PUG 설정, 왜 하는지 모름
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

sequelize.sync({force: false})
    .then(() => {
        console.log("[+] 데이터베이스 연결 성공!");
    }).catch((err) => {
        console.log("[-] 데이터베이스 연결 실패, mysql 켰는지, 비번 등등 확인해보세요. ");
        console.error(err);
    });

app.use(morgan('dev')); // 로그 
app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정 
app.use(express.json()); // json 파싱 
app.use(express.urlencoded({ extended: false })); // uri 파싱

// 테스트
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 서버 실행
app.listen(app.get('port'), () => {
  console.log('[*] ' + app.get('port') + '번 포트에서 대기 중');
});
