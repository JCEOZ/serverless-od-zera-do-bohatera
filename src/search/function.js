const { fetchData } = require('./browserScraper')
const { initBrowser } = require('../common/browserLambda')
const { write, getAll } = require('./dbAdapter')

const cachedBrowser = initBrowser()

module.exports.handler = async () => {
  const browser = await cachedBrowser
  const results = await businessLogic(browser, write, getAll)
  return results
}

const businessLogic = async (browser, saveToRepository, getAllFromRepository) => {
  const urls = await fetchData(browser)
  const alreadyProcessed = (await getAllFromRepository()).map((e) => e.url)

  const toProcess = urls.filter((e) => !alreadyProcessed.includes(e))
  console.log('toProcess', toProcess);

  const results = await Promise.all(toProcess.map((e) => saveToRepository({ url: e })))
  return results.length
}
