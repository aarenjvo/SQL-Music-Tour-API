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
    static associate({ Band, Event, Stage }) {
      SetTime.belongsTo(Band, {
        foreignKey: 'band_id',
        as: 'bands'
      })
      
      SetTime.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'event'
      })

      SetTime.belongsTo(Stage, {
        foreignKey: 'stage_id',
        as: 'stage'
      })
    }
  }

  SetTime.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_id: {
      type: DataTypes.INTEGER,
    },
    band_id: {
      type:DataTypes.INTEGER,
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