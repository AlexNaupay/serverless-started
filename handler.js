const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({
        region: 'local',
        endpoint: 'http://127.0.0.1:8000',
        accessKeyId: 'MockAccessKeyId',
        secretAccessKey: 'MockSecretAccessKey',
    });


const index = async (event, context) => {
    let response = {
        message: 'Hello from index',
        // input: event,
        // context: context
    }

    return {
        statusCode: 200,
        body: JSON.stringify(response, null, 2)
    }
};

const getUsers = async (event, context) => {

    let params = {
        ExpressionAttributeValues: { ':pk': '1' },  // pk=1
        KeyConditionExpression: 'pk = :pk',
        TableName: 'usersTable'
    };

    return dynamodb.query(params).promise()
        .then((response) => {
            console.info(response);
            return {
                statusCode: 200,
                body: JSON.stringify({user: response})
            }
        })
};


module.exports = {
    index,
    getUsers,
}