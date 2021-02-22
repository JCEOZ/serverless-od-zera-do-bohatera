const { fetchData } = require('./browserScraper')
const { initBrowser } = require('../common/browserLambda')
const { sendMessage } = require('../common/sendMessageAdapterSns')

const cachedBrowser = initBrowser()

module.exports.handler = async (event) => {
  const isInsert = event.Records[0].eventName === 'INSERT' // other events:MODIFY, INSERT, REMOVE

  if (isInsert) {
    // URL comes from DynamoDB Streams in event
    const url = event.Records[0].dynamodb.Keys.url.S
    console.log(url)
    const browser = await cachedBrowser

    // initialize adapters to AWS SNS topics
    const send = sendMessage(process.env.topicArn)
    const dlq = sendMessage(process.env.topicDlq)

    await businessLogic(browser, url, send, dlq)
  } else {
    console.log('Working only with INSERT events.')
  }
  return true
}

const businessLogic = async (browser, url, send, dlq) => {
  const job = await fetchData(browser, url, dlq)

  if (!job) {
    console.log('Something wrong with web scraper')
    console.log(`Problematic url: ${url}`);
    return false
  }
  return send(job)
}
