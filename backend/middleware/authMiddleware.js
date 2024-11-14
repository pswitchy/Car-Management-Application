const jwt = require('jsonwebtoken');
const { User } = require('../models/models'); // Ensure the path is correct

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
