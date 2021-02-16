const { getFile } = require('./getFileAdapterS3')
const { sendMessage } = require('./sendMessageAdapterSqs')

module.exports.handler = async (event) => {
  const fileInfo = parseEvent(event)

  const postToQueue = sendMessage(process.env.queueUrl)
  const result = await businessLogic(fileInfo, getFile, postToQueue)
  return result
}

const businessLogic = async (fileInfo, getFile, postToQueue) => {
  const file = await getFile(fileInfo)
  const items = splitFileByItem(file)
  const promises = items.map(postToQueue)
  return Promise.all(promises)
}

const splitFileByItem = (file) => {
  const byLine = /\r?\n/
  const lineToArray = (line) => line.split(',')
  const arrayToObject = (array) => {
    const [name, category, description, imageUrl] = array
    return {name, category, description, imageUrl}
  }

  return file.split(byLine).map(lineToArray).map(arrayToObject)
}

const parseEvent = (event) => {
  console.log(JSON.stringify(event))
  const bucketName = event.Records[0].s3.bucket.name
  const fileName = decodeURIComponent(event.Records[0].s3.object.key)
  return { bucketName, fileName }
}
