module.exports.handler = async event => {
  const queryStringParameters = event.queryStringParameters

  console.log('queryStringParameters', queryStringParameters)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        params: queryStringParameters,
      }
    )
  }
};
