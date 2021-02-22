const { fetchData } = require('./browserScraper')
const { initBrowser } = require('../common/browserLambda')

const cachedBrowser = initBrowser()

module.exports.handler = async () => {
  const browser = await cachedBrowser
  const results = await businessLogic(browser)
  return results
}

const businessLogic = async (browser) => {
  const results = await fetchData(browser)
  console.log(JSON.stringify(results))
  return results.length
}
