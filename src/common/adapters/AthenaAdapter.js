/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
const Athena = require('aws-sdk/clients/athena')
const log = require('../log')(__filename)

module.exports = class AthenaAdapter {
  constructor() {
    this.athena = new Athena({
      region: process.env.region
    })
  }

  async query(sqlQuery, getRemainingTimeInMillis) {
    const queryId = await this._startQueryExecution(sqlQuery)
    const status = await this._waitForResponse(queryId, getRemainingTimeInMillis)
    if (status === 'SUCCEEDED') {
      return this._getQueryResults(queryId)
    }
    return status
  }

  async _startQueryExecution(sqlQuery) {
    const { athenaDatabase, athenaOutputLocation } = process.env
    const params = {
      QueryString: sqlQuery,
      QueryExecutionContext: {
        Database: athenaDatabase
      },
      ResultConfiguration: {
        OutputLocation: athenaOutputLocation
      }
    }
    const queryId = await this.athena.startQueryExecution(params).promise()

    log('queryId', queryId)
    return queryId
  }

  async _waitForResponse(queryId, getRemainingTimeInMillis) {
    let lastResponse = 'RUNNING'
    let response
    const sleep = (seconds) => new Promise((resolve) => { setTimeout(resolve, seconds * 1000) })

    while (lastResponse === 'RUNNING' && getRemainingTimeInMillis() > 1300) {
      log(`Lambda execution Remaining Time In Millis ${getRemainingTimeInMillis()}. Waiting 1 second.`);
      await sleep(1)
      response = await this.athena.getQueryExecution(queryId).promise()
      lastResponse = response.QueryExecution.Status.State
    }
    log(`Athena query execution State: ${lastResponse}`)

    if (lastResponse !== 'SUCCEEDED') {
      return {
        State: lastResponse,
        Reason: response.QueryExecution.Status.StateChangeReason
      }
    }

    return lastResponse
  }

  async _getQueryResults(queryId) {
    const results = await this.athena.getQueryResults(queryId).promise()
    return results.ResultSet
  }
}
