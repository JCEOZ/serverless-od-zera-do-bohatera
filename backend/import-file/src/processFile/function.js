module.exports.handler = async (event) => {
  const fileInfo = parseEvent(event)

  const result = await businessLogic()
  return fileInfo
}

const businessLogic = () => {
  
}

const parseEvent = (event) => {
  console.log(JSON.stringify(event))
  const bucketName = event.Records[0].s3.bucket.name
  const fileName = decodeURIComponent(event.Records[0].s3.object.key)
  return { bucketName, fileName }
}
