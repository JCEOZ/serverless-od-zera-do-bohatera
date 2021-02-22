// jest.config.js
// const { defaults } = require('jest-config');
const { config } = require('dotenv');
const { resolve } = require('path');

module.exports = {
  roots: ['../__tests__/'],
  testMatch: ['**/*.(int|integration).js']
}

// Load environment variables generated from serverless.yml
config({
  path: resolve(__dirname, '../.env'),
  bail: 1
})
