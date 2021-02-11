const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  signatureVersion: 'v4'
});

const { returnOnSuccess } = require('./resultsWrapper')

module.exports.handler = async (event) => {
  const fileName = parseEvent(event)

  const params = {
    Bucket: process.env.bucketName,
    Key: fileName,
    Expires: 600, // 10 minut
    ACL: 'private' //'public-read'
  }
  const url = await S3.getSignedUrlPromise('putObject', params)
  return returnOnSuccess({
    signedUrl: url
  })
}

const parseEvent = (event) => {
  // console.log(JSON.stringify(event))
  if (event.queryStringParameters && event.queryStringParameters.filename) {
    return event.queryStringParameters.filename
  }
  return 'defaultFile.csv'
}
