const AWS = require('aws-sdk')
const { randomUUID } = require("crypto")

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

const deleteUser = async (event, context) => {
    let id = event.pathParameters.id;

    let params = {
        TableName: "usersTable",
        Key: { pk: id },
    };

    return dynamodb
        .delete(params)
        .promise()
        .then((response) => {
            return {
                statusCode: 200,
                body: JSON.stringify({ id: id }),
            };
        });
};



module.exports = {
    deleteUser
}