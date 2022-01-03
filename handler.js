'use strict';

const { v4: uuidv4 } = require('uuid');
const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');
const httpJsonBodyParser = require('@middy/http-json-body-parser');

const {
    DynamoDBClient,
    ListTablesCommand,
    QueryCommand,
    PutItemCommand,
    GetItemCommand,
    ScanCommand,
} = require("@aws-sdk/client-dynamodb");
const dynamoDBClient = new DynamoDBClient();

const listTablesCommand = async () => {
    let data = {}
    const params = {
    }
    const command = new ListTablesCommand(params);
    data = await dynamoDBClient.send(command);

    return data
}

module.exports.hello = middy(async (event, context) => {
    const result_data = await listTablesCommand()

    return {
        statusCode: 200,
        body: JSON.stringify({
            uuid: uuidv4(),
            message: 'this is version 1',
            body: result_data.TableNames,
        }),
    }
}).use(httpErrorHandler()).use(httpJsonBodyParser());