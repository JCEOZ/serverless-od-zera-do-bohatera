/* eslint-disable radix */
module.exports = class BillingItem {
  constructor({
    // eslint-disable-next-line max-len
    name, cost = 0, createdAt = new Date()
  }) {
    if (!name) {
      throw new Error('Billing Item name is required')
    }
    this.name = name
    this.cost = cost
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt)
    this.modifiedAt = new Date()
  }

  static fromItem(attributes) {
    return new BillingItem({
      name: attributes.Name.S,
      cost: parseFloat(attributes.Cost.N),
      createdAt: attributes.CreatedAt && attributes.CreatedAt.S,
      modifiedAt: attributes.ModifiedAt && attributes.ModifiedAt.S
    })
  }

  key() {
    return {
      PK: { S: `BILLING_ITEM#${this.name}` },
      SK: { S: `BILLING_ITEM#${this.name}` }
    }
  }

  toItem() {
    return {
      ...this.key(),
      Type: { S: 'BillingItem' },
      Name: { S: this.name },
      Cost: { N: this.cost.toString() },
      CreatedAt: { S: this.createdAt.toISOString() },
      ModifiedAt: { S: this.modifiedAt.toISOString() },
    }
  }
}
