const { Employee, Department, Role, Salary } = require('../models');
const { Op } = require('sequelize');

/**
 * Get department-wise employee report
 * GET /api/reports/departments
 */
const getDepartmentReport = async (req, res) => {
  try {
    const departments = await Department.findAll({
      include: [{
        model: Employee,
        as: 'employees',
        include: [
          { model: Role, as: 'role' },
          { model: Salary, as: 'salary' }
        ]
      }],
      order: [['name', 'ASC']]
    });

    // Format report data
    const report = departments.map(dept => ({
      departmentId: dept.id,
      departmentName: dept.name,
      totalEmployees: dept.employees.length,
      activeEmployees: dept.employees.filter(e => e.status === 'active').length,
      totalSalary: dept.employees.reduce((sum, e) => {
        return sum + (e.salary ? parseFloat(e.salary.amount) : 0);
      }, 0),
      employees: dept.employees.map(e => ({
        id: e.id,
        name: `${e.firstName} ${e.lastName}`,
        email: e.email,
        role: e.role?.title,
        salary: e.salary?.amount,
        status: e.status
      }))
    }));

    res.status(200).json({
      success: true,
      data: { report }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating department report',
      error: error.message
    });
  }
};

/**
 * Get salary statistics
 * GET /api/reports/salary
 */
const getSalaryReport = async (req, res) => {
  try {
    const salaries = await Salary.findAll({
      include: [{
        model: Employee,
        as: 'employee',
        include: [
          { model: Department, as: 'department' },
          { model: Role, as: 'role' }
        ]
      }]
    });

    const amounts = salaries.map(s => parseFloat(s.amount));
    const total = amounts.reduce((sum, amt) => sum + amt, 0);
    const average = amounts.length > 0 ? total / amounts.length : 0;
    const highest = amounts.length > 0 ? Math.max(...amounts) : 0;
    const lowest = amounts.length > 0 ? Math.min(...amounts) : 0;

    res.status(200).json({
      success: true,
      data: {
        statistics: {
          total,
          average,
          highest,
          lowest,
          count: salaries.length
        },
        salaries: salaries.map(s => ({
          employeeName: `${s.employee.firstName} ${s.employee.lastName}`,
          department: s.employee.department?.name,
          role: s.employee.role?.title,
          amount: s.amount,
          currency: s.currency
        }))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating salary report',
      error: error.message
    });
  }
};

module.exports = {
  getDepartmentReport,
  getSalaryReport
};