const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      pattern: "^[A-Za-z]+( [A-Za-z]+)*$",
      minLength: 5,
      maxLength: 50,
    },
    email: { type: "string", pattern: ".+@.+..+" },
    password: { type: "string", minLength: 5 },
    confirmPassword: { type: "string", minLength: 5 },
    mobile: {
      type: "string",
      pattern: "^(011|012|010|015)[0-9]{8}$" // Ensures the number starts with 011, 012, 010, or 015 and has 11 digits in total
    },
    address: { type: "string", minLength: 5 },
  },
  required: ["name", "email", "password", "confirmPassword", "mobile","address"], // Added 'confirmPassword' to required fields
  additionalProperties: false,
};

const validate = ajv.compile(schema);

module.exports = validate;

