const { Employee, Department, Role, Salary } = require('../models');

/**
 * Get all employees
 * GET /api/employees
 */
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        { model: Department, as: 'department' },
        { model: Role, as: 'role' },
        { model: Salary, as: 'salary' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: employees.length,
      data: { employees }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching employees',
      error: error.message
    });
  }
};

/**
 * Get single employee by ID
 * GET /api/employees/:id
 */
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: [
        { model: Department, as: 'department' },
        { model: Role, as: 'role' },
        { model: Salary, as: 'salary' }
      ]
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { employee }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching employee',
      error: error.message
    });
  }
};

/**
 * Create new employee
 * POST /api/employees
 */
const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, departmentId, roleId, hireDate, status, salary } = req.body;

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee with this email already exists'
      });
    }

    // Create employee
    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      phone,
      departmentId,
      roleId,
      hireDate: hireDate || new Date(),
      status: status || 'active'
    });

    // Create salary if provided
    if (salary && salary.amount) {
      await Salary.create({
        employeeId: employee.id,
        amount: salary.amount,
        currency: salary.currency || 'USD',
        effectiveDate: salary.effectiveDate || new Date()
      });
    }

    // Fetch employee with all relations
    const newEmployee = await Employee.findByPk(employee.id, {
      include: [
        { model: Department, as: 'department' },
        { model: Role, as: 'role' },
        { model: Salary, as: 'salary' }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: { employee: newEmployee }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating employee',
      error: error.message
    });
  }
};

/**
 * Update employee
 * PUT /api/employees/:id
 */
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const { firstName, lastName, email, phone, departmentId, roleId, hireDate, status, salary } = req.body;

    // Update employee
    await employee.update({
      firstName: firstName || employee.firstName,
      lastName: lastName || employee.lastName,
      email: email || employee.email,
      phone: phone || employee.phone,
      departmentId: departmentId || employee.departmentId,
      roleId: roleId || employee.roleId,
      hireDate: hireDate || employee.hireDate,
      status: status || employee.status
    });

    // Update salary if provided
    if (salary && salary.amount) {
      const existingSalary = await Salary.findOne({ where: { employeeId: employee.id } });
      
      if (existingSalary) {
        await existingSalary.update({
          amount: salary.amount,
          currency: salary.currency || existingSalary.currency,
          effectiveDate: salary.effectiveDate || existingSalary.effectiveDate
        });
      } else {
        await Salary.create({
          employeeId: employee.id,
          amount: salary.amount,
          currency: salary.currency || 'USD',
          effectiveDate: salary.effectiveDate || new Date()
        });
      }
    }

    // Fetch updated employee with relations
    const updatedEmployee = await Employee.findByPk(employee.id, {
      include: [
        { model: Department, as: 'department' },
        { model: Role, as: 'role' },
        { model: Salary, as: 'salary' }
      ]
    });

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: { employee: updatedEmployee }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating employee',
      error: error.message
    });
  }
};

/**
 * Delete employee
 * DELETE /api/employees/:id
 */
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Delete associated salary first
    await Salary.destroy({ where: { employeeId: employee.id } });

    // Delete employee
    await employee.destroy();

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting employee',
      error: error.message
    });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};