// const AWS = require('aws-sdk')
const axios = require('axios')


const post = async (endpointUrl, body, config) => {
  console.log('Axios post to ', endpointUrl)
  console.log(JSON.stringify(body))
  return axios.post(endpointUrl, body, config)
    .then((response) => {
      console.info(`Message posted successfully: ${JSON.stringify(response)}`);
    })
    .catch((error) => {
      console.info(`Error posting message to Slack API: ${JSON.stringify(error)}`);
    });
}

module.exports = {
  post
}
