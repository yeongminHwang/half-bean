const db = require("../models");

module.exports = {
  async createUser(userInput) {
    try {
      const { dataValues: user } = await db.User.create({ ...userInput });
      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  async readUser() {},
  async updateUser() {},
  async deleteUser() {},
};
