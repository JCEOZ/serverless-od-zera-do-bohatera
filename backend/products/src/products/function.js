const persistance = require('../common/persistence')
const dbAdapter = require('../common/dbAdapterDynamoDb')
const { returnOnSuccess, returnOnSuccessCollection, returnOnFailure } = require('../common/resultsWrapper')
const { createProductValidator } = require('../../src/products/inputValidators')

const getAllProducts = async () => {
  const data = await persistance.getAll(dbAdapter)
  return returnOnSuccessCollection(data)
}

const createProduct = async (event) => {
  const body = JSON.parse(event.body)
  
  const validationResult = createProductValidator(body)
  if (validationResult.error) {
    const msg = validationResult.error.details[0].message
    return returnOnFailure(msg)
  }
  
  const results = await persistance.create(dbAdapter, body)

  return returnOnSuccess({
    message: 'Item created',
    results
  })
}

const getProductById = async (event) => {
  const itemId = event.pathParameters.id
  console.log(`itemId=${itemId}`);
  const results = await persistance.getById(dbAdapter, itemId)

  return returnOnSuccess(results.Item)
}

const updateProduct = async (event) => {
  const body = JSON.parse(event.body)
  const itemId = event.pathParameters.id
  console.log(`itemId=${itemId}`);

  const results = await persistance.update(dbAdapter, itemId, body)

  return returnOnSuccess({
    message: 'Item updated',
    results
  })
}

const deleteProduct = async (event) => {
  const itemId = event.pathParameters.id
  const result = await persistance.remove(dbAdapter, itemId)
  return returnOnSuccess(result)
}

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
}
