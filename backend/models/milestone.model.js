module.exports = (sequelize, DATATYPE) => {
  const Milestone = sequelize.define("milestones", {
    milestone_id: {
      type: DATATYPE.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DATATYPE.STRING,
      allowNull: false,
    },
    date: {
      type: DATATYPE.DATE,
      allowNull: false,
    },
    description: {
      type: DATATYPE.STRING,
    },
  });

  return Milestone;
};
