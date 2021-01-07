const DynamoDB = require('aws-sdk/clients/dynamodb')

const TableName = 'tydzien07'

const getAll = async () => {
  const params = {
    TableName
  }
  const dbClient = new DynamoDB()
  const results = await dbClient.scan(params).promise()
  return results.Items
}

const getById = async (id) => {}

const create = async (body) => {}

const update = async (id, body) => {}

const remove = async (id) => {}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}
