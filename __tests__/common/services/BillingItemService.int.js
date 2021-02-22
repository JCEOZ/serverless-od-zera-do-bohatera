/**
 * @jest-environment node
 */

const DynamoDbAdapter = require('../../../src/common/adapters/DynamoDbAdapter');
const BillingItemService = require('../../../src/common/services/BillingItemService');
const log = require('../../../src/common/log')(__filename)

const timeout = 5000

let awsServiceName
let dbAdapter
let service

describe('Billing Item Service', () => {
  beforeAll(async () => {
    awsServiceName = Math.random().toString(36).substring(7).toUpperCase()
    dbAdapter = new DynamoDbAdapter()
    service = new BillingItemService()
  });
  it('should create Billing Item in database', async () => {
    // GIVEN
    const payload = {
      name: awsServiceName,
      cost: 33
    }

    // WHEN
    const res = await service.createBillingItem(payload)

    // THEN
    expect(res).toBeTruthy()
    expect(res.name).toBe(awsServiceName)
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

  it('should throw Error when Billing Item not present in DB', async () => {
    // GIVEN

    // WHEN
    try {
      await removeItemFromDb(dbAdapter, awsServiceName)
      await service.getBillingItem(awsServiceName)

      // THEN
    } catch (e) {
      expect(e.name).toBe('Billing Item not found')
    }
  }, timeout)
})

const removeItemFromDb = async (adapter, id) => adapter.delete({
  Key: {
    PK: { S: `BILLING_ITEM#${id}` },
    SK: { S: `BILLING_ITEM#${id}` }
  },
  TableName: process.env.tableName
})
