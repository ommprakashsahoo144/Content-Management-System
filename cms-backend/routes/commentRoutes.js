const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticate = require('../middlewares/authMiddleware');

// Authenticate all comment routes
router.use(authenticate);

// Reader adds a comment
router.post('/', commentController.addComment);

// Admin views all comments
router.get('/all', commentController.getAllComments);

// Admin replies to a comment
router.post('/reply', commentController.replyToComment);

// Admin deletes a comment
router.delete('/:id', commentController.deleteComment);

module.exports = router;
