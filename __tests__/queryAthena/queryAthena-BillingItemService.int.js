/* eslint-disable max-len */
/**
 * @jest-environment node
 */

const IntegrationTestHelper = require('../IntegrationTestHelper')
const BillingItemService = require('../../src/common/services/BillingItemService')
const DynamoDbAdapter = require('../../src/common/adapters/DynamoDbAdapter')
const log = require('../../src/common/log')(__filename)

const timeout = 50000

let ITH
let service
let awsServiceName
const cleanup = []

describe('Billing Item Service for Lambda queryAthena', () => {
  beforeAll(async () => {
    try {
      ITH = await IntegrationTestHelper.assumeRoleByLambdaName('queryAthena')
      service = new BillingItemService()
      awsServiceName = Math.random().toString(36).substring(7).toUpperCase()
    } catch (e) {
      console.log(e)
    }
  })

  it('should create Billing Item in database', async () => {
    // GIVEN
    const payload = {
      name: awsServiceName,
      cost: 33
    }

    // WHEN
    const actual = await service.createBillingItem(payload)

    // THEN
    expect(actual).toBeTruthy()
    expect(actual.name).toBe(awsServiceName)

    // CLEANUP
    cleanup.push(actual)
  }, timeout)

  it('should return Billing Item from database', async () => {
    // GIVEN
    // WHEN
    const actual = await service.getBillingItem(awsServiceName)

    // THEN
    expect(actual).toBeTruthy()
    expect(actual.name).toBe(awsServiceName)
    expect(actual.cost).toBe(33)
    expect(actual.createdAt).toBeTruthy()
    expect(actual.modifiedAt).toBeTruthy()
  }, timeout)

  it('should throw Error when creating already existing Billing Item in DB', async () => {
    // GIVEN
    const payload = {
      name: awsServiceName,
      cost: 33
    }

    // WHEN
    try {
      const billingItem = await service.createBillingItem(payload)
      await service.createBillingItem(billingItem)
      // THEN
    } catch (e) {
      log(e)
      // TODO improve, wrap in custom error object
      expect(e.name).toBe('ConditionalCheckFailedException')
    }
  }, timeout)

  afterAll(async () => {
    log('After All')
    // This try/catch is needed due to a bug in jest which doesn't propagate exception from this method
    // https://github.com/facebook/jest/issues/9882
    try {
      await ITH.assumeUserRoleBack()
      const userAdapter = new DynamoDbAdapter()
      const deleteAll = cleanup.map((obj) => userAdapter.delete({
        Key: obj.key(),
        TableName: process.env.tableName
      }))
      await Promise.all(deleteAll)
    } catch (error) {
      console.log(error) // ALWAYS display
    } finally {
      log('End of afterAll')
    }
  })
})
