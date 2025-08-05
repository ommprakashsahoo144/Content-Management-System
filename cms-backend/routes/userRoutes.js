const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/roleMiddleware');

router.use(authenticate);
router.get('/', checkPermission('manage', 'User'), userController.getAllUsers);
router.post('/', checkPermission('manage', 'User'), userController.createUser);
router.delete('/:id', checkPermission('manage', 'User'), userController.softDeleteUser);

module.exports = router;
