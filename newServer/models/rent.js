"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rent.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Rent.init(
    {
      tanggal: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Tanggal Cannot be empty",
          },
        },
      },
      jam: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Jam Cannot be empty",
          },
        },
      },
      tarif: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Tarif Cannot be empty",
          },
        },
      },
      status_sewa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Status Cannot be empty",
          },
        },
      },
      customerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Rent",
    }
  );
  return Rent;
};
