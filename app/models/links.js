module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define("Link", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    ip_address: {
        type: DataTypes.STRING,
    },
    path : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "links",
  }
);
  return Link;
};