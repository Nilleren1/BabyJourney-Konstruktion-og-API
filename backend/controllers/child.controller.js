const db = require("../models");
const Child = db.child;
const Milestone = db.milestone;
const Op = db.Sequelize.Op;

// Create and save new Child profile
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const child = {
    name: req.body.name,
  };

  Child.create(child).then((data) => {
    res.send(data);
  });
};

// Find all milestone belonging to the Child profile
exports.findAll = (req, res) => {
  Child.findAll({
    include: [
      {
        model: Milestone,
        as: "milestone",
      },
    ],
  }).then((data) => {
    res.send(data);
  });
};

// Find a single Child profile with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Child.findByPk(id, {
    include: [
      {
        model: Milestone,
        as: "milestone",
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err + "Error couldn't retrieve the Child profile with id=" + id,
      });
    });
};

// Update a Child profile by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Child.update(req.body, {
    where: { child_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Child profile was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update the Child profile with id=${id}. Maybe the child profile was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating the child profile with id=" + id,
      });
    });
};
// Delete a Child profile with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Child.destroy({
    where: { child_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Child profile was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete the Child profile with id=${id}. Maybe the Child profile was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete the Child profile with id=" + id,
      });
    });
};
