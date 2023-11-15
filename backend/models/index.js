require("dotenv").config({ path: `.env.local`, override: true });
const Sequelize = require("sequelize");
const sequelize = new Sequelize("babyJourneyDB", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  password: process.env.SECRET,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.child = require("./child.model.js")(sequelize, Sequelize);
db.milestone = require("./milestone.model.js")(sequelize, Sequelize);

db.child.hasMany(db.milestone, {
  foreignKey: "child_id",
  as: "milestone",
  onDelete: "cascade",
});
db.milestone.belongsTo(db.child, {
  foreignKey: "child_id",
  as: "children",
});

module.exports = db;
