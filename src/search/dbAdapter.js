const DynamoDB = require('aws-sdk/clients/dynamodb')
const { UrlModel } = require('./UrlModel')

const DocumentClient = new DynamoDB.DocumentClient()

const write = async (url) => {
  console.log('Trying to write an item to the DynamoDB table...', url)
  const params = UrlModel.put(url)
  return DocumentClient.put(params).promise()
}

const getAll = async () => {
  const params = {
    TableName: process.env.tableName,
  }
  const results = await DocumentClient.scan(params).promise()
  return results.Items
}

module.exports = {
  write,
  getAll
}
