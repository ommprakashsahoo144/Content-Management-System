const { User } = require('../models');
const bcrypt = require('bcrypt');

// Admin creates Author/Reader
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobileNumber, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      mobileNumber,
      role
    });

    res.status(201).json({ message: `${role} created`, user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin soft-deletes user
exports.softDeleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'ADMIN') return res.status(403).json({ message: 'Cannot delete admin' });

    user.isDeleted = true;
    await user.save();

    res.json({ message: `${user.role} soft-deleted` });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Admin gets all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ where: { isDeleted: false } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
