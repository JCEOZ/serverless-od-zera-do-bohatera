const { UrlModel } = require('../../src/search/UrlModel')

describe('Url model', () => {
  it('should should handle write', async () => {
    // GIVEN
    const url = {
      url: 'https://nofluffjobs.com/job/fullstack-java-expert-securionpay-wroclaw-zuofunvm'
    }

    // WHEN
    const actual = UrlModel.put(url)
    console.log(actual);

    // THEN
    expect(actual).toBeTruthy()

    expect(actual.TableName).toBe('local-testing')
    expect(actual.Item.url).toBe(url.url)
  })
})
