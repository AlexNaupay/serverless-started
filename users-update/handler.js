const AWS = require('aws-sdk')

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

const update = async (event, context) => {

    const userId = event.pathParameters.id
    const body = JSON.parse(event.body)

    const params = {
        TableName: 'usersTable',
        Key: { pk: userId },
        UpdateExpression: 'set #name = :name',
        ExpressionAttributeNames: { '#name' : 'name' },
        ExpressionAttributeValues:
            { ':name' : body.name },
        ReturnValues: 'ALL_NEW'
    };

    return dynamodb.update(params).promise().then(res => {
        console.log(res)
        return {
            "statusCode": 200,
            "body": JSON.stringify({ 'user': res.Attributes })
        }
    })
};



module.exports = {
    update
}