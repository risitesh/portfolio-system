module.exports = (wagner) => async (req, res, next) => {
  try {
    const result = await wagner.get('SecurityManager').getById(req.params.id);
    if(!result) {
      return res.status(400).json({ message: 'Invalid security trade' });
    }
    req.security = result;
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
  return null;
};
