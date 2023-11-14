module.exports = (app) => {
    const milestone = require("../controllers/milestone.controller.js");
    var router = require("express").Router();
  
    // Create a new child
    router.post("/", milestone.create);
  
    // Retrieve a single child with id
    router.get("/:id", milestone.findOne);
  
    // Update a child with id
    router.put("/:id", milestone.update);
  
    // Delete a child with id
    router.delete("/:id", milestone.delete);
  
    app.use("/api/milestone", router);
    
  };