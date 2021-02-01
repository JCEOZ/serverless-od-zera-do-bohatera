const AWS = require('aws-sdk')
const mysql = require('promise-mysql')

const secretsManager = new AWS.SecretsManager()
const secretName = process.env.SECRET_NAME

let CONNECTION

const getAll = async () => {
  try {
    const result = await (await getConnection()).query('SELECT * FROM Products;')
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getById = async (id) => { 
  try {
    const result = await (await getConnection()).query(`SELECT * FROM Products WHERE id=${id};`) // FIXME sql injection
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}

const create = async (body) => {
  try {
    const result = await (await getConnection()).query(`INSERT INTO Products (name, description) VALUES ('${body.name}', '${body.description}');`)
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}

const update = async (id, body) => {
  try {
    const result = await (await getConnection()).query(`UPDATE Products SET name = '${body.name}', description = '${body.description}' WHERE id = ${id};`)
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}

const remove = async (id) => {
  try {
    const result = await (await getConnection()).query(`DELETE FROM Products WHERE id = ${id};`)
    return result
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getConnection = async () => {
  if (CONNECTION) {
    console.log('Connection already established')
    return CONNECTION
  }

  const secretValue = await getSecret(secretsManager, secretName)
  console.log(secretValue);
  const { host, port, dbname, username, password } = JSON.parse(secretValue.SecretString)
  CONNECTION = await mysql.createConnection({
    host,
    port,
    database: dbname,
    user: username,
    password
  })
  console.log(CONNECTION)
  return CONNECTION
}

// eslint-disable-next-line max-len
const getSecret = async (client, secretName) => client.getSecretValue({ SecretId: secretName }).promise()

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}