const AWS = require('aws-sdk')
const axios = require('axios')
const aws4 = require('aws4');
const url = require('url');


const post = async (endpointUrl, body) => {
  // generic request for both aws4 & axios
  const request = {
    host: url.parse(endpointUrl).hostname,
    method: 'POST',
    url: endpointUrl,
    path: url.parse(endpointUrl).path,
    data: body, // axios expects data
    body: JSON.stringify(body), // aws4 expects body 
    headers: {
      'content-type': 'application/json'
    }
  }
  
  const signedRequest = aws4.sign(request,
    {
      // assumes user has authenticated and we have called
      // AWS.config.credentials.get to retrieve keys and
      // session tokens
      secretAccessKey: AWS.config.credentials.secretAccessKey,
      accessKeyId: AWS.config.credentials.accessKeyId,
      sessionToken: AWS.config.credentials.sessionToken
    })
  
  // those need to be removed
  delete signedRequest.headers['Host']
  delete signedRequest.headers['Content-Length']
  try {
    let response = await axios(signedRequest)
    return response
  } catch (error) {
    console.log(error.message);
    console.log(error);
  }
}

module.exports = {
  post
}