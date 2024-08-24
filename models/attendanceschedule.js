"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AttendanceSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      AttendanceSchedule.belongsTo(models.Company, {
        foreignKey: "company_id",
      });
      AttendanceSchedule.hasMany(models.Attendance, {
        foreignKey: "schedule_id",
      });
    }
  }

  AttendanceSchedule.init(
    {
      schedule_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Company",
          key: "company_id",
        },
      },
      clock_in: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      clock_out: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      location_lat: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
      },
      location_long: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: true,
      },
      day_of_week: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
          min: 0,
          max: 6,
        },
      },
      // Kolom baru
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Sesuaikan dengan kebutuhan
      },
    },
    {
      sequelize,
      modelName: "AttendanceSchedule",
    }
  );

  return AttendanceSchedule;
};
