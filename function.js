const axios = require('axios');

module.exports.handler = async event => {
  const { characterId } = event
  console.log(characterId)
  const url = 'https://swapi.dev/api/people/' + characterId
  console.log(url)
  const result = await axios.get(url)
  console.log(result.data)
  return result.data
};
