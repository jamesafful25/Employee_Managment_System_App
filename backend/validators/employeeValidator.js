const { body } = require('express-validator');
const { handleValidationErrors } = require('./authValidator');

// Validation rules for creating/updating employee
const employeeValidation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .optional()
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Please provide a valid phone number'),
  body('departmentId')
    .isInt({ min: 1 })
    .withMessage('Valid department is required'),
  body('roleId')
    .isInt({ min: 1 })
    .withMessage('Valid role is required'),
  body('hireDate')
    .optional()
    .isDate()
    .withMessage('Please provide a valid date'),
  body('status')
    .optional()
    .isIn(['active', 'inactive'])
    .withMessage('Status must be active or inactive')
];

// Validation for salary
const salaryValidation = [
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Salary amount must be a positive number'),
  body('currency')
    .optional()
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be 3 characters (e.g., USD)'),
  body('effectiveDate')
    .optional()
    .isDate()
    .withMessage('Please provide a valid date')
];

module.exports = {
  employeeValidation,
  salaryValidation,
  handleValidationErrors
};
