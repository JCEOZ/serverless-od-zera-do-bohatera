const persistance = require('./persistance')
const adapter = require('./dbAdapterRds')

module.exports.getAll = async () => {
  console.log('getAll');

  const results = await persistance.getAll(adapter)

  return returnOnSuccess({
    functionName: 'getAll',
    results
  })
}

module.exports.create = async (event) => {
  console.log('create');

  const body = JSON.parse(event.body)
  console.log(body);

  const results = await persistance.create(adapter, body)

  return returnOnSuccess({
    functionName: 'create',
    results
  })
}

module.exports.getById = async (event) => {
  console.log('getById');

  const itemId = event.pathParameters.id
  console.log(`itemId=${itemId}`);

  const results = await persistance.getById(adapter, itemId)

  return returnOnSuccess({
    functionName: 'getById',
    results
  })
}

module.exports.update = async (event) => {
  console.log('update');

  const itemId = event.pathParameters.id
  const body = JSON.parse(event.body)
  console.log(`itemId=${itemId}`)

  const results = await persistance.update(adapter, itemId, body)

  return returnOnSuccess({
    functionName: 'update',
    results
  })
}

module.exports.delete = async (event) => {
  console.log('delete');

  const itemId = event.pathParameters.id
  console.log(`itemId=${itemId}`);

  const results = await persistance.remove(adapter, itemId)

  return returnOnSuccess({
    functionName: 'delete',
    results
  })
}

const returnOnSuccess = (body) => ({
  statusCode: 200,
  body: JSON.stringify(body)
})
