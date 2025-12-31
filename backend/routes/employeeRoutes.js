const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { employeeValidation, handleValidationErrors } = require('../validators/employeeValidator');

// All routes are protected (require authentication)
router.use(protect);

// Get all employees - accessible by all authenticated users
router.get('/', getAllEmployees);

// Get single employee - accessible by all authenticated users
router.get('/:id', getEmployeeById);

// Create employee - only admin and hr
router.post('/', authorize('admin', 'hr'), employeeValidation, handleValidationErrors, createEmployee);

// Update employee - only admin and hr
router.put('/:id', authorize('admin', 'hr'), employeeValidation, handleValidationErrors, updateEmployee);

// Delete employee - only admin and hr
router.delete('/:id', authorize('admin', 'hr'), deleteEmployee);

module.exports = router;
