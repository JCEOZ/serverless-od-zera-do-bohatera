/**
 * @jest-environment node
 */

const rewire = require('rewire');
const fs = require('fs')

const lambdaRewired = rewire('../../src/processFile/function')

describe('Process File', () => {
    it('should process business logic', async () => {

        // GIVEN
        const businessLogic = lambdaRewired.__get__('businessLogic')
        const fileInfo = {
            bucketName: "bucket",
            fileName: "file.csv"
        }

        const file = loadLocalFile('../__resources/products.csv')

        const getFileMock = (fileInfo) => {
            const { bucketName, fileName } = fileInfo
            expect(bucketName).toBe('bucket')
            expect(fileName).toBe('file.csv')
            return file
        }

        // WHEN
        const actual = await businessLogic(fileInfo, getFileMock)

        //THEN
        expect(businessLogic).toBeTruthy()
    });
});

const loadLocalFile = (path) => fs.readFileSync(`${__dirname}/${path}`).toString().trim()