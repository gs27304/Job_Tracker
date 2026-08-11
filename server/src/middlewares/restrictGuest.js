export const restrictGuest = (req, res, next) => {
  if (req.user && req.user.role === 'guest') {
    return res.status(403).json({
      success: false,
      message: 'Demo/Guest account is restricted from deleting data or performing destructive operations.',
    });
  }
  next();
};

export default restrictGuest;
