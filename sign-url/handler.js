const AWS = require("aws-sdk")

const s3 = new AWS.S3({ signatureVersion: 'v4' })

const signS3Url = async (event, context) => {
    const filename = event.queryStringParameters.filename
    const signedUrl = await s3.getSignedUrlPromise("putObject", {
        Key: `upload/${filename}`,
        Bucket: process.env.BUCKET_NAME,
        Expires: 300,  // Seconds
    });
    return {
        "statusCode": 200,
        "body": JSON.stringify({ signedUrl })
    }
}

module.exports = {
    signS3Url
}