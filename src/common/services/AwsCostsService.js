const log = require('../log')(__filename)

module.exports = class AwsCostsService {
  constructor(athenaAdapter, getRemainingTimeInMillis) {
    this.athenaAdapter = athenaAdapter
    this.getRemainingTimeInMillis = getRemainingTimeInMillis
  }

  async getTopTenMostExpensiveAwsServices() {
    log('Getting Top 10 Most Expensive Aws Services from Athena Data Lake')
    const { athenaDatabase, athenaTable } = process.env
    const sqlQuery = `
    SELECT line_item_product_code,
      round(sum(line_item_blended_cost),2) AS cost
    FROM ${athenaDatabase}.${athenaTable}
      WHERE line_item_line_item_type = 'Usage' and "month" = '11'
      GROUP BY line_item_product_code
      HAVING sum(line_item_blended_cost) > 0
      ORDER BY cost desc
      limit 10;
    `
    const res = await this.athenaAdapter.query(sqlQuery, this.getRemainingTimeInMillis)
    log('Got results from Athena')
    return parseRawAthenaData(res.Rows)
  }
}

const parseRawAthenaData = (rows) => {
  rows.shift()
  return rows.map(({ Data }) => ({
    awsService: Data[0].VarCharValue,
    cost: parseFloat(Data[1].VarCharValue)
  }))
}
