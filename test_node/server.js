const express = require('express'); 
const path = require('path')// 파일 경로 모듈
require('dotenv').config({ path: path.join(__dirname, './server.env') });//env 로드 모듈
const bodyParser = require('body-parser');
const logger = require('./winston');
const morgan = require('morgan');

const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined"; // NOTE: morgan 출력 형태
console.log(morganFormat);
const app = express(); 

const port = process.env.PORT || 5000; 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true})); 

// app.use(morgan(':method :url :status :response-time ms :remote-addr :http-version', {stream : logger.stream, skip : logger.skip.skip})); // morgan 로그 설정 
app.use(morgan(morganFormat, {stream : logger.stream})); // morgan 로그 설정 

app.get('/test/info', (req, res, next) => {
    logger.info('info test');
    res.status(200).send({
        message : "info test!"
    })
});

app.get('/test/warn', (req, res, next) => {
    logger.warn('warn test');
    res.status(404).send({
        message : "warn test!"
    })
});

app.get('/test/error', (req, res, next) => {
    logger.error('error test');
    res.status(500).send({
        message : "error test!"
    })
});



app.listen(port, () => console.log(`Listening on port ${port}`));
