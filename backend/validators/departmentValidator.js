const { body } = require('express-validator');
const { handleValidationErrors } = require('./authValidator');

// Validation rules for creating/updating department
const departmentValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Department name is required')
    .isLength({ min: 2 })
    .withMessage('Department name must be at least 2 characters'),
  body('description')
    .optional()
    .trim()
];

// Validation rules for creating/updating role
const roleValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Role title is required')
    .isLength({ min: 2 })
    .withMessage('Role title must be at least 2 characters'),
  body('description')
    .optional()
    .trim()
];

module.exports = {
  departmentValidation,
  roleValidation,
  handleValidationErrors
};