const AWS = require('aws-sdk');
const date = new Date();
let dynamoDBClientParams = {}

if (process.env.IS_OFFLINE) {
    dynamoDBClientParams =  {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'MockAccessKey',  // needed if you don't have aws credentials at all in env
        secretAccessKey: 'MockSecretKey' // needed if you don't have aws credentials at all in env
    }
}

const dynamodb = new AWS.DynamoDB.DocumentClient(dynamoDBClientParams)

/*
var params = {TableName: 'usersTable',Item: {pk:'2', name:'Kimberly'}};
dynamodb.put(params).promise().then(console.info)
*/

const index = async (event, context) => {
    let response = {
        message: `Hello from index. ${date.toISOString()}`,
        // input: event,
        // context: context
    }

    return {
        statusCode: 200,
        body: JSON.stringify(response, null, 2)
    }
};

const getUser = async (event, context) => {

    let userId = event.pathParameters.id

    let params = {
        ExpressionAttributeValues: { ':pk': userId },  // pk=1
        KeyConditionExpression: 'pk = :pk',
        TableName: 'usersTable'
    };

    return dynamodb.query(params).promise()
        .then((response) => {
            console.info(response);
            return {
                statusCode: 200,
                body: JSON.stringify({user: response.Items[0]})
            }
        })
};

const getUsers = async (event, context) => {
    let params = {
        TableName: 'usersTable'
    };

    // Use scan
    return dynamodb.scan(params).promise()
        .then((response) => {
            console.info(response);
            return {
                statusCode: 200,
                body: JSON.stringify({users: response.Items})
            }
        })
};


module.exports = {
    index,
    getUser,
    getUsers,
}