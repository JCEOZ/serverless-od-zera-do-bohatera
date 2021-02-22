/**
 * @jest-environment node
 */

const AthenaAdapter = require('../../../src/common/adapters/AthenaAdapter')
const AwsCostsService = require('../../../src/common/services/AwsCostsService')

const timeout = 50000

describe('Aws Costs Service', () => {
  it('should get Top 10 Most Expensive Aws Services from Athena Data Lake', async () => {
    // GIVEN
    const getRemainingTimeInMillis = () => 29000
    const athenaAdapter = new AthenaAdapter()
    const service = new AwsCostsService(athenaAdapter, getRemainingTimeInMillis)

    // WHEN
    const actual = await service.getTopTenMostExpensiveAwsServices()
    // console.log(actual); // TODO pokaz to

    // THEN
    expect(actual).toBeTruthy()
    expect(actual[0].awsService).toBe('AmazonRDS')
    expect(actual[0].cost).toBeGreaterThan(10)

    expect(actual[1].awsService).toBe('AmazonVPC')
    expect(actual[1].cost).toBeGreaterThan(5)
  }, timeout)
})
