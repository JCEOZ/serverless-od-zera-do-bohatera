const awsXRay = require('aws-xray-sdk')
const AWS = awsXRay.captureAWS(require('aws-sdk'))
const SQS = new AWS.SQS()

const sendMessage = (queueUrl) => async (message) => {
  console.log(`Sending message to a ${queueUrl}, contents: ${JSON.stringify(message)}`)

  try {
    return SQS.sendMessage({
      MessageBody: JSON.stringify(message),
      QueueUrl: queueUrl
    }).promise()
  } catch (error) {
    console.log(error.message);
    console.log(JSON.stringify(error));
    console.log('message', JSON.stringify(message));
  }
}

module.exports = {
  sendMessage
}
