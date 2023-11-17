module.exports = (sequelize, DATATYPE) => {
  const Child = sequelize.define("children", {
    child_id: {
      type: DATATYPE.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DATATYPE.STRING,
      allowNull: false,
    },
    image: {
      type: DATATYPE.TEXT("long"),
      allowNull: true,
    },
  });

  return Child;
};
