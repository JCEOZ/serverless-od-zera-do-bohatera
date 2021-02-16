const httpAdapter = require('./httpAdapterAxios')

module.exports.handler = async (event) => {
    const message = parseEvent(event)

    const endpointUrl = `${process.env.productsApiUrl}/products`
    await businessLogic(message, httpAdapter, endpointUrl)
    return true
}

const businessLogic = async (product, httpAdapter, endpointUrl) => httpAdapter.post(endpointUrl, product)

const parseEvent = (event) => {
    console.log(JSON.stringify(event))
    return JSON.parse(event.Records[0].body)
}