This project is build base on serverless framework, and then with some other lib

  "dependencies": {
    "@middy/core": "^2.5.4",
    "@middy/http-error-handler": "^2.5.4",
    "@middy/http-json-body-parser": "^2.5.4",
    "http-errors": "^2.0.0",
    "uuid": "^8.3.2"
  }

use following command to deploy:

serverless


serverless deploy --verbose
serverless deploy --function hello (if only update handler.js file)
serverless remove --verbose