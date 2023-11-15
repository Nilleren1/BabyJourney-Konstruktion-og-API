module.exports = (app) => {
  const child = require("../controllers/child.controller.js");
  const milestone = require("../controllers/milestone.controller.js");
  var router = require("express").Router();

  // Child URI

  // Create a new child
  router.post("/child", child.create);

  // Retrieve a single child with id
  router.get("/child/:id", child.findOne);

  // Update a child with id
  router.put("/child/:id", child.update);

  // Delete a child with id
  router.delete("/child/:id", child.delete);

  // Milestone URI

  // Create a new milestone
  router.post("/milestone", milestone.create);

  //Retrieve a all milestone
  router.get("/milestone", milestone.findAll);

  // Retrieve a single milestone with id
  router.get("/milestone/:id", milestone.findOne);

  // Update a milestone with id
  router.put("/milestone/:id", milestone.update);

  // Delete a milestone with id
  router.delete("/milestone/:id", milestone.delete);

  app.use("/api", router);
};