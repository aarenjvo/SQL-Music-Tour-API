'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SetTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SetTime.init({
    event_id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    stage_id: {
      type: DataTypes.SMALLINT,
    },
    band_id: {
      type:DataTypes.SMALLINT,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false 
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    set_time_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'SetTime',
    tableName: 'set_time',
    timestamps: false
  });
  return SetTime;
};