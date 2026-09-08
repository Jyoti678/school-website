function requireAuth(req, res, next) {
  if (req.session && req.session.admin) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: 'Unauthorized. Please log in to access the admin CMS.'
  });
}

module.exports = {
  requireAuth
};
