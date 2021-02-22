const { createProductValidator } = require('../../src/products/inputValidators')

describe('Input Validators', () => {
  it('should validate create product and pass with correct input', () => {
    // GIVEN
    const product = {
      name: "Maska głowy konia",
      imageUrl: "https://szkolenie-serverless-obrazki.s3.eu-central-1.amazonaws.com/kon.jpg",
      category: "Przedmiot",
      description: "W sam raz na imprezę"
    }
    // WHEN
    const actual = createProductValidator(product)
    // THEN
    expect(actual).not.toHaveProperty('error')
  });

  it('should validate create product and fail with incorrect input', () => {
    // GIVEN
    const product = {
      name: "",
      imageUrl: "https://szkolenie-serverless-obrazki.s3.eu-central-1.amazonaws.com/kon.jpg",
      category: "Przedmiot",
      description: "W sam raz na imprezę"
    }
    // WHEN
    const actual = createProductValidator(product)
    // THEN
    expect(actual).toHaveProperty('error')
    expect(actual.error.details[0].message).toBe("\"name\" is not allowed to be empty")
  });
});