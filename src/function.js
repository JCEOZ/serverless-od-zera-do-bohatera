module.exports.getAll = async event => {
  console.log('getAll');

  return {
    statusCode: 200,
    body: JSON.stringify(event)
  };
}

module.exports.create = async event => {
  console.log('create');

  const body = JSON.parse(event.body)
  console.log(body);

  return {
    statusCode: 200,
    body: JSON.stringify(event)
  };
}