/**
 * Middleware to check if user has required role
 * @param  {...string} roles - Allowed roles (e.g., 'admin', 'hr')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Check if user's role is in allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this route`
      });
    }

    next();
  };
};

module.exports = { authorize };