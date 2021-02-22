/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/**
 * @jest-environment node
 */

const rewire = require('rewire')
const AthenaAdapter = require('../../../src/common/adapters/AthenaAdapter')
const AwsCostsService = require('../../../src/common/services/AwsCostsService')

jest.mock('../../../src/common/adapters/AthenaAdapter');

describe('Aws Costs Service Unit Test', () => {
  it('just parser - ReWire Example', () => {
    // GIVEN
    const service = rewire('../../../src/common/services/AwsCostsService')
    const parseRawAthenaData = service.__get__('parseRawAthenaData')
    const data = [...ROWS]

    // WHEN
    const actual = parseRawAthenaData(data)

    // THEN
    expect(actual).toBeTruthy()
    expect(actual[0].awsService).toBe('AmazonRDS')
    expect(actual[0].cost).toBeGreaterThan(10)
  })

  it('whole method - Self written Mock Example', async () => {
    // GIVEN
    const getRemainingTimeInMillis = () => 29000
    const adapter = new AthenaAdapterMock()
    const service = new AwsCostsService(adapter, getRemainingTimeInMillis)

    // WHEN
    const actual = await service.getTopTenMostExpensiveAwsServices()

    // THEN
    expect(actual).toBeTruthy()
    expect(actual[0].awsService).toBe('AmazonRDS')
    expect(actual[0].cost).toBeGreaterThan(10)
  })

  it('whole method - Jest Mock Example', async () => {
    // GIVEN
    const getRemainingTimeInMillis = () => 29000

    AthenaAdapter.mockImplementation(() => ({
      // eslint-disable-next-line no-unused-vars
      query: (sqlQuery, ctxRemainingTime) => ({ Rows: [...ROWS] })
    }))
    const adapter = new AthenaAdapter()
    const service = new AwsCostsService(adapter, getRemainingTimeInMillis)

    // WHEN
    const actual = await service.getTopTenMostExpensiveAwsServices()

    // THEN
    expect(actual).toBeTruthy()
    expect(actual[0].awsService).toBe('AmazonRDS')
    expect(actual[0].cost).toBeGreaterThan(10)
  })
})

const ROWS = [
  {
    Data: [
      {
        VarCharValue: 'line_item_product_code'
      },
      {
        VarCharValue: 'cost'
      }
    ]
  },
  {
    Data: [
      {
        VarCharValue: 'AmazonRDS'
      },
      {
        VarCharValue: '14.02'
      }
    ]
  }
]

class AthenaAdapterMock {
  // eslint-disable-next-line no-unused-vars
  async query(sqlQuery, getRemainingTimeInMillis) {
    return {
      Rows: [...ROWS],
      ResultSetMetadata: {
        ColumnInfo: [
          {
            CatalogName: 'hive',
            SchemaName: '',
            TableName: '',
            Name: 'line_item_product_code',
            Label: 'line_item_product_code',
            Type: 'varchar',
            Precision: 2147483647,
            Scale: 0,
            Nullable: 'UNKNOWN',
            CaseSensitive: true
          },
          {
            CatalogName: 'hive',
            SchemaName: '',
            TableName: '',
            Name: 'cost',
            Label: 'cost',
            Type: 'double',
            Precision: 17,
            Scale: 0,
            Nullable: 'UNKNOWN',
            CaseSensitive: false
          }
        ]
      }
    }
  }
}
