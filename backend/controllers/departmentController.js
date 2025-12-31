const { Department, Employee } = require('../models');

/**
 * Get all departments
 * GET /api/departments
 */
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({
      include: [{ model: Employee, as: 'employees' }],
      order: [['name', 'ASC']]
    });

    res.status(200).json({
      success: true,
      count: departments.length,
      data: { departments }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching departments',
      error: error.message
    });
  }
};

/**
 * Get single department by ID
 * GET /api/departments/:id
 */
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id, {
      include: [{ model: Employee, as: 'employees' }]
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { department }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching department',
      error: error.message
    });
  }
};

/**
 * Create new department
 * POST /api/departments
 */
const createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if department already exists
    const existingDept = await Department.findOne({ where: { name } });
    if (existingDept) {
      return res.status(400).json({
        success: false,
        message: 'Department with this name already exists'
      });
    }

    const department = await Department.create({ name, description });

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: { department }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating department',
      error: error.message
    });
  }
};

/**
 * Update department
 * PUT /api/departments/:id
 */
const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    const { name, description } = req.body;
    await department.update({ name, description });

    res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      data: { department }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating department',
      error: error.message
    });
  }
};

/**
 * Delete department
 * DELETE /api/departments/:id
 */
const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    // Check if department has employees
    const employeeCount = await Employee.count({ where: { departmentId: department.id } });
    if (employeeCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete department with existing employees'
      });
    }

    await department.destroy();

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting department',
      error: error.message
    });
  }
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};
