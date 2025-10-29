'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Employee.hasMany(models.Schedule, {
        foreignKey: 'employeeId',
        as: 'schedules'
      });
      Employee.hasMany(models.ScheduleRequest, {
        foreignKey: 'employeeId',
        as: 'scheduleRequests'
      });
    }
  }
  Employee.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    position: {
      type: DataTypes.ENUM('cajero', 'supervisor'),
      defaultValue: 'empleado',
      allowNull: false
    },
    hiringDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: { 
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Employee',
    timestamps: true
  });
  return Employee;
};
