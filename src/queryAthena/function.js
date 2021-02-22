/* eslint-disable max-len */
const log = require('../common/log')(__filename)
const AwsCostsService = require('../common/services/AwsCostsService')
const BillingItemService = require('../common/services/BillingItemService')

module.exports.handler = async (event, context) => {
  log('Fetch data from Athena')
  const costService = new AwsCostsService(context.getRemainingTimeInMillis)
  const costs = await costService.getTopTenMostExpensiveAwsServices()

  log('Store in database')
  const billingService = new BillingItemService()

  const promises = costs.map((each) => {
    const payload = {
      name: each.awsService,
      cost: each.cost
    }
    return billingService.createBillingItem(payload)
  })
  await Promise.all(promises)
  return costs
}
