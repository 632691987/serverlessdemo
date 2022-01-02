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

测试：

本地:
sls invoke local -f hello

远程：
Solution 1:
curl --location --request POST 'https://bi5197k2gk.execute-api.eu-west-3.amazonaws.com/v1/json' \
--header 'Content-Type: application/json' \
--data-raw '{"Name":"koma", "Region":"Earth"}'

注意点：
1, 在一开始 gitclone 之后，是不能直接使用 sls invoke local -f hello, 必须首先deploy, 出发产生 .serverless 文件夹
2, 我没有做任何过多的配置，就是安装了awscli