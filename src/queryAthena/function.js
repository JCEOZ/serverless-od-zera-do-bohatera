const log = require('../common/log')(__filename)

module.exports.handler = async () => {
  log('query Athena Lambda function starts')
  return true
}
