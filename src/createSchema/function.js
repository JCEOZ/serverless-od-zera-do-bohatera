const AWS = require('aws-sdk')
const mysql = require('promise-mysql')

module.exports.handler = async () => {
  const secretsManager = new AWS.SecretsManager()
  const secretName = process.env.SECRET_NAME
  let result

  try {
    const secretValue = await getSecret(secretsManager, secretName)
    // eslint-disable-next-line object-curly-newline
    const { host, port, dbname, username, password } = JSON.parse(secretValue.SecretString)
    const connection = await mysql.createConnection({
      host,
      port,
      database: dbname,
      user: username,
      password
    })

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Products (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        description VARCHAR(120) NOT NULL
      );
    `)

    await connection.query(`
      INSERT INTO Products (name, description)
      VALUES ('Klawiatura', 'Do pisania maili i programowania');
    `)

    result = await connection.query('SELECT * FROM Products;')
    connection.end()
  } catch (error) {
    console.log(error);
    return error
  }

  return result
}

// eslint-disable-next-line max-len
const getSecret = async (client, secretName) => client.getSecretValue({ SecretId: secretName }).promise()
