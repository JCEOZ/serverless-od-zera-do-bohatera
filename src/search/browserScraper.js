// eslint-disable-next-line no-unused-vars
const chromium = require('chrome-aws-lambda');

module.exports.fetchData = async (browser) => {
  const url = 'https://nofluffjobs.com/jobs?criteria=serverless'

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 920 })
    await page.goto(url)
    const title = await page.title();
    console.log('Page Title:', title)

    const [cookieButton] = await page.$x("//button[contains(., ' OK, i got it ')]");
    if (cookieButton) {
      await cookieButton.click()
    }


    const resultsSelector = "//a[@data-cy='nfjPostingListItem']"
    const links = await page.$x(resultsSelector)

    const jobOfferUrls = await page.evaluate((...temp) => temp.map((e) => e.href), ...links);

    console.log(jobOfferUrls);

    return jobOfferUrls
  } catch (error) {
    console.log(error);

    return false
  } finally {
    if (browser !== null) {
      // await browser.close();
    }
  }
}
