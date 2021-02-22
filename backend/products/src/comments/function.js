const persistance = require('../common/persistence')
const dbAdapter = require('../common/dbAdapterDynamoDb')
const { returnOnSuccess, returnOnSuccessCollection } = require('../common/resultsWrapper')

const log = require('../common/log')

const createComment = async (event) => {
  const body = JSON.parse(event.body)
  const itemId = event.pathParameters.id
  
  log.debug(`Produkt itemId=${itemId}`);
  log.debug('Trying to add comment with following values', body)

  try {
    const results = await persistance.createComment(dbAdapter, body, itemId)
    return returnOnSuccess(results)
  } catch (error) {
    log.error('Errorr occured', body, error)
    return returnOnSuccess({ results: false })    
  }
}

const getCommentsByProductId = async (event) => {
  const itemId = event.pathParameters.id
  log.debug(`itemId=${itemId}`);
  const data = await persistance.getCommentsByProductId(dbAdapter, itemId)

  return returnOnSuccessCollection(data)
}

module.exports = {
  createComment,
  getCommentsByProductId
}
