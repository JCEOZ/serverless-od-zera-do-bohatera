module.exports.handler = async event => {
  const queryStringParameters = event.queryStringParameters

  console.log('Function hello', queryStringParameters)
  let name = 'World'

  if (queryStringParameters && queryStringParameters.name) {
    name = queryStringParameters.name
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hello ${name}`
      }
    )
  }
};
