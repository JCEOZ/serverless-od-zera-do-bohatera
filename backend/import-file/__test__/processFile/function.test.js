/**
 * @jest-environment node
 */

const rewire = require('rewire');

const lambdaRewired = rewire('../../src/processFile/function')

describe('Process File', async () => {
    it('should process business logic', () => {
         
       // GIVEN
       const businessLogic = lambdaRewired.__get__('businessLogic')

       // WHEN

       //THEN
       expect(businessLogic).toBeTruthy()
    });
});