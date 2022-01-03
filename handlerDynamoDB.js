'use strict';
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');
const middyCommon = require('./middyCommon')

const {
    DynamoDBClient,
    ListTablesCommand,
    QueryCommand,
    PutItemCommand,
    GetItemCommand,
    ScanCommand,
} = require("@aws-sdk/client-dynamodb");
const dynamoDBClient = new DynamoDBClient();

module.exports.insertNews = middyCommon(async (event, context) => {
    const tablename = process.env.DYNAMODB_TABLE_NEWS
    const reqBody = event.body

    // 必须项目检测
    if (reqBody && reqBody.title && reqBody.content && reqBody.permalink) { }
    else
        throw new createError.Forbidden("啥也没收到!")

    let item = {
        "title": { "S": reqBody.title },
        "content": { "S": reqBody.content },
        "permalink": { "S": reqBody.permalink },
    }

    let data = {};
    let params = {};
    try {
        params = {
            TableName: tablename,
            Item: {
                "guid": { "S": uuidv4() },
                "pubdate": { "N": new Date().getTime().toString() },
                ...item,
            },
            ReturnConsumedCapacity: 'TOTAL',
        }
        console.log("DEBUG", "params", params)
        const command = new PutItemCommand(params);
        data = await dynamoDBClient.send(command);
        console.log(data)
    } catch (err) {
        console.error("ERROR", err)
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            body: params,
        }),
    }
});

module.exports.newslist = middyCommon(async (event, context) => {
    const tablename = process.env.DYNAMODB_TABLE_NEWS
    let data = {}

    try {
        const params = {
            TableName: tablename,
            ReturnConsumedCapacity: 'TOTAL',
        }
        console.log("DEBUG", "params", params)
        const command = new ScanCommand(params);
        data = await dynamoDBClient.send(command);
        console.log(data)
    } catch (err) {
        console.error("ERROR", err)
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            body: data,
        }),
    }
});