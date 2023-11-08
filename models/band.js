'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Meet_Greet, Set_Time }) {
      // define association here
      Band.hasMany(Meet_Greet, {
        foreignKey: "band_id",
        as: "meet_greets"
      }),
      Band.hasMany(Set_Time,{
        foreignKey: "band_id",
        as:"set_times"
      })
    }
  }
  Band.init({
    band_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    genre: DataTypes.TEXT,
    available_start_time: DataTypes.DATE,
    end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Band',
  });
  return Band;
};