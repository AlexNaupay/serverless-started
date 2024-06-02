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

const store = async (event, context) => {
    // console.info(event.body, typeof event.body)

    const contentType = event.headers['Content-Type'];
    if (contentType.toLowerCase() !== 'application/json') {
        return {
            statusCode: 415,  // Unsupported Media Type
            body: JSON.stringify({ message: 'Unsupported content type. Please use application/json.' })
        };
    }

    const body = JSON.parse(event.body)

    const uuid = randomUUID()

    const user =  {name: body.name}
    user.pk = uuid

    let params = {
        TableName: 'usersTable',
        Item: user
    };

    return dynamodb.put(params).promise()
        .then((response) => {
            console.info(response);
            return {
                statusCode: 201,
                body: JSON.stringify(user)
            }
        })
};



module.exports = {
    store
}