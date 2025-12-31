const express = require('express');
const router = express.Router();
const { getDepartmentReport, getSalaryReport } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// All routes are protected and only accessible by admin and hr
router.use(protect);
router.use(authorize('admin', 'hr'));

// Get department-wise employee report
router.get('/departments', getDepartmentReport);

// Get salary report
router.get('/salary', getSalaryReport);

module.exports = router;