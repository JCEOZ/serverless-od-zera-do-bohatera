// TODO add check if __filename has been passed
const isTest = process.env.NODE_ENV === 'test' && process.env.DEBUG !== 'ON'
module.exports = (file) => (...args) => {
  if (!isTest) {
    console.log(`[${file.split('/').slice(-1)[0]}]`, ...args)
  }
}
