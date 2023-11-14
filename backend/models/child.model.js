module.exports = (sequelize, DATATYPE) => {
  const Child = sequelize.define("children", {
    id: {
      type: DATATYPE.INTEGER,
      field: "child_id",
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DATATYPE.STRING,
      allowNull: false,
    },
  });

  return Child;
};
