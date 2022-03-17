const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

const { User } = require("../../database/models");

module.exports = {
  Mutation: {
    async register(root, args, context) {
        const userExist = await User.findOne({ where: { email: args.input.email } })
        if (userExist) {
          throw new Error("Email alrady exists!");
        }
      const { name, email, password } = args.input;
      return User.create({ name, email, password,status: "Accepted" })
      
    },

    async login(root, { input }, context) {
      const { email, password } = input;
      const user = await User.findOne({ where: { email } });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return { ...user.toJSON(), token };
      }
      throw new AuthenticationError("Invalid credentials");
    },
  },
};