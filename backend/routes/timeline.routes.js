module.exports = (app) => {
  const child = require("../controllers/child.controller.js");
  const milestone = require("../controllers/milestone.controller.js");
  var router = require("express").Router();

  // Child profile URI

  // Create a new Child profile
  router.post("/child", child.create);

  // Retrieve all Child profile
  router.get("/child", child.findAll);

  // Retrieve a single Child profile with id
  router.get("/child/:id", child.findOne);

  // Update a Child profile with id
  router.put("/child/:id", child.update);

  // Delete a Child profile with id
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
