const httpAdapterAxios = require('./httpAdapterAxios')
const businessLogic = require('./businessLogic')

module.exports.handler = async (event) => {
  const job = parseEvent(event)
  const { slackUrl } = process.env
  const result = await businessLogic(httpAdapterAxios, slackUrl, job)
  return result
}

const parseEvent = (event) => {
  console.log(JSON.stringify(event))
  const { Message } = event.Records[0].Sns
  return JSON.parse(Message)
}
