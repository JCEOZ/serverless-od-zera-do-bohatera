const { Model } = require('dynamodb-toolbox')

const UrlModel = new Model('UrlModel', {
// Specify table name
  table: process.env.tableName || 'local-testing',

  // Define partition and sort keys
  partitionKey: 'url',
  timestamps: false,
  model: false,
  // Define schema
  schema: {
    url: { type: 'string' }
  }
})

module.exports = {
  UrlModel
}
