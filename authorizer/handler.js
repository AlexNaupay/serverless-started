const index = async (event, context) => {
    let date = new Date();
    let minutes = date.getMinutes()
    let hour = date.getHours()

    console.log(`${hour}:${minutes}`)
    const clientToken = event.authorizationToken || event.headers.Authorization

    if (clientToken === `Bearer ${process.env.SECRET_EGG}-${hour}-${minutes}`) {
        return {
            principalId: 'anonymous',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: event.methodArn,
                    },
                ],
            },
        };
    }

    throw Error('Unauthorized');
}
module.exports = { index }