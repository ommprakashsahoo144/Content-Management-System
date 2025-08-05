const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authenticate = require('../middlewares/authMiddleware');

router.use(authenticate);
router.post('/', likeController.likeArticle);
router.delete('/', likeController.unlikeArticle);

module.exports = router;
