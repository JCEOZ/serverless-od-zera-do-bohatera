const DynamoDB = require('aws-sdk/clients/dynamodb')
const { v4: uuidv4 } = require('uuid');

const TableName = 'tydzien07'

const getAll = async () => {
  const params = {
    TableName
  }
  const dbClient = new DynamoDB()
  const results = await dbClient.scan(params).promise()
  return results.Items.map(convert)
}

const getById = async (id) => {
  const params = {
    TableName,
    Key: {
      id: {
        S: id
      }
    }
  }
  const dbClient = new DynamoDB()
  const results = await dbClient.getItem(params).promise()
  return convert(results.Item)
}

const create = async (body) => {
  const params = {
    TableName,
    Item: {
      id: {
        S: uuidv4()
      },
      name: {
        S: body.name
      },
      description: {
        S: body.description
      }
    }
  }
  const dbClient = new DynamoDB()
  const results = await dbClient.putItem(params).promise()
  return results
}

const update = async (id, body) => {
  const params = {
    TableName,
    Key: { id },
    UpdateExpression: 'set #name = :n, #desc = :d',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#desc': 'description'
    },
    ExpressionAttributeValues: {
      ':n': body.name,
      ':d': body.description
    }
  }
  const docClient = new DynamoDB.DocumentClient()
  await docClient.update(params).promise()
  return 'update completed'
}

const remove = async (id) => {
  const params = {
    TableName,
    Key: {
      id: {
        S: id
      }
    }
  }
  const dbClient = new DynamoDB()
  await dbClient.deleteItem(params).promise()
  return 'delete completed'
}

const convert = (item) => ({
  id: item.id && item.id.S,
  name: item.name && item.name.S,
  description: item.description && item.description.S
})

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}
