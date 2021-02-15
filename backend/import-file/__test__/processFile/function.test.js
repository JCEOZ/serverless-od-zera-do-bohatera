/**
 * @jest-environment node
 */

const rewire = require('rewire');

const lambdaRewired = rewire('../../src/processFile/function')

describe('Process File', () => {
    it('should process business logic', async () => {
         
       // GIVEN
       const businessLogic = lambdaRewired.__get__('businessLogic')
       const fileInfo = {
           bucketName: "bucket",
           fileName: "file.csv"
       }

       const getFileMock = (fileInfo) => {
           const { bucketName, fileName } = fileInfo
            expect(bucketName).toBe('bucket')
            expect(fileName).toBe('file.csv')
       }

       // WHEN
       const actual = await businessLogic(fileInfo, getFile)

       //THEN
       expect(businessLogic).toBeTruthy()
    });
});