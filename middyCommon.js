const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const httpErrorHandler = require('@middy/http-error-handler');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

module.exports = (hander) => {
    return middy(hander)
        .use([
            httpErrorHandler(),
            httpJsonBodyParser(),
            cors({
                credentials: false,
                //origin: 'http://localhost:3000'
                origin: '*'
            })
        ]);
}