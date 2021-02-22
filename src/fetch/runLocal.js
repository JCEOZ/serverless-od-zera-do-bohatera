const browserLocal = require('../common/browserLocal')
const browserScraper = require('./browserScraper')

const main = async () => {
  const browser = await browserLocal.initBrowser()
  const url = 'https://nofluffjobs.com/job/remote-principal-backend-enginieer-olx-group-oe2x1nmy'
  await browserScraper.fetchData(browser, url)
  await browser.close()
}

main()
