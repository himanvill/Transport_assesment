module.exports = (app) => {
  const user = require("../controller/user.controller");
  let router = require("express").Router();
  router.post("/login", user.login);
  router.post("/registerUser", user.register);
  router.get("/revenue", user.revenue)
  app.use("/",router)
};
