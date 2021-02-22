/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
const AWS = require('aws-sdk');
const log = require('../src/common/log')(__filename)

module.exports = class IntegrationTestHelper {
  constructor(roleName) {
    this.roleName = roleName
    this.iam = new AWS.IAM()
    this.sts = new AWS.STS()
  }

  static async assumeRoleByFullName(roleName) {
    return IntegrationTestHelper.excuteRoleAssume(roleName)
  }

  static async assumeRoleByLambdaName(lambdaName) {
    const { STAGE, region, service } = process.env

    let roleName = `${service}-${STAGE}-${lambdaName}-${region}-lambdaRole`

    if (roleName.length >= 64 - 1) {
      roleName = `${service}-${STAGE}-${lambdaName}-${region}`
    }
    log(`Lambda Role length: ${roleName.length} : ${roleName}`)
    return IntegrationTestHelper.excuteRoleAssume(roleName)
  }

  static async excuteRoleAssume(roleName) {
    const helper = new IntegrationTestHelper(roleName)
    await helper.getRoleTrustPolicy()
    await helper.getCallerIdentity()
    await helper.getCallerCredentials()
    await helper.updateRoleTrustPolicy()
    await helper.assumeLambdaRole()
    return helper
  }

  async refreshCredentials() {
    const oldSessionTokenKey = (await this.sts.getSessionToken().promise()).Credentials.sessionToken

    const credentials = new AWS.Credentials()
    const get = await credentials.getPromise()
    const refresh = await credentials.refreshPromise()
    log('get', get, 'refresh', refresh)

    const newSessionTokenKey = (await this.sts.getSessionToken().promise()).Credentials.sessionToken
    log('new === old: ', newSessionTokenKey === oldSessionTokenKey);
  }

  async getRoleTrustPolicy() {
    const role = await this.iam.getRole({ RoleName: this.roleName }).promise()
    const trustPolicyJson = decodeURIComponent(role.Role.AssumeRolePolicyDocument)
    const trustPolicy = JSON.parse(trustPolicyJson)
    this.trustPolicy = trustPolicy
    // log(JSON.stringify(trustPolicy))
    return trustPolicy
  }

  async getCallerIdentity() {
    const caller = await this.sts.getCallerIdentity({}).promise()
    log(JSON.stringify(caller))
    this.awsAccountId = caller.Account
    this.principal = caller.Arn
    return caller
  }

  async getCallerCredentials() {
    const creds = await this.sts.getSessionToken().promise()
    this.masterCredentials = creds
  }

  async updateRoleTrustPolicy() {
    // log(this.trustPolicy);
    const shouldUpdateRole = !this.trustPolicy.Statement[0].Principal.AWS
    if (shouldUpdateRole) {
      log('Updating Lambda trust relationship policy');
      this.trustPolicy.Statement[0].Principal.AWS = this.principal
      const params = {
        PolicyDocument: JSON.stringify(this.trustPolicy, null, 2),
        RoleName: this.roleName
      }
      await this.iam.updateAssumeRolePolicy(params).promise()
      const sleep = (seconds) => new Promise((resolve) => { setTimeout(resolve, seconds * 1000) })
      log('Waiting 15 seconds so AWS has time to deal with the update');
      await sleep(15) // needed, so AWS figures out trust relationship has been updated
      await this.refreshCredentials()
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _rewriteCredentials(data) {
    return ({
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken
    })
  }

  async assumeLambdaRole() {
    const AWS2 = require('aws-sdk');
    const sts = new AWS2.STS()
    const params = {
      RoleArn: `arn:aws:iam::${this.awsAccountId}:role/${this.roleName}`,
      RoleSessionName: 'testSession'
    }
    const data = await sts.assumeRole(params).promise()

    log(`Assuming AWS Role: ${this.roleName}`);
    const credentials = this._rewriteCredentials(data)
    AWS2.config.update(credentials);
    return AWS2
  }

  async assumeUserRoleBack() {
    const masterAWS = require('aws-sdk');
    masterAWS.config.update(this._rewriteCredentials(this.masterCredentials))
    return masterAWS
  }
}
