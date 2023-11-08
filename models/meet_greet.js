'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meet_Greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Event }) {
       Meet_Greet.belongsTo(Band, {
        foreignKey : "band_id",
        as: "band"
       }),
       Meet_Greet.belongsTo(Event, {
        foreignKey : "event_id",
        as: "event"
       })

    }
  }
  Meet_Greet.init({
    meet_greet_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    event_id: DataTypes.INTEGER,
    band_id: DataTypes.INTEGER,
    meet_start_time: DataTypes.DATE,
    meet_end_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Meet_Greet',
  });
  return Meet_Greet;
};