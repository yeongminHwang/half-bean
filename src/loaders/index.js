const express_loader = require("./express_connection");
const db_loader = require("./db_connection");

module.exports = async (app) => {
  try {
    await db_loader(app);
    await express_loader(app);
  } catch (e) {
    console.log("Loader Error");
    console.log(e);
  }
  return app;
};
