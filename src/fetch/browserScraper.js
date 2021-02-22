// eslint-disable-next-line no-unused-vars
const chromium = require('chrome-aws-lambda');

module.exports.fetchData = async (browser, url, dlq) => {
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 920 })
    await page.goto(url)
    const pageTitle = await page.title();
    console.log('Page title', pageTitle)

    // eslint-disable-next-line max-len
    const textFrom = async (puppeteerElement) => (await page.evaluate((e) => e.textContent, puppeteerElement)).trim()

    const title = pageTitle.slice(12)

    const [moneyElement] = await page.$x("//h4[@class='mb-0']");
    const money = await textFrom(moneyElement)

    const [moneyTypeElement] = await page.$x("//div[contains(@class, 'salary')]/p");
    const moneyType = await textFrom(moneyTypeElement)

    const [logoElement] = await page.$x("//a[contains(@class, 'posting-logo')]/img");
    const image = await page.evaluate((e) => e.src, logoElement)

    const [descriptionElement] = await page.$x("//div[contains(@class, 'p-4')]/p");
    const description = descriptionElement ? await textFrom(descriptionElement) : 'brak opisu'

    const job = {
      title, money, moneyType, image, description, url
    }
    console.log(job);

    return job
  } catch (error) {
    console.log(error)
    await dlq({ message: error.message, stack: error.stack })
    return false
  } finally {
    if (browser !== null) {
      // await browser.close();
    }
  }
}
