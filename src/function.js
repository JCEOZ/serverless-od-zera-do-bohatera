module.exports.getAll = async (event) => {
  console.log('getAll');

  return returnOnSuccess({
    functionName: 'getAll',
    event
  })
}

module.exports.create = async (event) => {
  console.log('create');

  const body = JSON.parse(event.body)
  console.log(body);

  return returnOnSuccess({
    functionName: 'create',
    body,
    event
  })
}

module.exports.getById = async (event) => {
  console.log('getById');

  const itemId = event.pathParameters.id
  console.log(`itemId=${itemId}`);

  return returnOnSuccess({
    functionName: 'getById',
    itemId,
    event
  })
}

module.exports.update = async (event) => {
  console.log('update');

  const itemId = event.pathParameters.id
  const body = JSON.parse(event.body)
  console.log(`itemId=${itemId}`)

  return returnOnSuccess({
    functionName: 'update',
    itemId,
    body,
    event
  })
}

module.exports.delete = async (event) => {
  console.log('delete');

  const itemId = event.pathParameters.id
  console.log(`itemId=${itemId}`);

  return returnOnSuccess({
    functionName: 'delete',
    itemId,
    event
  })
}

const returnOnSuccess = (body) => ({
  statusCode: 200,
  body: JSON.stringify(body)
})
