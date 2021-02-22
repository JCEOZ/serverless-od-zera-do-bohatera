const SNS = require('aws-sdk/clients/sns')

const sendMessage = (topic) => async (message) => {
  console.log(`Sending message to a ${topic}`)
  const sns = new SNS()
  const params = {
    Message: JSON.stringify(message),
    TopicArn: topic
  }
  return sns.publish(params).promise()
}

module.exports = {
  sendMessage
}
