const express = require('express');
const router = express.Router();
const {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { departmentValidation, handleValidationErrors } = require('../validators/departmentValidator');

// All routes are protected
router.use(protect);

// Get all departments - accessible by all
router.get('/', getAllDepartments);

// Get single department - accessible by all
router.get('/:id', getDepartmentById);

// Create department - only admin and hr
router.post('/', authorize('admin', 'hr'), departmentValidation, handleValidationErrors, createDepartment);

// Update department - only admin and hr
router.put('/:id', authorize('admin', 'hr'), departmentValidation, handleValidationErrors, updateDepartment);

// Delete department - only admin and hr
router.delete('/:id', authorize('admin', 'hr'), deleteDepartment);

module.exports = router;