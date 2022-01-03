const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

module.exports = (hander) => {
    return middy(hander)
        .use([
            httpErrorHandler(),
            httpJsonBodyParser(),
        ]);
}