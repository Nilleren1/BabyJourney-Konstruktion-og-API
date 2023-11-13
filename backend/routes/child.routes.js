module.exports = (app) => {
  const child = require("../controllers/child.controller.js");
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", child.create);

  // Retrieve a single Tutorial with id
  router.get("/:id", child.findOne);

  // Update a Tutorial with id
  router.put("/:id", child.update);

  // Delete a Tutorial with id
  router.delete("/:id", child.delete);

  app.use("/api/child", router);
};
