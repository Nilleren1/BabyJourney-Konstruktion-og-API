const db = require("../models");
const Milestone = db.milestone;
const Child = db.child;
const Op = db.Sequelize.Op;

// Create and save new tutorial
exports.create = (req, res) => {
    //Validering
    if (!req.body.title) {
        res.status(400).send({
            message: "Du skal navngive din milestone!"
        });
        return;
    }
    if (!req.body.date) {
        res.status(400).send({
            message: "Du skal vælge dato!"
        });
    }

    //Create a Milestone
    const milestone = {
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        child_id: req.body.child_id
    };

    //Save Milestone in db
    Milestone.create(milestone)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Desværre, du kunne ikke oprette milestone..."
            });
        });
};
// Retrieve all Milestone from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Milestone.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
// Find a single Milestone with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Milestone.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });

};
// Update a Milestone by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Milestone.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Milestone was updated", id: id, payload: req.body
                });
            } else {
                res.send({
                    message: 'Could not update the milestone with the id= ' + id + " Might not have been found"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err + "Error updating Milestone with id=" + id
            });
        });
};
// Delete a Milestone with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Milestone.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Milestone was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Milestone with id=${id}. Maybe the milestone was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Milestone with id=" + id
            });
        });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => { };
// Find all published Tutorials
exports.findAllPublished = (req, res) => { };