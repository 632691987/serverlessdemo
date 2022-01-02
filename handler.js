'use strict';

// https://github.com/middyjs/middy 专门为 lambda 定制的

const { v4: uuidv4 } = require('uuid');
var createError = require('http-errors');

const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

module.exports.hello = middy(async (event, context) => {
  const req_body = event.body
  
  return {
      statusCode: 200,
      body: JSON.stringify({
          uuid: uuidv4(),
          body: req_body,
          req_body_type: typeof req_body,
      }, null, 2)
  }
})
.use(httpErrorHandler())
.use(httpJsonBodyParser());