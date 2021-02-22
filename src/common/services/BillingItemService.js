const DynamoDbAdapter = require('../adapters/DynamoDbAdapter')
const BillingItem = require('../entities/BillingItem')
const log = require('../log')(__filename)

module.exports = class BillingItemService {
  constructor(dynamoDbAdapter) {
    this.dynamoDbAdapter = dynamoDbAdapter || new DynamoDbAdapter()
  }

  /**
   * @param {Object} payload
   * @param {String} payload.name
   * @param {Number} payload.cost
   */
  async createBillingItem(payload) {
    log(`Creating Billing Item ${payload.name} with cost ${payload.cost}`)
    const item = new BillingItem(payload)
    const params = {
      Item: item.toItem(),
      ConditionExpression: 'attribute_not_exists(PK)',
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }
    await this.dynamoDbAdapter.create(params)
    return item
  }

  async getBillingItem(name) {
    const params = {
      Key: {
        PK: { S: `BILLING_ITEM#${name}` },
        SK: { S: `BILLING_ITEM#${name}` }
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: process.env.tableName
    }
    const res = await this.dynamoDbAdapter.get(params)
    if (!res.Item) {
      const e = new Error('Billing item not found in db')
      e.statusCode = 404
      e.name = 'Billing Item not found'
      throw e
    }
    return BillingItem.fromItem(res.Item)
  }
}
