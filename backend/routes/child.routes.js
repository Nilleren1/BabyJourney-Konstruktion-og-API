module.exports = (app) => {
  const child = require("../controllers/child.controller.js");
  var router = require("express").Router();

  // Create a new child
  router.post("/", child.create);

  // Retrieve a single child with id
  router.get("/:id", child.findOne);

  // Update a child with id
  router.put("/:id", child.update);

  // Delete a child with id
  router.delete("/:id", child.delete);

  app.use("/api/child", router);
  
};
