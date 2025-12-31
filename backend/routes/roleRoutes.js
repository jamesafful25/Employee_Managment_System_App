const express = require('express');
const router = express.Router();
const {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole
} = require('../controllers/roleController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { roleValidation, handleValidationErrors } = require('../validators/departmentValidator');

// All routes are protected
router.use(protect);

// Get all roles - accessible by all
router.get('/', getAllRoles);

// Create role - only admin and hr
router.post('/', authorize('admin', 'hr'), roleValidation, handleValidationErrors, createRole);

// Update role - only admin and hr
router.put('/:id', authorize('admin', 'hr'), roleValidation, handleValidationErrors, updateRole);

// Delete role - only admin and hr
router.delete('/:id', authorize('admin', 'hr'), deleteRole);

module.exports = router;