module.exports.handler = async (event) => {
  const fileInfo = parseEvent(event)

  const result = await businessLogic(fileInfo)
  return fileInfo
}

const businessLogic = async (fileInfo, getFile, postToQueue) => {
  const file = await getFile(fileInfo)
  const items = splitFileByItem(file)
  const promises = items.map(postToQueue)
  return Promise.all(promises)
}

const splitFileByItem = (file) => {
  return [{}]
}

const parseEvent = (event) => {
  console.log(JSON.stringify(event))
  const bucketName = event.Records[0].s3.bucket.name
  const fileName = decodeURIComponent(event.Records[0].s3.object.key)
  return { bucketName, fileName }
}
