const { Role, Employee } = require('../models');

/**
 * Get all roles
 * GET /api/roles
 */
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      order: [['title', 'ASC']]
    });

    res.status(200).json({
      success: true,
      count: roles.length,
      data: { roles }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching roles',
      error: error.message
    });
  }
};

/**
 * Create new role
 * POST /api/roles
 */
const createRole = async (req, res) => {
  try {
    const { title, description } = req.body;

    const existingRole = await Role.findOne({ where: { title } });
    if (existingRole) {
      return res.status(400).json({
        success: false,
        message: 'Role with this title already exists'
      });
    }

    const role = await Role.create({ title, description });

    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      data: { role }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating role',
      error: error.message
    });
  }
};

/**
 * Update role
 * PUT /api/roles/:id
 */
const updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    const { title, description } = req.body;
    await role.update({ title, description });

    res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: { role }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating role',
      error: error.message
    });
  }
};

/**
 * Delete role
 * DELETE /api/roles/:id
 */
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    const employeeCount = await Employee.count({ where: { roleId: role.id } });
    if (employeeCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete role with existing employees'
      });
    }

    await role.destroy();

    res.status(200).json({
      success: true,
      message: 'Role deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting role',
      error: error.message
    });
  }
};

module.exports = {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole
};