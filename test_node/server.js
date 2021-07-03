const express = require('express'); 
const bodyParser = require('body-parser');
const logger = require('./winston');
const morgan = require('morgan');
const app = express(); 

const port = process.env.PORT || 5000; 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true})); 

app.use(morgan(':method :url :status :response-time ms :remote-addr :http-version', {stream : logger.stream, skip : logger.skip.skip})); // morgan 로그 설정 

app.get('/test/winston', (req, res, next) => {
    logger.info('info test');
    logger.warn('warn test');
    logger.error('error test');
});


app.listen(port, () => console.log(`Listening on port ${port}`));
