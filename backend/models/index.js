const { sequelize } = require('../config/database');
const User = require('./User');
const Employee = require('./Employee');
const Department = require('./Department');
const Role = require('./Role');
const Salary = require('./Salary');

// Define relationships between models

// Employee belongs to Department
Department.hasMany(Employee, { foreignKey: 'departmentId', as: 'employees' });
Employee.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });

// Employee belongs to Role
Role.hasMany(Employee, { foreignKey: 'roleId', as: 'employees' });
Employee.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

// Employee has one Salary
Employee.hasOne(Salary, { foreignKey: 'employeeId', as: 'salary' });
Salary.belongsTo(Employee, { foreignKey: 'employeeId', as: 'employee' });


// Sync all models with database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log('All models synchronized with database');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Employee,
  Department,
  Role,
  Salary,
  syncDatabase
};

