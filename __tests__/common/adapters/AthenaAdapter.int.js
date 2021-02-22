/**
 * @jest-environment node
 */

const AthenaAdapter = require('../../../src/common/adapters/AthenaAdapter')

const timeout = 80000

describe('Athena Adapter', () => {
  it('should execute SQL query', async () => {
    // GIVEN
    const sqlQuery = 'select (1 + 1) as test'

    const getRemainingTimeInMillis = () => 29000
    const athenaAdapter = new AthenaAdapter()

    // WHEN
    const results = await athenaAdapter.query(sqlQuery, getRemainingTimeInMillis)

    // THEN
    expect(results).toBeTruthy()
    expect(results.Rows.length).toBeGreaterThan(0)
    expect(results.Rows[0].Data[0].VarCharValue).toBe('test')
    expect(results.Rows[1].Data[0].VarCharValue).toBe('2')
  }, timeout)
})
