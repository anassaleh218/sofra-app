const { DataTypes } = require("sequelize");
const db = require("../config/db");

// const { Cart } = require("./CartModelDB")

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: "Email must be unique"
    },
    validate: {
      isEmail: {
        args: true,
        msg: "Invalid email format"
      },
      notEmpty: {
        args: true,
        msg: 'Cannot be blank'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    minlength: 5,
  }
});

module.exports = { User };
