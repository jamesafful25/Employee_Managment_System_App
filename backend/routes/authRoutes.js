const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  register,
  login,
  googleCallback,
  getMe,
  logout
} = require('../controllers/authController');

const {
  registerValidation,
  loginValidation,
  handleValidationErrors
} = require('../validators/authValidator');

const { protect } = require('../middleware/authMiddleware');

// Local authentication
router.post('/register', registerValidation, handleValidationErrors, register);
router.post('/login', loginValidation, handleValidationErrors, login);

// Logout
router.post('/logout', logout);

// Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));
router.get('/google/callback', googleCallback);

// Get current user
router.get('/me', protect, getMe);

module.exports = router;
