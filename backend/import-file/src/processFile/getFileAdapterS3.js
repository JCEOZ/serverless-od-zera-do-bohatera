const AWS = require('aws-sdk')
const s3 = new AWS.S3()

const getFile = async ({bucketName, fileName}) => {
    const file = await s3.getObject({
        Bucket: bucketName,
        Key: fileName
    }).promise()

    return file.Body.toString().trim()
}

module.exports = {
    getFile
}