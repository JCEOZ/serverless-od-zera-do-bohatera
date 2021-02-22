const AWS = require('aws-sdk')
const log = require('../log')(__filename)

module.exports = class DynamoDbAdapter {
  constructor() {
    this.documentClient = new AWS.DynamoDB.DocumentClient({
      region: process.env.region
    })
    this.client = new AWS.DynamoDB({
      region: process.env.region
    })
  }

  async queryByField(field, value) {
    const params = {
      TableName: process.env.tableName,
      KeyConditionExpression: '#field = :value',
      ExpressionAttributeNames: {
        '#field': field
      },
      ExpressionAttributeValues: {
        ':value': value
      }
    }
    return this.documentClient.query(params).promise()
  }

  async query(params) {
    return this.document.query(params).promise()
  }

  async get(params) {
    return this.client.getItem(params).promise()
  }

  async create(params) {
    return this.client.putItem(params).promise()
  }

  async delete(params) {
    log(`Deleting item with PK = ${params.Key.PK.S} & SK = ${params.Key.SK.S}`)
    return this.client.deleteItem(params).promise()
  }

  async update(params) {
    return this.client.updateItem(params).promise()
  }
}
