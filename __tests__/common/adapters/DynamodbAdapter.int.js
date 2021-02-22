/**
 * @jest-environment node
 */

const DynamoDbAdapter = require('../../../src/common/adapters/DynamoDbAdapter')

const timeout = 5000

describe('DynamoDB Adapter', () => {
  it('should query by field', async () => {
    // GIVEN
    const db = new DynamoDbAdapter()

    // WHEN
    const results = await db.queryByField('PK', 'fake-fake-fake')

    // THEN
    expect(results).toBeTruthy()
    expect(results.Count).toBe(0)
  }, timeout)

  it('should create & delete item', async () => {
    // GIVEN
    const db = new DynamoDbAdapter()
    const paramsCreate = {
      Item: {
        PK: { S: 'SampleId' },
        SK: { S: 'SampleId' },
        Type: { S: 'SampleId' },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }
    const paramsDelete = {
      Key: {
        PK: { S: 'SampleId' },
        SK: { S: 'SampleId' }
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }

    // WHEN
    const createResults = await db.create(paramsCreate)
    const deleteResults = await db.delete(paramsDelete)
    const check = await db.queryByField('PK', 'SampleId')

    // THEN
    expect(createResults).toBeTruthy()
    expect(createResults.ConsumedCapacity.CapacityUnits).toBe(1)
    expect(deleteResults.ConsumedCapacity.CapacityUnits).toBe(1)
    expect(check.Count).toBe(0)
  }, timeout)

  it('should get item', async () => {
    // GIVEN
    const db = new DynamoDbAdapter()
    const paramsCreate = {
      Item: {
        PK: { S: 'SampleId' },
        SK: { S: 'SampleId' },
        Type: { S: 'TestEntity' },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }
    const paramsDelete = {
      Key: {
        PK: { S: 'SampleId' },
        SK: { S: 'SampleId' }
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }
    const paramsGet = {
      Key: {
        PK: { S: 'SampleId' },
        SK: { S: 'SampleId' }
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }

    // WHEN
    const createResults = await db.create(paramsCreate)
    const getResults = await db.get(paramsGet)
    const deleteResults = await db.delete(paramsDelete)
    const check = await db.queryByField('PK', 'SampleId')

    // THEN
    expect(createResults).toBeTruthy()
    expect(createResults.ConsumedCapacity.CapacityUnits).toBe(1)
    expect(getResults.Item.PK.S).toBe('SampleId')
    expect(getResults.Item.SK.S).toBe('SampleId')
    expect(getResults.Item.Type.S).toBe('TestEntity')
    expect(deleteResults.ConsumedCapacity.CapacityUnits).toBe(1)
    expect(check.Count).toBe(0)
  }, timeout)
})
