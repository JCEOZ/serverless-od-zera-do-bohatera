module.exports.getAll = async event => {
  console.log('getAll');

  return {
    statusCode: 200,
    body: JSON.stringify(event)
  };
}

module.exports.create = async event => {
  console.log('create');

  return {
    statusCode: 200,
    body: JSON.stringify(event)
  };
}