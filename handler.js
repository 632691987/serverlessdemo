'use strict';

const { v4: uuidv4 } = require('uuid');
const middy = require('@middy/core');
const httpErrorHandler = require('@middy/http-error-handler');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const middyCommon = require('./middyCommon');

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

module.exports.hello = middyCommon(async (event, context) => {
    const result_data = await listTablesCommand();
    const tablename = process.env.DYNAMODB_TABLE_NEWS;

    return {
        statusCode: 200,
        body: JSON.stringify({
            uuid: uuidv4(),
            message: 'this is version v2, table name =' + tablename,
            body: result_data.TableNames,
        }),
    };
});


module.exports.envstudy = middyCommon(async (event, context) => {
    const author = process.env.CONTEXT_AUTHOR_NAME;

    return {
        statusCode: 200,
        body: JSON.stringify({
            uuid: uuidv4(),
            message: 'My name is ' + author
        }),
    };
});