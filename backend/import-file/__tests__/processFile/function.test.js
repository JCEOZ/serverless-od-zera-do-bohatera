/**
 * @jest-environment node
 */

const fs = require('fs')
const rewire = require('rewire');

const lambdaRewired = rewire('../../src/processFile/function')

describe('Process File', () => {
  it('should process business logic', async () => {

    // GIVEN
    const busiessLogic = lambdaRewired.__get__('businessLogic')
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

    const postToQueue = (msg) => {
      const {name, category, description, imageUrl} = msg
      expect(name).toBeTruthy()
      expect(category).toBe('Przedmiot')
      expect(description).toBe('Można się okopać i w ten sposób zabezpieczyć')
      expect(imageUrl).toBe('https://szkolenie-serverless-obrazki.s3.eu-central-1.amazonaws.com/lopata.jpg')
    }
    const postToQueueMock = jest.fn().mockImplementation(postToQueue)

    // WHEN
    const actual = await busiessLogic(fileInfo, getFileMock, postToQueueMock)

    // THEN
    expect(actual).toBeTruthy()
    expect(postToQueueMock).toHaveBeenCalled()
    expect(postToQueueMock).toHaveBeenCalledTimes(10)
  });

});

const loadLocalFile = (path) => fs.readFileSync(`${__dirname}/${path}`).toString().trim()
