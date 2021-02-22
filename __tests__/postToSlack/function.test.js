/**
 * @jest-environment node
 */
const businessLogic = require('../../src/postToSlack/businessLogic')

describe('Post to Slack', () => {
  it('should process business logic', async () => {
    // GIVEN
    const url = 'https://hooks.slack.com'
    const job = {
      title: 'test job',
      money: '1000',
      image: 'image.gif',
      description: 'sample description',
      url: 'https://example.com'
    }
    const httpAdapter = {
      post: async (endpointUrl, body, config) => {
        expect(endpointUrl).toBe(url)
        expect(body).toHaveProperty('blocks')
        expect(body.blocks[3].text.text).toBe(job.description)
        return Promise.resolve(true)
      }
    }

    // WHEN
    const actual = await businessLogic(httpAdapter, url, job)

    // THEN
    expect(actual).toBeTruthy()
  });
});
