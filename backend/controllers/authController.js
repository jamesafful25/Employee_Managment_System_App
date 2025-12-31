const { User } = require('../models');
const { hashPassword } = require('../utils/passwordHash');
const { generateToken } = require('../utils/jwtToken');
const passport = require('passport');

// Determine environment
const isProd = process.env.NODE_ENV === 'production';

/**
 * Helper: Set JWT cookie
 */
const setTokenCookie = (res, token) => {
  res.cookie('jwt', token, {
    httpOnly: true,            
    secure: isProd,            
    sameSite: 'lax',           
    maxAge: 24 * 60 * 60 * 1000
  });
};

/**
 * Helper: Clear JWT cookie
 */
const clearTokenCookie = (res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    expires: new Date(0)
  });
};

/**
 * Register a new user
 */
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || 'employee'
    });

    const token = generateToken(user);
    setTokenCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
  }
};

/**
 * Login with email and password
 */
const login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.status(500).json({ success: false, message: 'Error during login', error: err.message });
    if (!user) return res.status(401).json({ success: false, message: info.message || 'Invalid credentials' });

    const token = generateToken(user);
    setTokenCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } }
    });
  })(req, res, next);
};

/**
 * Google OAuth callback
 */
const googleCallback = async (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err || !user) return res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);

    const token = generateToken(user);
    setTokenCookie(res, token);

    res.redirect(`${process.env.FRONTEND_URL}/auth/google/success`);
  })(req, res, next);
};

/**
 * Get current logged-in user
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user data', error: error.message });
  }
};

/**
 * Logout user
 */
const logout = (req, res) => {
  clearTokenCookie(res);
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = {
  register,
  login,
  googleCallback,
  getMe,
  logout,
};
